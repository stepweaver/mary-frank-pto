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



    // Check if required environment variables are set
    if (!calendarId) {
      console.error("Missing calendar ID");
      return Response.json({
        success: false,
        error: "Calendar configuration missing",

      }, { status: 500 });
    }

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error("Missing Google service account credentials");
      return Response.json({
        success: false,
        error: "Authentication configuration missing",

      }, { status: 500 });
    }



    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      maxResults: maxResults,
      singleEvents: true,
      orderBy: "startTime",
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



    return Response.json({
      success: true,
      data: { events },
    });
  } catch (error) {
    console.error("Error fetching calendar events:", error);


    return Response.json({
      success: false,
      error: "Failed to fetch events",

    }, { status: 500 });
  }
}