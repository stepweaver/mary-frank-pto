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
      date: item.fields.date,
      time: item.fields.time,
      location: item.fields.location,
      googleFormUrl: item.fields.googleFormUrl,
      image: item.fields.image,
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
      success: true,
      data: [
        {
          id: 1,
          title: "Fall Festival Volunteers",
          description: "Need 8 more parents for setup and cleanup",
          spots: 8,
          date: "2024-10-15",
          time: "3:00 PM",
          location: "School Gym",
        },
        {
          id: 2,
          title: "Library Helper",
          description: "Tuesday mornings 9-11 AM",
          spots: 1,
          date: "2024-10-08",
          time: "9:00 AM",
          location: "School Library",
        },
      ],
    });
  }
}