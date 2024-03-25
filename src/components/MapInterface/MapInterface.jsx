import useCollectionStore from "@/store/collectionsStore";
import bboxPolygon from "@turf/bbox-polygon";
import centroid from "@turf/centroid";
import React, { useEffect, useState } from "react";
import Map, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { isEmpty } from "@/utils";

const MapInterface = () => {
  const [viewPort, setViewPort] = useState();
  const showAsset = useCollectionStore((store) => store.showAsset);
  const activeCollection = useCollectionStore(
    (store) => store.activeCollection
  );
  const paginatedData = useCollectionStore((store) => store.paginatedData);
  const updateActiveCollection = useCollectionStore(
    (store) => store.updateActiveCollection
  );
  const toggleShowAsset = useCollectionStore((store) => store.toggleShowAsset);

  useEffect(() => {
    // Fit the map to the bounding box
    const bbox = [120.0, -10.0, 130, 0]; // bounding box coordinates in documentation [minX, minY, maxX, maxY]
    const bboxPoly = bboxPolygon(bbox);
    const centroidBbox = centroid(bboxPoly);
    const newViewport = {
      width: "50vw",
      height: "100vh",
      longitude: centroidBbox.geometry.coordinates[0], //(minY + maxY) / 2,
      latitude: centroidBbox.geometry.coordinates[1], //(minX + maxX) / 2,
      zoom: 5,
    };
    setViewPort(newViewport);
  }, []);

  //paginatedData.map((obj) => console.log(obj.geometry));

  const handleItemClick = (obj) => {
    console.log("SE ACTIVAAAA", obj);
    updateActiveCollection(obj);
    toggleShowAsset(true);
  };

  const handleClick = (e) => {
    /*     setClickedCoord({
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng
    }) */
    const { point, target: map } = e;

    const bbox = [
      [point.x - 10, point.y - 10],
      [point.x + 10, point.y + 10],
    ];
    // Find features intersecting the bounding box.
    const selectedFeatures = map.queryRenderedFeatures(bbox, {
      layers: paginatedData.map((obj, index) => `layer-${index}`),
    });

    if (selectedFeatures[0] !== undefined) {
      updateActiveCollection(JSON.parse(selectedFeatures[0].properties.data));
      toggleShowAsset(true);
    }
  };
  return (
    <>
      {viewPort ? (
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          initialViewState={viewPort}
          style={{ width: "50vw", height: "100vh" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onViewportChange={(viewPort) => setViewPort(viewPort)}
          interactive={true}
          onClick={(event) => handleClick(event)}
          interactiveLayerIds={paginatedData.map(
            (obj, index) => `layer-${index}`
          )}
        >
          {showAsset ? null : (
            <>
              <Source
                id="bbox"
                type="geojson"
                data={bboxPolygon([120.0, 0.0, 130, -10])}
              >
                {/*                 <Layer
                  id="bbox-layer"
                  type="fill"
                  source="bbox"
                  paint={{
                    "fill-color": "#94a3b8",
                    "fill-opacity": 0.25,
                  }}
                /> */}
                <Layer
                  id="bbox-outline"
                  type="line"
                  source="bbox"
                  paint={{
                    "line-color": "#475569",
                    "line-width": 1.5,
                  }}
                />
              </Source>
              {paginatedData.map((item, index) => {
                const geojson = {
                  type: "Feature",
                  geometry: item.geometry,
                  properties: {
                    data: item,
                  },
                };
                return (
                  <Source
                    key={`source-${index}`}
                    id={`source-${index}`}
                    type="geojson"
                    data={geojson}
                  >
                    <Layer
                      key={`layer-${index}`}
                      id={`layer-${index}`}
                      type="fill"
                      source={`source-${index}`}
                      paint={{
                        "fill-color": "#3b82f6",
                        "fill-opacity": 0.4,
                      }}
                    />
                    {/* Line layer */}
                    <Layer
                      key={`line-layer-${index}`}
                      id={`line-layer-${index}`}
                      type="line"
                      source={`source-${index}`}
                      paint={{
                        "line-color": "#3b82f6",
                        "line-width": 1.5,
                      }}
                    />
                  </Source>
                );
              })}
            </>
          )}

          {showAsset ? (
            <Source id="asset" type="geojson" data={activeCollection.geometry}>
              <Layer
                id="asset-layer"
                type="fill"
                source="multipolygon"
                paint={{
                  "fill-color": "#fb923c",
                  "fill-opacity": 0.4,
                }}
              />
              <Layer
                id="asset-outline"
                type="line"
                source="multipolygon"
                paint={{
                  "line-color": "#ea580c",
                  "line-width": 3,
                }}
              />
            </Source>
          ) : null}
        </Map>
      ) : null}
    </>
  );
};

export default MapInterface;
