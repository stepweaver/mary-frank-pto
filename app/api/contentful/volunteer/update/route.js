import { managementClient } from "@/lib/contentful";

export async function POST(request) {
  try {
    const { opportunityId } = await request.json();

    if (!opportunityId) {
      return Response.json(
        { success: false, error: "Opportunity ID is required" },
        { status: 400 }
      );
    }

    if (!managementClient) {
      console.warn("Contentful management token not configured");
      return Response.json(
        {
          success: false,
          error: "Contentful management not configured",
          message: "Spots will not be updated in Contentful"
        },
        { status: 500 }
      );
    }

    // First, get the current entry to check available spots
    const entry = await managementClient.getEntry(opportunityId);

    if (!entry) {
      return Response.json(
        { success: false, error: "Volunteer opportunity not found" },
        { status: 404 }
      );
    }

    const currentSpots = entry.fields.spots || 0;

    if (currentSpots <= 0) {
      return Response.json(
        { success: false, error: "No spots available for this opportunity" },
        { status: 400 }
      );
    }

    // Decrement the spots count
    entry.fields.spots = currentSpots - 1;

    // Update the entry
    const updatedEntry = await entry.update();
    await updatedEntry.publish();

    return Response.json({
      success: true,
      message: "Spots updated successfully",
      data: {
        opportunityId,
        previousSpots: currentSpots,
        currentSpots: currentSpots - 1,
      },
    });
  } catch (error) {
    console.error("Error updating volunteer opportunity spots:", error);

    // Check if it's a Contentful API error
    if (error.sys && error.sys.id === "VersionMismatch") {
      return Response.json(
        {
          success: false,
          error: "Entry was modified by another process. Please try again."
        },
        { status: 409 }
      );
    }

    return Response.json(
      {
        success: false,
        error: "Failed to update spots",
        details: error.message
      },
      { status: 500 }
    );
  }
}
