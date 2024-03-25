import Map, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import bboxPolygon from "@turf/bbox-polygon";
import centroid from "@turf/centroid";
import useCollectionStore from "@/store/collectionsStore";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate, isEmpty } from "@/utils";
import { AnimatePresence } from "framer-motion";
import ActiveAsset from "@/components/ActiveAsset/ActiveAsset";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { fetchSTAC } from "@/services/services";
import MapInterface from "@/components/MapInterface/MapInterface";
import CollectionItemCard from "@/components/CollectionItemCard/CollectionItemCard";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const inter = Inter({ subsets: ["latin"] });
const Result = () => {
  //https://eod-catalog-svc-prod.astraea.earth/collections/landsat8_c2l1t1

  const [stacItems, setSTACItems] = useState([]);
  const [viewPort, setViewPort] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState();
  const itemsPerPage = 10; // Number of items to display per page
  const updateActiveCollection = useCollectionStore(
    (store) => store.updateActiveCollection
  );
  const activeCollection = useCollectionStore(
    (store) => store.activeCollection
  );
  const toggleShowAsset = useCollectionStore((store) => store.toggleShowAsset);
  const showAsset = useCollectionStore((store) => store.showAsset);
  const catalogUrl = useCollectionStore((store) => store.STACServerUrl);
  const collectionId = useCollectionStore((store) => store.collectionId);
  const dateRange = useCollectionStore((store) => store.dateRange);
  const updatePaginatedData = useCollectionStore(
    (store) => store.updatePaginatedData
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchSTAC(catalogUrl, collectionId, dateRange);
        if (response.ok) {
          const data = await response.json();
          setSTACItems(data.features);
        }
      } catch (e) {
        console.log("Error fetching STAC items:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [catalogUrl, collectionId]);

  /*   useEffect(() => {
    console.log("items????", stacItems, stacItems.length);
    console.log("tessssssssss", process.env.NEXT_PUBLIC_MAPBOX_TOKEN);
  }, [stacItems]);

  useEffect(() => {
    console.log("ACTIVEEEEE COLLECTIONNNNN", activeCollection);
    if (!isEmpty(activeCollection)) {
      Object.keys(activeCollection.assets).map((key) =>
        console.log(
          "adentroooooooo activecollection",
          key,
          activeCollection.assets[key].title
        )
      );
    }
  }, [activeCollection]); */
  /* 
  const handleItemClick = (obj) => {
    updateActiveCollection(obj);
    toggleShowAsset(true);
  }; */

  // Calculate pagination data
  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(stacItems.length / itemsPerPage);
  const paginatedData = stacItems.slice(offset, offset + itemsPerPage);
  updatePaginatedData(stacItems.slice(offset, offset + itemsPerPage));

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  return (
    <main
      className={`flex  flex-row items-center justify-evenly ${inter.className} w-screen h-screen overflow-hidden`}
    >
      <div className="w-1/2 h-screen ">
        <MapInterface />
      </div>
      <div className="flex flex-col gap-4 py-6 h-screen overflow-hidden grow px-6 shadow-xl ">
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white/50 z-10">
            <LoadingSpinner />
          </div>
        )}
        <Link href="/" className="flex gap-2">
          <ArrowLeft width={20} /> Back
        </Link>
        <h1>
          Items in{" "}
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {collectionId}
          </span>{" "}
          collection{" "}
        </h1>
        <div className="grid grid-cols-2 gap-6">
          {paginatedData?.map((obj) => (
            <CollectionItemCard obj={obj} key={obj.id} />
          ))}
        </div>
        <ReactPaginate
          breakLabel={<span className="mx-2">...</span>}
          nextLabel={<ChevronRight className="rounded" />}
          onPageChange={handlePageChange}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel={<ChevronLeft className="rounded" />}
          containerClassName="flex items-center justify-center mt-2 mb-4"
          pageClassName="block flex items-center justify-center border border-solid border-slate-200 w-10 h-10 hover:bg-slate-100 rounded mx-2"
          activeClassName="bg-blue-500 text-white"
          //renderOnZeroPageCount={null}
        />
      </div>
      <AnimatePresence>{showAsset ? <ActiveAsset /> : null}</AnimatePresence>
    </main>
  );
};

export default Result;
