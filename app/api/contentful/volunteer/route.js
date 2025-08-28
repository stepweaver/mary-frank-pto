import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function GET() {
  try {
    const response = await client.getEntries({
      content_type: "volunteerOpportunity",
      order: ["-sys.createdAt"],
      limit: 10,
    });

    const opportunities = response.items.map((item) => ({
      id: item.sys.id,
      title: item.fields.title,
      description: item.fields.description,
      spots: item.fields.spots || 0,
      urgency: item.fields.urgency || "medium",
      date: item.fields.date,
      time: item.fields.time,
      location: item.fields.location,
      category: item.fields.category,
    }));

    return Response.json(
      {
        success: true,
        data: opportunities,
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching volunteer opportunities:", error);
    return Response.json({
      success: false,
      error: "Failed to fetch volunteer opportunities",
    }, {
      status: 500,
    });
  }
}