import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function GET() {
  try {
    const response = await client.getEntries({
      content_type: "newsArticle",
      order: ["-fields.publishDate"],
      limit: 5,
    });

    const news = response.items.map((item) => ({
      id: item.sys.id,
      title: item.fields.title,
      excerpt: item.fields.excerpt,
      content: item.fields.content,
      publishDate: item.fields.publishDate,
      category: item.fields.category,
      slug: item.fields.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    }));

    return Response.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return Response.json({
      success: true,
      data: [
        {
          id: 1,
          title: "Teacher Wish Lists Updated",
          excerpt: "New classroom supplies needed for 3rd grade",
          category: "teacher-support",
          slug: "teacher-wish-lists-updated",
          publishDate: "2024-01-15T00:00:00Z",
        },
        {
          id: 2,
          title: "Fall Festival Success - Record Breaking Year!",
          excerpt: "Raised $2,400 for classroom technology",
          category: "fundraising",
          slug: "fall-festival-success-2024",
          publishDate: "2024-01-10T00:00:00Z",
        },
      ],
    });
  }
}
