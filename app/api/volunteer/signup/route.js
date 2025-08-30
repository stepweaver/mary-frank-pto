import { google } from "googleapis";
import { Resend } from "resend";
import { createClient as createManagementClient } from "contentful-management";
import { rateLimit } from "@/lib/rateLimit";

// Check if we have the required environment variables
const hasGoogleSheets =
  process.env.GOOGLE_SHEETS_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const hasResend = process.env.RESEND_API_KEY;

// Initialize Contentful management client
const managementClient = process.env.CONTENTFUL_MANAGEMENT_TOKEN
  ? createManagementClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  })
  : null;

// Initialize Google Sheets API using service account
let sheets = null;
if (hasGoogleSheets) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  sheets = google.sheets({ version: "v4", auth });
}

// Initialize Resend only if we have the API key
let resend = null;
if (hasResend) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request) {
  try {
    // Rate limiting - 5 requests per minute per IP
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!rateLimit(clientIP, 5, 60000)) {
      return Response.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Check content length (max 10KB)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10240) {
      return Response.json(
        { success: false, error: "Request too large" },
        { status: 413 }
      );
    }

    const {
      name,
      email,
      phone,
      message,
      opportunityId,
      opportunityTitle,
      opportunityDate,
      opportunityTime,
      opportunityLocation,
    } = await request.json();

    // Sanitize and validate input
    const sanitizedName = name?.toString().trim().substring(0, 100);
    const sanitizedEmail = email?.toString().trim().toLowerCase().substring(0, 254);
    const sanitizedPhone = phone?.toString().trim().substring(0, 20);
    const sanitizedMessage = message?.toString().trim().substring(0, 1000);
    const sanitizedOpportunityId = opportunityId?.toString().trim();
    const sanitizedOpportunityTitle = opportunityTitle?.toString().trim().substring(0, 200);
    const sanitizedOpportunityDate = opportunityDate?.toString().trim().substring(0, 50);
    const sanitizedOpportunityTime = opportunityTime?.toString().trim().substring(0, 50);
    const sanitizedOpportunityLocation = opportunityLocation?.toString().trim().substring(0, 200);

    // Validate required fields
    if (!sanitizedName || !sanitizedEmail || !sanitizedOpportunityId) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return Response.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    let sheetResponse = null;
    let volunteerEmailResponse = null;
    let ptoEmailResponse = null;

    // Store in Google Sheets if available
    if (sheets && hasGoogleSheets) {
      try {
        const timestamp = new Date().toISOString();
        const rowData = [
          timestamp,
          sanitizedOpportunityId,
          sanitizedOpportunityTitle,
          sanitizedName,
          sanitizedEmail,
          sanitizedPhone || "",
          sanitizedMessage || "",
          sanitizedOpportunityDate || "",
          sanitizedOpportunityTime || "",
          sanitizedOpportunityLocation || "",
          "pending", // status
        ];

        sheetResponse = await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEETS_ID,
          range: "VolunteerSignups!A:K",
          valueInputOption: "USER_ENTERED",
          insertDataOption: "INSERT_ROWS",
          requestBody: {
            values: [rowData],
          },
        });
      } catch (sheetsError) {
        if (process.env.NODE_ENV === 'development') {
          console.error("Google Sheets error:", sheetsError);
        }
      }
    }

    // Send confirmation email to volunteer if Resend is available
    if (resend && hasResend) {
      try {
        volunteerEmailResponse = await resend.emails.send({
          from: "Mary Frank PTO <noreply@stepweaver.dev>",
          to: sanitizedEmail,
          subject: `Volunteer Signup Confirmation - ${sanitizedOpportunityTitle}`,
          html: generateVolunteerEmail({
            name: sanitizedName,
            opportunityTitle: sanitizedOpportunityTitle,
            opportunityDate: sanitizedOpportunityDate,
            opportunityTime: sanitizedOpportunityTime,
            opportunityLocation: sanitizedOpportunityLocation,
            opportunityId: sanitizedOpportunityId,
          }),
        });
      } catch (emailError) {
        if (process.env.NODE_ENV === 'development') {
          console.error("Resend email error:", emailError);
        }
      }
    }

    // Update spots in Contentful
    let contentfulResponse = null;
    try {
      if (managementClient) {
        // Get the space and environment
        const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID);
        const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master');

        // Get the current entry
        const entry = await environment.getEntry(sanitizedOpportunityId);

        // Handle Contentful locale structure - spots field is { 'en-US': number }
        const currentSpots = entry.fields.spots?.['en-US'] || 0;

        if (currentSpots > 0) {
          // Update the spots count
          const updatedSpots = Math.max(0, currentSpots - 1);

          // Update with proper locale structure
          entry.fields.spots = { 'en-US': updatedSpots };

          // Update and publish
          const updatedEntry = await entry.update();
          const publishedEntry = await updatedEntry.publish();

          contentfulResponse = {
            success: true,
            id: publishedEntry.sys.id,
            spots: publishedEntry.fields.spots,
            updatedAt: publishedEntry.sys.updatedAt,
          };
        }
      }
    } catch (contentfulError) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Contentful update error:", contentfulError);
      }
    }

    // Send notification email to PTO if Resend is available
    if (resend && hasResend) {
      try {
        ptoEmailResponse = await resend.emails.send({
          from: "Mary Frank PTO <noreply@stepweaver.dev>",
          to: process.env.PTO_EMAIL || "pto@maryfrankpto.org",
          subject: `New Volunteer Signup: ${sanitizedOpportunityTitle}`,
          html: generatePTOEmail({
            name: sanitizedName,
            email: sanitizedEmail,
            phone: sanitizedPhone,
            message: sanitizedMessage,
            opportunityTitle: sanitizedOpportunityTitle,
            opportunityDate: sanitizedOpportunityDate,
            opportunityTime: sanitizedOpportunityTime,
            opportunityLocation: sanitizedOpportunityLocation,
            opportunityId: sanitizedOpportunityId,
          }),
        });
      } catch (emailError) {
        if (process.env.NODE_ENV === 'development') {
          console.error("PTO email error:", emailError);
        }
      }
    }

    // Return success response
    return Response.json({
      success: true,
      message: "Volunteer signup successful",
      data: {
        googleSheets: hasGoogleSheets ? "enabled" : "disabled",
        resend: hasResend ? "enabled" : "disabled",
        contentful: contentfulResponse ? "updated" : "failed",
        volunteerEmailId: volunteerEmailResponse?.data?.id || null,
        ptoEmailId: ptoEmailResponse?.data?.id || null,
        sheetRow: sheetResponse?.data?.updates?.updatedRange || null,
        contentfulUpdate: contentfulResponse || null,
        testMode: !hasGoogleSheets || !hasResend,
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error processing volunteer signup:", error);
    }
    return Response.json(
      { success: false, error: "Failed to process signup" },
      { status: 500 }
    );
  }
}

function generateVolunteerEmail({
  name,
  opportunityTitle,
  opportunityDate,
  opportunityTime,
  opportunityLocation,
  opportunityId,
}) {
  const calendarLink = generateCalendarLink({
    title: opportunityTitle,
    date: opportunityDate,
    time: opportunityTime,
    location: opportunityLocation,
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Volunteer Signup Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #00b140 0%, #009933 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Volunteering!</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Mary Frank PTO</p>
      </div>

      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <p style="font-size: 18px; margin-bottom: 20px;">Hi ${name},</p>

        <p>Thank you for signing up to volunteer! Your commitment to our school community means so much.</p>

        <div style="background: white; border-left: 4px solid #00b140; padding: 20px; margin: 20px 0; border-radius: 0 5px 5px 0;">
          <h3 style="margin: 0 0 15px 0; color: #00b140;">Volunteer Opportunity Details</h3>
          <p><strong>Event:</strong> ${opportunityTitle}</p>
          ${opportunityDate ? `<p><strong>Date:</strong> ${opportunityDate}</p>` : ""}
          ${opportunityTime ? `<p><strong>Time:</strong> ${opportunityTime}</p>` : ""}
          ${opportunityLocation ? `<p><strong>Location:</strong> ${opportunityLocation}</p>` : ""}
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${calendarLink}" style="background: #00b140; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            📅 Add to Calendar
          </a>
        </div>

        <p><strong>What happens next?</strong></p>
        <ul>
          <li>Please arrive 10 minutes early to check in</li>
          <li>If you need to cancel, please contact us as soon as possible</li>
        </ul>

        <p>If you have any questions, please reply to this email or contact us at pto@maryfrankpto.org</p>

        <p>Thank you again for your support!</p>

        <p style="margin-top: 30px;">
          <strong>Mary Frank PTO Team</strong><br>
          <em>Connecting families, students, and staff for student success</em>
        </p>
      </div>
    </body>
    </html>
  `;
}

function generatePTOEmail({
  name,
  email,
  phone,
  message,
  opportunityTitle,
  opportunityDate,
  opportunityTime,
  opportunityLocation,
  opportunityId,
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Volunteer Signup</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #00b140 0%, #009933 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">New Volunteer Signup</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Mary Frank PTO</p>
      </div>

      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <h3 style="color: #00b140; margin-top: 0;">Volunteer Information</h3>

        <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          <p><strong>Opportunity:</strong> ${opportunityTitle}</p>
          ${opportunityDate ? `<p><strong>Date:</strong> ${opportunityDate}</p>` : ""}
          ${opportunityTime ? `<p><strong>Time:</strong> ${opportunityTime}</p>` : ""}
          ${opportunityLocation ? `<p><strong>Location:</strong> ${opportunityLocation}</p>` : ""}
          ${message ? `<p><strong>Notes:</strong> ${message}</strong></p>` : ""}
        </div>

        <p><strong>Action Required:</strong></p>
        <ul>
          <li>Confirm the volunteer signup</li>
          <li>Update the volunteer count in Contentful</li>
          <li>Send any additional information to the volunteer</li>
        </ul>

        <p>This signup has been automatically recorded in your Google Sheets.</p>

        <p style="margin-top: 30px;">
          <strong>Mary Frank PTO System</strong><br>
          <em>Automated notification</em>
        </p>
      </div>
    </body>
    </html>
  `;
}

function generateCalendarLink({ title, date, time, location }) {
  if (!date) return "#";

  const eventDate = new Date(date);
  const endDate = new Date(eventDate.getTime() + 60 * 60 * 1000); // 1 hour duration

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${eventDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    details: `Volunteer opportunity for Mary Frank PTO`,
    location: location || "Mary Frank Elementary School",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}