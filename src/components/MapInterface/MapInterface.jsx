import useCollectionStore from "@/store/collectionsStore";
import bboxPolygon from "@turf/bbox-polygon";
import centroid from "@turf/centroid";
import React, { useEffect, useState } from "react";
import Map, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { isEmpty } from "@/utils";
import { useRouter } from "next/router";
import useStore from "@/store/useStore";

const MapInterface = () => {
  const [viewPort, setViewPort] = useState();
  const [bboxState, setBboxState] = useState([]);
  const [turfBbox, setTurfBbox] = useState([]);
  const showAsset = useCollectionStore((store) => store.showAsset);
  const activeCollection = useCollectionStore(
    (store) => store.activeCollection
  );
  const paginatedData = useCollectionStore((store) => store.paginatedData);
  const updateActiveCollection = useCollectionStore(
    (store) => store.updateActiveCollection
  );
  const toggleShowAsset = useCollectionStore((store) => store.toggleShowAsset);
  const bbox = useCollectionStore((store) => store.bbox);
  /*   const turfBbox = [
    Math.min(bbox[0], bbox[2]),
    Math.min(bbox[1], bbox[3]),
    Math.max(bbox[0], bbox[2]),
    Math.max(bbox[1], bbox[3]),
  ]; */
  const router = useRouter();

  useEffect(() => {
    setBboxState(bbox);
  }, [bbox]);

  useEffect(() => {
    if (!isEmpty(bboxState)) {
      /*       setTurfBbox([
        Math.min(bboxState[0], bboxState[2]),
        Math.min(bboxState[1], bboxState[3]),
        Math.max(bboxState[0], bboxState[2]),
        Math.max(bboxState[1], bboxState[3]),
      ]); */

      //minX, minY, maxX, maxY order (120.0,0.0,130.0,-10.0)
      setTurfBbox([bboxState[1], bboxState[2], bboxState[0], bboxState[3]]);
    } else {
      if (
        isEmpty(
          JSON.parse(sessionStorage.getItem("zustand-storage")).state.bbox
        )
      )
        router.push("/");
    }
  }, [bboxState]);

  useEffect(() => {
    /*     if (isEmpty(bbox)) {
      router.push("/");
      return;
    } */

    console.log("TURFFFFFFFFFFFFFFFFFFFFFFFFFFF", turfBbox, bboxState);
    if (!isEmpty(turfBbox)) {
      // Fit the map to the bounding box
      const bboxPoly = bboxPolygon(turfBbox);
      const centroidBbox = centroid(bboxPoly);
      const newViewport = {
        width: "50vw",
        height: "100vh",
        longitude: centroidBbox.geometry.coordinates[0], //(minY + maxY) / 2,
        latitude: centroidBbox.geometry.coordinates[1], //(minX + maxX) / 2,
        zoom: 5,
      };
      setViewPort(newViewport);
    }
  }, [turfBbox]);

  /*   const handleItemClick = (obj) => {
    console.log("SE ACTIVAAAA", obj);
    updateActiveCollection(obj);
    toggleShowAsset(true);
  }; */

  const handleClick = (e) => {
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
              <Source id="bbox" type="geojson" data={bboxPolygon(turfBbox)}>
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
