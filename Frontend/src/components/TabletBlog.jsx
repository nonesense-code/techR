import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, easeInOut } from "framer-motion";
import CircularLoader from "../CircularLoader";
import { FaAmazon } from "react-icons/fa";
import alibaba from "../images/alibabalogo.png";
import daraz from "../images/darazlogo.png";
import { useQuery } from "react-query";

const filterProducts = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchTargetTablet = async (targetURL, navigate) => {
  try {
    const response = await axios.get(targetURL);

    if (typeof response.data === "object" && response.data !== null) {
      return response.data;
    } else {
      navigate("/laptop");
      return;
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response);
    } else {
      console.error("Error during request setup:", error.message);
    }
    navigate("/laptop");
    return;
  }
};

function TabletBlog() {
  const mostpopularURL = import.meta.env.VITE_MOSTPOPULAR_URL;
  const navigate = useNavigate();

  const {
    isLoading: loadingMostpopular,
    data: mostpopular = [],
    mostpopularisError,
    mostpopularError,
  } = useQuery(
    ["mostpopular", mostpopularURL],
    () => filterProducts(mostpopularURL, "midrange"),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const targettabletURL = import.meta.env.VITE_TARGETTABLET_URL;
  const { itname } = useParams();

  const targetURL = `${targettabletURL}/${itname}`;
  const { data: targetTablets = [], isLoading: isLoadingTarget } = useQuery(
    ["targetTablets", targetURL],
    () => fetchTargetTablet(targetURL, navigate),
    {
      staleTime: 1000 * 60 * 5,
    }
  );
  const isLoading = loadingMostpopular || isLoadingTarget;

  const hasMultipleOptions =
    targetTablets.ram2 || targetTablets.storage2 || targetTablets.price2;
  const hasThreeOptions =
    targetTablets.ram3 || targetTablets.storage3 || targetTablets.price3;

  const rows = [
    {
      ram: targetTablets.ram1,
      storage: targetTablets.storage1,
      price: targetTablets.price1,
    },
    hasMultipleOptions && {
      ram: targetTablets.ram2,
      storage: targetTablets.storage2,
      price: targetTablets.price2,
    },
    hasThreeOptions && {
      ram: targetTablets.ram3,
      storage: targetTablets.storage3,
      price: targetTablets.price3,
    },
  ]
    .filter(Boolean)
    .filter((row) => row.ram && row.storage && row.price);

  const InfoSection = ({ label, value }) => (
    <div className="flex items-center gap-2 max-w-[1200px]">
      <div className="flex items-center gap-1 p-2 rounded-lg bg-green-100">
        <h1 className="text-xs whitespace-nowrap sm:text-sm md:text-lg font-extrabold text-green-600">
          {label}:
        </h1>
      </div>
      <div className="text-xs sm:text-sm md:text-lg w-full bg-zinc-200 px-3 py-2 rounded-md text-black">
        {value || "Loading..."}
      </div>
    </div>
  );

  return (
    <>
      {!isLoading ? (
        <div className="flex h-auto items-center justify-center w-full px-4 md:px-8 lg:px-1">
          <div className="h-full w-auto max-w-[1300px]">
            <div className="w-auto">
              <div className="flex flex-col md:flex-row items-start justify-between">
                <div className="hidden md:flex mt-8 w-full md:w-1/3 h-auto">
                  <div className="flex flex-col gap-4 items-center h-full mt-4">
                    <h1 className="text-2xl">Popular</h1>
                    <div className="hidescroller w-full pt-4 flex flex-col gap-8 items-center overflow-y-auto p-4 h-[800px]">
                      {mostpopular.map((item, index) => (
                        <div
                          key={index}
                          className="w-52 h-auto bg-white flex flex-col items-center justify-start border-4 border-black rounded-xl"
                        >
                          <Link
                            to={`/${item.productType}/${item.name
                              .toLowerCase()
                              .split(" ")
                              .join("")}`}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="rounded-t-lg w-full h-full object-cover object-top"
                              loading="lazy"
                            />
                          </Link>
                          {mostpopular && (
                            <h1 className="w-full text-center bg-zinc-600 rounded-b-lg">
                              {item.name}
                            </h1>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-full md:border-l-4 md:border-black/10 py-4">
                  <h1 className="mt-8 text-2xl md:text-3xl px-4 flex items-center justify-center lg:justify-start whitespace-nowrap tracking-tighter text-[#001] font-semibold border-b-[3px] border-black/10">
                    {targetTablets.name || "..."}
                  </h1>
                  <div className="w-full h-auto p-4 flex flex-col gap-4">
                    <div className="w-full h-auto overflow-hidden flex items-center justify-center bg-white rounded-xl">
                      <img
                        src={targetTablets.image}
                        alt={targetTablets.name}
                        className="w-auto h-32 min-h-72 sm:h-96 sm:object-cover object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-black text-sm tracking-wide md:text-md lg:text-lg font-bold text-ellipsis">
                      {targetTablets.blog || "..."}
                    </div>
                    <div className="w-full h-auto overflow-hidden flex flex-col gap-4 mt-2 text-2xl text-[#002] items-start justify-end">
                      {(targetTablets.dimension ||
                        targetTablets.build ||
                        targetTablets.weight) && (
                        <div className="flex flex-col gap-3 w-full px-4">
                          {targetTablets.dimension && (
                            <InfoSection
                              label="Dimension"
                              value={targetTablets.dimension}
                            />
                          )}
                          {targetTablets.build && (
                            <InfoSection
                              label="Build"
                              value={targetTablets.build}
                            />
                          )}
                          {targetTablets.weight && (
                            <InfoSection
                              label="Weight"
                              value={targetTablets.weight}
                            />
                          )}
                        </div>
                      )}
                      {(targetTablets.dtype ||
                        targetTablets.size ||
                        targetTablets.resolution) && (
                        <div className="flex flex-col gap-3 w-full px-4">
                          {targetTablets.dtype && (
                            <InfoSection
                              label="Type"
                              value={targetTablets.dtype}
                            />
                          )}
                          {targetTablets.size && (
                            <InfoSection
                              label="Size"
                              value={targetTablets.size}
                            />
                          )}
                          {targetTablets.resolution && (
                            <InfoSection
                              label="Resolution"
                              value={targetTablets.resolution}
                            />
                          )}
                        </div>
                      )}
                      {(targetTablets.frontcamera ||
                        targetTablets.maincamera ||
                        targetTablets.video) && (
                        <div className="flex flex-col gap-3 w-full px-4">
                          {targetTablets.frontcamera && (
                            <InfoSection
                              label="FrontCamera"
                              value={targetTablets.frontcamera}
                            />
                          )}
                          {targetTablets.maincamera && (
                            <InfoSection
                              label="BackCamera"
                              value={targetTablets.maincamera}
                            />
                          )}
                          {targetTablets.video && (
                            <InfoSection
                              label="Video"
                              value={targetTablets.video}
                            />
                          )}
                        </div>
                      )}
                      {(targetTablets.os ||
                        targetTablets.processor ||
                        targetTablets.graphics) && (
                        <div className="w-full flex gap-4 justify-start p-2 bg-zinc-50 flex-col rounded-lg px-4">
                          {targetTablets.os && (
                            <InfoSection label="OS" value={targetTablets.os} />
                          )}
                          {targetTablets.processor && (
                            <InfoSection
                              label="Processor"
                              value={targetTablets.processor}
                            />
                          )}
                          {targetTablets.graphics && (
                            <InfoSection
                              label="Graphics"
                              value={targetTablets.graphics}
                            />
                          )}
                        </div>
                      )}

                      {rows.length > 0 && (
                        <div className="w-full flex items-start gap-4 justify-start p-2 bg-zinc-50 flex-col rounded-lg px-4">
                          <div className="flex items-center gap-2 w-full">
                            <div className="flex items-center gap-1 p-2 rounded-lg bg-green-100">
                              <h1 className="text-xs sm:text-sm md:text-lg font-extrabold text-green-600">
                                RAM:
                              </h1>
                            </div>
                            <div className="text-xs flex sm:text-sm md:text-lg w-full bg-zinc-200 px-3 py-2 rounded-md text-black">
                              {rows.map(
                                (row, index) =>
                                  row && (
                                    <div key={index}>
                                      {row.ram + " "}
                                      {index < rows.length - 1 && ","}
                                    </div>
                                  )
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 w-full">
                            <div className="flex items-center gap-1 p-2 rounded-lg bg-green-100">
                              <h1 className="text-xs sm:text-sm md:text-lg font-extrabold text-green-600">
                                Storage:
                              </h1>
                            </div>
                            <div className="text-xs flex sm:text-sm md:text-lg w-full bg-zinc-200 px-3 py-2 rounded-md text-black">
                              {rows.map(
                                (row, index) =>
                                  row && (
                                    <div key={index}>
                                      {row.storage + " "}
                                      {index < rows.length - 1 && ","}
                                    </div>
                                  )
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {(targetTablets.capacity || targetTablets.charging) && (
                        <div className="flex flex-col gap-3 w-full px-4">
                          {targetTablets.capacity && (
                            <InfoSection
                              label="Capacity"
                              value={targetTablets.capacity}
                            />
                          )}
                          {targetTablets.charging && (
                            <InfoSection
                              label="Charging"
                              value={targetTablets.charging}
                            />
                          )}
                        </div>
                      )}
                      {(targetTablets.wifi || targetTablets.bluetooth) && (
                        <div className="flex flex-col gap-3 w-full px-4">
                          {targetTablets.wifi && (
                            <InfoSection
                              label="Wi-Fi"
                              value={targetTablets.wifi}
                            />
                          )}
                          {targetTablets.bluetooth && (
                            <InfoSection
                              label="Bluetooth"
                              value={targetTablets.bluetooth}
                            />
                          )}
                        </div>
                      )}
                      {(targetTablets.typec || targetTablets.audiojack) && (
                        <div className="flex flex-col gap-3 w-full px-4">
                          {targetTablets.typec && (
                            <InfoSection
                              label="Type-C"
                              value={targetTablets.typec}
                            />
                          )}
                          {targetTablets.audiojack && (
                            <InfoSection
                              label="Audio Jack"
                              value={targetTablets.audiojack}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {rows.length > 0 && (
                    <div className="h-auto w-full p-8 text-[12px] md:text-[18px] lg:text-xl">
                      <div className="border-4 border-black overflow-hidden rounded-lg w-full flex flex-col">
                        <div className="w-full flex flex-wrap bg-gray-200">
                          <div className="flex-1 border-r-4 border-black p-2 text-center font-bold">
                            S.N
                          </div>
                          <div className="flex-1 border-r-4 border-black p-2 text-center font-bold">
                            OPTIONS
                          </div>
                          <div className="flex-1 p-2 text-center font-bold">
                            PRICE
                          </div>
                        </div>

                        {rows.map((row, index) => (
                          <div
                            key={index}
                            className="w-full flex flex-wrap border-t-2 border-stone-600"
                          >
                            <div className="flex-1 border-r-4 border-black p-2 text-center">
                              {index + 1}
                            </div>
                            <div className="flex-1 border-r-4 border-black p-2 text-center">
                              {row.ram}/{row.storage}
                            </div>
                            <div className="flex-1 p-2 text-center">
                              {row.price}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col items-center justify-center text-lg text-center">
                    <div>
                      <h1>Make a purchase plan from here!</h1>
                      <h2>
                        Want to save big? Here's your shortcut to incredible
                        savings!
                      </h2>
                    </div>
                    <div className="flex items-center justify-center gap-4 border-2 border-black px-4 rounded-md">
                      <div className="flex items-center justify-center flex-col border-r-2 border-black min-h-24 h-auto pr-2">
                        <a href="#" target="_blank" className="outline-none">
                          <FaAmazon className="text-4xl h-full" />
                        </a>
                        <h1 className="cursor-pointer">Amazon</h1>
                      </div>
                      <div className="flex items-center justify-center flex-col border-r-2 border-black min-h-24 h-full pr-4">
                        <a href="#" target="_blank" className="outline-none">
                          <img
                            src={alibaba}
                            alt=""
                            className="h-16 w-20 scale-125 object-contain"
                            loading="lazy"
                          />
                        </a>
                        <h1 className="cursor-pointer">Alibaba</h1>
                      </div>
                      <div className="flex items-center justify-center flex-col">
                        <a href="#" target="_blank" className="outline-none">
                          <img
                            src={daraz}
                            alt=""
                            className="h-12 w-20"
                            loading="lazy"
                          />
                        </a>
                        <h1 className="cursor-pointer">Daraz</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CircularLoader />
        </motion.div>
      )}
    </>
  );
}

export default TabletBlog;
