import { NextResponse } from 'next/server';
import contentfulClient from '@/lib/contentful';

export async function GET() {
  try {
    // Fetch all active fundraisers
    const response = await contentfulClient.getEntries({
      content_type: 'fundraiser',
      'fields.isActive': true,
      order: ['-fields.startDate']
    });

    // Process fundraisers data
    const fundraisers = response.items.map(fundraiser => {
      const processed = {
        id: fundraiser.sys.id,
        title: fundraiser.fields.title,
        description: fundraiser.fields.description,
        fundraiserType: fundraiser.fields.fundraiserType,
        goal: fundraiser.fields.goal,
        raised: fundraiser.fields.raised,
        unit: fundraiser.fields.unit,
        startDate: fundraiser.fields.startDate,
        endDate: fundraiser.fields.endDate,
        isActive: fundraiser.fields.isActive,
        pdfUrl: fundraiser.fields.pdfUrl,
        category: fundraiser.fields.category
      };

      return processed;
    });

    const responseData = {
      fundraisers
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Error fetching fundraising data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fundraising data' },
      { status: 500 }
    );
  }
}
