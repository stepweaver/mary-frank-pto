import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
});

const calendar = google.calendar({ version: "v3", auth });

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const maxResults = parseInt(searchParams.get("maxResults")) || 5;
    const calendarId = searchParams.get("calendarId") || process.env.GOOGLE_CALENDAR_ID;

    // Debug logging
    console.log("Environment check:", {
      hasEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      hasKey: !!process.env.GOOGLE_PRIVATE_KEY,
      hasCalendarId: !!calendarId,
      calendarId: calendarId,
      maxResults: maxResults
    });

    // Check if required environment variables are set
    if (!calendarId) {
      console.error("Missing calendar ID");
      return Response.json({
        success: false,
        error: "Calendar configuration missing",
        debug: { calendarId, envCalendarId: process.env.GOOGLE_CALENDAR_ID }
      }, { status: 500 });
    }

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error("Missing Google service account credentials");
      return Response.json({
        success: false,
        error: "Authentication configuration missing",
        debug: {
          hasEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          hasKey: !!process.env.GOOGLE_PRIVATE_KEY
        }
      }, { status: 500 });
    }

    console.log("Attempting to fetch events from calendar:", calendarId);

    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      maxResults: maxResults,
      singleEvents: true,
      orderBy: "startTime",
    });

    console.log("Calendar API response received:", {
      hasItems: !!response.data.items,
      itemCount: response.data.items?.length || 0
    });

    const events = response.data.items?.map((event) => {
      const start = event.start.dateTime || event.start.date;
      const end = event.end.dateTime || event.end.date;

      return {
        id: event.id,
        title: event.summary,
        description: event.description,
        start: start,
        end: end,
        location: event.location,
        formattedDate: new Date(start).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        formattedTime: new Date(start).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      };
    }) || [];

    console.log("Events processed:", events.length);

    return Response.json({
      success: true,
      data: { events },
    });
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      status: error.status,
      stack: error.stack
    });

    return Response.json({
      success: false,
      error: "Failed to fetch events",
      debug: {
        message: error.message,
        code: error.code,
        status: error.status
      }
    }, { status: 500 });
  }
}