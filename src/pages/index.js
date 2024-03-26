import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import useCollectionStore from "@/store/collectionsStore";
import { useRouter } from "next/router";
import GlobeAnimation from "@/components/GlobeAnimation/GlobeAnimation";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [disableButton, setDisableButton] = useState(false);
  const [minX, setMinX] = useState(0.0);
  const [minY, setMinY] = useState(-10.0);
  const [maxX, setMaxX] = useState(130.0);
  const [maxY, setMaxY] = useState(120.0);
  const [errorMinX, setErrorMinX] = useState(false);
  const [errorMinY, setErrorMinY] = useState(false);
  const [errorMaxX, setErrorMaxX] = useState(false);
  const [errorMaxY, setErrorMaxY] = useState(false);
  const updateDateRange = useCollectionStore((store) => store.updateDateRange);
  const dateRange = useCollectionStore((store) => store.dateRange);
  const updateBbox = useCollectionStore((store) => store.updateBbox);
  const router = useRouter();

  useEffect(() => {
    console.log(minX, minY, typeof minX);
    if (!isNaN(minX) && !isNaN(minY && !isNaN(maxX) && !isNaN(maxY))) {
      updateBbox([
        parseFloat(maxX),
        parseFloat(maxY),
        parseFloat(minX),
        parseFloat(minY),
      ]);
    }
  }, [minX, minY, maxX, maxY]);

  const handleMinX = (e) => {
    setMinX(e.target.value);
    !isNaN(e.target.value) ? setErrorMinX(false) : setErrorMinX(true);
  };

  const handleMinY = (e) => {
    setMinY(e.target.value);
    !isNaN(e.target.value) ? setErrorMinY(false) : setErrorMinY(true);
  };

  const handleMaxX = (e) => {
    setMaxX(e.target.value);
    !isNaN(e.target.value) ? setErrorMaxX(false) : setErrorMaxX(true);
  };

  const handleMaxY = (e) => {
    setMaxY(e.target.value);
    !isNaN(e.target.value) ? setErrorMaxY(false) : setErrorMaxY(true);
  };

  const handleGetResults = () => {
    if (!errorMaxX && !errorMaxY && !errorMinX && !errorMinY)
      router.push("/result");
  };

  useEffect(() => {
    errorMaxX || errorMaxY || errorMinX || errorMinY
      ? setDisableButton(true)
      : setDisableButton(false);
  }, [disableButton, errorMaxX, errorMaxY, errorMinX, errorMinY]);

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
        <h1>STAC Server Visualizer</h1>
        <h1 className="w-3/4 text-center">
          You&apos;re going to access the{" "}
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            landsat8_c2l1t1
          </span>{" "}
          collection
        </h1>
        <h1>
          {" "}
          At the server{" "}
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
            eod-catalog-svc-prod.astraea.earth
          </span>
        </h1>

        <div className="flex items-center justify-center flex-col">
          <h1>Enter a location</h1>
        </div>
        <div className="grid grid-cols-4 gap-12 w-3/4">
          <div className="flex flex-col  items-center justify-between gap-4 ">
            <p className="text-sm ">Max X</p>
            <input
              className={`border-2 rounded text-center w-full p-2 focus:outline-none focus:ring-0${
                errorMaxX
                  ? " border-red-500 focus:border-red-500 "
                  : " border-slate-300 focus:border-blue-500"
              }`}
              placeholder="120.0"
              value={maxX}
              onChange={(e) => handleMaxX(e)}
            ></input>
          </div>
          <div className="flex flex-col  items-center justify-between gap-4 ">
            <p className="text-sm">Max Y</p>
            <input
              className={`border-2 rounded text-center w-full p-2 focus:outline-none focus:ring-0${
                errorMaxY
                  ? " border-red-500 focus:border-red-500 "
                  : " border-slate-300 focus:border-blue-500"
              }`}
              placeholder="120.0"
              value={maxY}
              onChange={(e) => handleMaxY(e)}
            ></input>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 ">
            <p className="text-sm ">Min X</p>
            <input
              className={`border-2 rounded text-center w-full p-2 focus:outline-none focus:ring-0${
                errorMinX
                  ? " border-red-500 focus:border-red-500 "
                  : " border-slate-300 focus:border-blue-500"
              }`}
              placeholder="120.0"
              value={minX}
              onChange={(e) => handleMinX(e)}
            ></input>
          </div>
          <div className="flex flex-col  items-center justify-between gap-4 ">
            <p className="text-sm ">Min Y</p>
            <input
              className={`border-2 rounded text-center w-full p-2 focus:outline-none focus:ring-0${
                errorMinY
                  ? " border-red-500 focus:border-red-500 "
                  : " border-slate-300 focus:border-blue-500"
              }`}
              placeholder="120.0"
              value={minY}
              onChange={(e) => handleMinY(e)}
            ></input>
          </div>
        </div>
        <h1>Choose a date range to get your data</h1>
        <div className="w-3/4">
          <Datepicker
            value={dateRange}
            onChange={updateDateRange}
            displayFormat={"DD/MM/YYYY"}
            inputClassName={`${inter.className} border-slate-300 border-2 rounded w-full py-2.5 pl-4 pr-14`}
            startFrom={dateRange.startDate}
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
