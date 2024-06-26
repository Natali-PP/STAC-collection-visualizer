import "mapbox-gl/dist/mapbox-gl.css";
import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import useCollectionStore from "@/store/collectionsStore";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import ActiveAsset from "@/components/ActiveAsset/ActiveAsset";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { fetchSTAC } from "@/services/services";
import MapInterface from "@/components/MapInterface/MapInterface";
import CollectionItemCard from "@/components/CollectionItemCard/CollectionItemCard";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { isEmpty } from "@/utils";

const inter = Inter({ subsets: ["latin"] });
const Result = () => {
  const [stacItems, setSTACItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState();
  const [bboxState, setBboxState] = useState([]);
  const [dateRangeState, setDateRangeState] = useState({});
  const [hasFetched, setHasFetched] = useState(false);
  const itemsPerPage = 10; // Number of items to display per page
  const showAsset = useCollectionStore((store) => store.showAsset);
  const dateRange = useCollectionStore((store) => store.dateRange);
  const bbox = useCollectionStore((store) => store.bbox);
  const updatePaginatedData = useCollectionStore(
    (store) => store.updatePaginatedData
  );

  useEffect(() => {
    setBboxState(bbox);
  }, [bbox]);

  useEffect(() => {
    setDateRangeState(dateRange);
  }, [dateRange]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchSTAC(dateRangeState, bboxState);
        if (response.ok) {
          const data = await response.json();
          setSTACItems(data.features);
        }
      } catch (e) {
        console.log("Error fetching STAC items:", e);
      } finally {
        setLoading(false);
        setHasFetched(true);
      }
    };
    if (!isEmpty(bboxState) && !isEmpty(dateRangeState)) fetchData();
  }, [bboxState, dateRangeState]);

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
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="flex gap-2">
            <ArrowLeft width={20} /> Back
          </Link>
          <h1>
            Items in{" "}
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              landsat8_c2l1t1
            </span>{" "}
            collection{" "}
          </h1>
        </div>
        {hasFetched && stacItems.length === 0 ? (
          <h1 className="text-2xl flex items-center justify-center p-20 text-center">
            Your search got no items! Try going back and change the dates or
            location{" "}
          </h1>
        ) : (
          <>
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
            />
          </>
        )}
      </div>
      <AnimatePresence>{showAsset ? <ActiveAsset /> : null}</AnimatePresence>
    </main>
  );
};

export default Result;
