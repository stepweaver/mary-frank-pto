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

    const news = response.items.map((item) => {
      // Ensure image URL is absolute HTTPS
      let imageUrl = item.fields.featuredImage?.fields?.file?.url;
      if (imageUrl && imageUrl.startsWith('//')) {
        imageUrl = `https:${imageUrl}`;
      }

      return {
        id: item.sys.id,
        title: item.fields.title,
        excerpt: item.fields.excerpt,
        content: item.fields.content,
        publishDate: item.fields.publishDate,
        category: item.fields.category,
        slug: item.fields.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        featuredImage: imageUrl,
        imageAlt: item.fields.featuredImage?.fields?.description || item.fields.title,
      };
    });

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
          excerpt: "New classroom supplies needed for 3rd grade. Help us support our teachers with essential materials for student success.",
          category: "teacher-support",
          slug: "teacher-wish-lists-updated",
          publishDate: "2024-01-15T00:00:00Z",
          featuredImage: "/slides/classroom-teachers.png",
          imageAlt: "Teachers in classroom setting up supplies",
        },
        {
          id: 2,
          title: "Fall Festival Success - Record Breaking Year!",
          excerpt: "Our community came together and raised $2,400 for classroom technology. Thank you to everyone who participated!",
          category: "fundraising",
          slug: "fall-festival-success-2024",
          publishDate: "2024-01-10T00:00:00Z",
          featuredImage: "/slides/community-meeting.png",
          imageAlt: "Community celebration and fundraising success",
        },
        {
          id: 3,
          title: "New Playground Equipment Installation",
          excerpt: "Exciting new playground equipment has been installed, providing more opportunities for active play and recreation.",
          category: "community",
          slug: "new-playground-equipment",
          publishDate: "2024-01-05T00:00:00Z",
          featuredImage: "/slides/school-playground.png",
          imageAlt: "New playground equipment at school",
        },
      ],
    });
  }
}
