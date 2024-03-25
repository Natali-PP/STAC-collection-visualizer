import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import useCollectionStore from "@/store/collectionsStore";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import GlobeAnimation from "@/components/GlobeAnimation/GlobeAnimation";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [errorCollectionId, setErrorCollectionId] = useState(false);
  const [errorSTACServerUrl, setErrorSTACServerUrl] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const updateDateRange = useCollectionStore((store) => store.updateDateRange);
  const dateRange = useCollectionStore((store) => store.dateRange);
  const collectionId = useCollectionStore((store) => store.collectionId);
  const updateCollectionId = useCollectionStore(
    (store) => store.updateCollectionId
  );
  const STACServerUrl = useCollectionStore((store) => store.STACServerUrl);
  const updateSTACServerUrl = useCollectionStore(
    (store) => store.updateSTACServerUrl
  );
  const router = useRouter();

  useEffect(() => {
    collectionId !== "landsat8_c2l1t1"
      ? setErrorCollectionId(true)
      : setErrorCollectionId(false);
  }, [collectionId]);

  useEffect(() => {
    STACServerUrl !== "https://eod-catalog-svc-prod.astraea.earth"
      ? setErrorSTACServerUrl(true)
      : setErrorSTACServerUrl(false);
  }, [STACServerUrl]);

  const handleGetResults = () => {
    if (!errorSTACServerUrl && !errorCollectionId) router.push("/result");
  };

  useEffect(() => {
    errorSTACServerUrl || errorCollectionId
      ? setDisableButton(true)
      : setDisableButton(false);
  }, [disableButton, errorCollectionId, errorSTACServerUrl]);

  useEffect(() => {
    console.log("date", dateRange);
  }, [dateRange]);

  return (
    <main
      className={`flex flex-col items-center justify-center ${inter.className} h-screen`}
    >
      <div className="absolute top-0 left-0" style={{ zIndex: "-1" }}>
        <GlobeAnimation width={"800px"} height={"800px"} />
      </div>
      <div
        className={`flex flex-col items-center justify-center gap-6 w-1/2 py-6 shadow-xl border-2 bg-slate-50`}
      >
        <h1>Type here the STAC server URL you want to access</h1>
        <input
          className={`border-2 rounded w-3/4 py-2.5 pl-4 pr-14 focus:outline-none focus:ring-0${
            errorSTACServerUrl
              ? " border-red-500 focus:border-red-500 "
              : " border-slate-300 focus:border-blue-500"
          }`}
          placeholder="https://eod-catalog-svc-prod.astraea.earth"
          value={STACServerUrl}
          onChange={(e) => updateSTACServerUrl(e.target.value)}
        ></input>
        {errorSTACServerUrl ? (
          <p className="text-sm text-red-700">
            Enter the valid STAC Server URL
          </p>
        ) : null}
        <h1>Type here the collection ID</h1>
        <input
          className={`border-2 w-3/4 rounded py-2.5 pl-4 pr-14 focus:outline-none focus:ring-0${
            errorCollectionId
              ? " border-red-500 focus:border-red-500 "
              : " border-slate-300 focus:border-blue-500"
          }`}
          placeholder="landsat8_c2l1t1"
          value={collectionId}
          onChange={(e) => updateCollectionId(e.target.value)}
        ></input>
        {errorCollectionId ? (
          <p className="text-sm text-red-700">Enter the valid collection ID</p>
        ) : null}
        <h1>Choose a date range to get your data</h1>
        <div className="w-3/4">
          <Datepicker
            value={dateRange}
            onChange={updateDateRange}
            displayFormat={"DD/MM/YYYY"}
            inputClassName={`${inter.className} border-slate-300 border-2 rounded w-full py-2.5 pl-4 pr-14`}
            startFrom={dateRange.startDate}
            //isForwardLooking={false}
          />
        </div>
        <button
          disabled={false}
          onClick={handleGetResults}
          className={`${
            disableButton
              ? "bg-slate-400 text-white "
              : "bg-blue-500 text-white "
          }w-3/4 py-2.5 rounded text-center`}
        >
          Get Results!
        </button>
      </div>
    </main>
  );
}
