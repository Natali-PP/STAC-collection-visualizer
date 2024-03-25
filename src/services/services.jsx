export const fetchSTAC = async (catalogUrl, collectionId, dateRange) => {
  try {
    const response = await fetch(`${catalogUrl}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        datetime: `${dateRange.startDate}T00:00:00Z/${dateRange.endDate}T00:00:00Z`,
        collections: [collectionId],
        limit: 50,
        bbox: [120.0, 0.0, 130, -10],
      }), // Example data
    });
    if (!response.ok) {
      console.log("error: ", { response });
    }
    return response;
  } catch (error) {
    console.error("Error fetching STAC items:", error);
  }
};
