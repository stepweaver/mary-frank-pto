import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Cache the data for 5 minutes to avoid hitting API limits
let cachedData = null;
let cacheTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  try {
    // Check if we have cached data that's still fresh
    if (cachedData && cacheTime && (Date.now() - cacheTime < CACHE_DURATION)) {
      return NextResponse.json(cachedData);
    }

    // Set up Google Sheets API authentication
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Extract sheet ID from the URL you provided
    const spreadsheetId = '1VlJoP5AZPxMuug4GAjpTvn7qqGtmaVWhp-CSeVC5RTw';

    // Get the data from the sheet
    // Assuming the data starts from row 2 (row 1 has headers)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Form Responses 1!A:Z', // Adjust range as needed
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }

    // Get headers from first row
    const headers = rows[0];

    // Transform the data into objects
    const allResponses = rows.slice(1).map((row, index) => {
      const response = {};
      headers.forEach((header, colIndex) => {
        response[header] = row[colIndex] || '';
      });

      // Add a unique ID for each response
      response.id = `teacher_${index + 1}`;

      return response;
    }).filter(response => {
      // Filter out completely empty rows
      return Object.values(response).some(value => value && value.trim() !== '');
    });

    // Separate public profiles from anonymous requests
    const publicProfiles = allResponses.filter(response => {
      const sharePublicly = response['My answers may be shared with Mustang families via PTO Facebook page, website, emails, etc.'];
      // If no privacy preference is specified, default to showing the profile
      // Only hide if they explicitly said "No"
      return !sharePublicly || !sharePublicly.toLowerCase().includes('no');
    });

    // If no public profiles found, show all profiles (fallback for testing)
    const finalPublicProfiles = publicProfiles.length > 0 ? publicProfiles : allResponses;

    const anonymousRequests = allResponses.filter(response => {
      const sharePublicly = response['My answers may be shared with Mustang families via PTO Facebook page, website, emails, etc.'];
      // Only include in anonymous if they explicitly said "No"
      return sharePublicly && sharePublicly.toLowerCase().includes('no');
    });

    console.log('Total responses:', allResponses.length);
    console.log('Public profiles (before fallback):', publicProfiles.length);
    console.log('Final public profiles:', finalPublicProfiles.length);
    console.log('Anonymous requests:', anonymousRequests.length);
    console.log('Sample response keys:', allResponses[0] ? Object.keys(allResponses[0]) : 'No responses');
    console.log('Sample privacy value:', allResponses[0] ? allResponses[0]['My answers may be shared with Mustang families via PTO Facebook page, website, emails, etc.'] : 'No responses');

    // Extract just the items from anonymous requests for general donation calls
    const anonymousItems = [];
    anonymousRequests.forEach(response => {
      // Add classroom supply wishes
      if (response['Top Classroom Supply Wishes']) {
        const wishes = response['Top Classroom Supply Wishes'].split(',').map(item => item.trim());
        wishes.forEach(wish => {
          if (wish) anonymousItems.push({ type: 'classroom_supply', item: wish });
        });
      }

      // Add favorite classroom supplies
      if (response['Favorite Classroom Supplies']) {
        const supplies = response['Favorite Classroom Supplies'].split(',').map(item => item.trim());
        supplies.forEach(supply => {
          if (supply) anonymousItems.push({ type: 'classroom_supply', item: supply });
        });
      }

      // Add gift card preferences
      if (response['If you found a gift card for $5, where would you want it to be from?']) {
        anonymousItems.push({
          type: 'gift_card_5',
          item: response['If you found a gift card for $5, where would you want it to be from?']
        });
      }

      if (response['If you found a gift card or $20, where would you want it to be from?']) {
        anonymousItems.push({
          type: 'gift_card_20',
          item: response['If you found a gift card or $20, where would you want it to be from?']
        });
      }
    });

    const teacherRequests = {
      publicProfiles: finalPublicProfiles,
      anonymousItems: [...new Set(anonymousItems.map(item => JSON.stringify(item)))].map(item => JSON.parse(item)),
      totalTeachers: allResponses.length
    };

    // Cache the processed data
    cachedData = {
      requests: finalPublicProfiles,
      anonymousItems: teacherRequests.anonymousItems,
      totalTeachers: teacherRequests.totalTeachers,
      lastUpdated: new Date().toISOString()
    };
    cacheTime = Date.now();

    return NextResponse.json(cachedData);

  } catch (error) {
    console.error('Error fetching teacher requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teacher requests', details: error.message },
      { status: 500 }
    );
  }
}
