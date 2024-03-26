export const fetchSTAC = async (dateRange, bbox) => {
  console.log("ITEMSSSSSSSSSS service", bbox, dateRange);

  /*   try {
    const response = await fetch(
      `https://eod-catalog-svc-prod.astraea.earth/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          datetime: `${dateRange.startDate}T00:00:00Z/${dateRange.endDate}T00:00:00Z`,
          collections: ["landsat8_c2l1t1"],
          limit: 50,
          bbox: [120.0, 0.0, 130, -10],
        }),
      }
    );
    if (!response.ok) {
      console.log("error: ", { response });
    }
    return response;
  } catch (error) {
    console.error("Error fetching STAC items:", error);
  } */

  try {
    const response = await fetch(
      "https://eod-catalog-svc-prod.astraea.earth/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          datetime: `${dateRange.startDate}T00:00:00Z/${dateRange.endDate}T00:00:00Z`,
          collections: ["landsat8_c2l1t1"],
          limit: 50,
          bbox: bbox, //[130.0, 120.0, 0.0, -10.0], //(180,-180,90,-90)
        }),
      }
    );
    if (!response.ok) {
      console.log("error: ", { response });
    }
    return response;
  } catch (error) {
    console.error("Error fetching STAC items:", error);
  }
};
