export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      GOOGLE_SERVICE_ACCOUNT_EMAIL: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      GOOGLE_PRIVATE_KEY: !!process.env.GOOGLE_PRIVATE_KEY,
      GOOGLE_CALENDAR_ID: !!process.env.GOOGLE_CALENDAR_ID,
      actualCalendarId: process.env.GOOGLE_CALENDAR_ID || 'NOT_SET',
      actualEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 'NOT_SET',
      hasPrivateKey: process.env.GOOGLE_PRIVATE_KEY ? 'YES' : 'NO'
    };

    return Response.json({
      success: true,
      environment: envCheck,
      message: "Environment variables check completed"
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
      environment: {
        GOOGLE_SERVICE_ACCOUNT_EMAIL: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        GOOGLE_PRIVATE_KEY: !!process.env.GOOGLE_PRIVATE_KEY,
        GOOGLE_CALENDAR_ID: !!process.env.GOOGLE_CALENDAR_ID
      }
    }, { status: 500 });
  }
}
