import deliveryClient from "@/lib/contentful";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    // Try to find the article by slug field first (most reliable)
    let response = await deliveryClient.getEntries({
      content_type: "newsArticle",
      "fields.slug": slug,
      limit: 1,
    });

    // If no slug field match, try to find by title match
    if (response.items.length === 0) {
      response = await deliveryClient.getEntries({
        content_type: "newsArticle",
        "fields.title[match]": slug.replace(/-/g, " "),
        limit: 1,
      });
    }

    // If still no match, try to find by generated slug from title
    if (response.items.length === 0) {
      response = await deliveryClient.getEntries({
        content_type: "newsArticle",
        limit: 100, // Get more articles to search through
      });

      const matchingItem = response.items.find(item => {
        const generatedSlug = item.fields.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return generatedSlug === slug;
      });

      if (matchingItem) {
        response = { items: [matchingItem] };
      }
    }

    if (response.items.length === 0) {
      return Response.json(
        {
          success: false,
          error: "Article not found",
        },
        { status: 404 }
      );
    }

    const item = response.items[0];

    // Ensure image URL is absolute HTTPS
    let imageUrl = item.fields.featuredImage?.fields?.file?.url;
    if (imageUrl && imageUrl.startsWith('//')) {
      imageUrl = `https:${imageUrl}`;
    }

    const article = {
      id: item.sys.id,
      title: item.fields.title,
      excerpt: item.fields.excerpt,
      content: item.fields.content,
      publishDate: item.fields.publishDate,
      category: item.fields.category,
      slug: item.fields.slug || item.fields.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      featuredImage: imageUrl,
      imageAlt: item.fields.featuredImage?.fields?.description || item.fields.title,
    };

    return Response.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error("Error fetching news article:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to fetch article",
      },
      { status: 500 }
    );
  }
}
