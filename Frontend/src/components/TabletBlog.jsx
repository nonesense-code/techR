import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, easeInOut } from "framer-motion";
import CircularLoader from "../CircularLoader";
import { useQuery } from "react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";

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
      navigate("/tablet");
      return;
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response);
    } else {
      console.error("Error during request setup:", error.message);
    }
    navigate("/tablet");
    return;
  }
};

function TabletBlog() {
  const flagshipURL = import.meta.env.VITE_FLAGSHIP_URL;
  const midrangeURL = import.meta.env.VITE_MIDRANGE_URL;
  const budgetURL = import.meta.env.VITE_BUDGET_URL;
  const navigate = useNavigate();

  const {
    isLoading: loadingBudget,
    data: budget = [],
    budgetisError,
    budgetError,
  } = useQuery(["budget", budgetURL], () => filterProducts(budgetURL), {
    staleTime: 1000 * 60 * 5,
  });
  const {
    isLoading: loadingFlagship,
    data: flagship = [],
    flagshipisError,
    flagshipError,
  } = useQuery(["flagship", flagshipURL], () => filterProducts(flagshipURL), {
    staleTime: 1000 * 60 * 5,
  });
  const {
    isLoading: loadingMidrange,
    data: midrange = [],
    midrangeisError,
    midrangeError,
  } = useQuery(["midrange", midrangeURL], () => filterProducts(midrangeURL), {
    staleTime: 1000 * 60 * 5,
  });

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
  const isLoading =
    loadingBudget || loadingFlagship || loadingMidrange || isLoadingTarget;

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
    <div className="flex items-center gap-2 max-w-[1300px]">
      <div className="flex items-center gap-1 p-2 rounded-lg bg-green-100">
        <h1 className="text-xs whitespace-nowrap sm:text-sm md:text-md lg:text-[16px] font-extrabold text-green-600">
          {label}:
        </h1>
      </div>
      <div className="text-xs sm:text-sm md:text-md lg:text-[16px] w-full bg-zinc-200 px-3 py-2 rounded-md text-black">
        {value || "Loading..."}
      </div>
    </div>
  );
  return (
    <>
      <HelmetProvider>
        {!isLoading ? (
          <div className="flex h-auto items-center justify-center w-full lg:px-2 flex-col">
            <Helmet>
              <title>
                {targetTablets
                  ? `${targetTablets.name} - Description and Details`
                  : "Loading..."}
              </title>
            </Helmet>
            <div className="h-full w-auto max-w-[1300px] px-4">
              <div className="w-auto">
                <div className="flex flex-col md:flex-row items-start justify-between">
                  <div className="flex flex-col h-full md:w-1/3 mt-2">
                    <div className="hidden md:flex mt-8 w-ful h-auto">
                      <div className="h-auto">
                        <h1 className="text-2xl text-center">Flagship</h1>
                        <div className="hidescroller w-full pt-4 flex flex-col gap-8 items-center overflow-y-auto p-4 h-[550px]">
                          {flagship.map((item, index) => (
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
                              {budget && (
                                <div className="w-full">
                                  <h1 className="w-full text-center border-t-2 border-black">
                                    {item.name}
                                  </h1>
                                  <h1 className="w-full text-center bg-black text-white rounded-b-lg">
                                    {item.price1}
                                  </h1>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex mt-8 w-ful h-auto">
                      <div className="h-auto">
                        <h1 className="text-2xl text-center">Midrange</h1>
                        <div className="hidescroller w-full pt-4 flex flex-col gap-8 items-center overflow-y-auto p-4 h-[570px]">
                          {midrange.map((item, index) => (
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
                              {budget && (
                                <div className="w-full">
                                  <h1 className="w-full text-center border-t-2 border-black">
                                    {item.name}
                                  </h1>
                                  <h1 className="w-full text-center bg-black text-white rounded-b-lg">
                                    {item.price1}
                                  </h1>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex mt-8 w-ful h-auto">
                      <div className="h-auto">
                        <h1 className="text-2xl text-center">Budget</h1>
                        <div className="hidescroller w-full pt-4 flex flex-col gap-8 items-center overflow-y-auto p-4 h-[780px]">
                          {budget.map((item, index) => (
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
                              {budget && (
                                <div className="w-full">
                                  <h1 className="w-full text-center border-t-2 border-black">
                                    {item.name}
                                  </h1>
                                  <h1 className="w-full text-center bg-black text-white rounded-b-lg">
                                    {item.price1}
                                  </h1>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-auto md:border-l-4 md:border-black/10 py-4">
                    <h1
                      className={`mt-8 text-2xl md:text-3xl px-4 flex items-center justify-center lg:justify-start whitespace-nowrap tracking-tighter ${
                        targetTablets.mostpopular === "true"
                          ? "text-red-600"
                          : "text-[#001]"
                      } font-semibold border-b-[3px] border-black/10`}
                    >
                      {targetTablets.name || "..."}
                    </h1>
                    <div className="w-auto h-auto py-4 md:px-4 flex flex-col gap-4">
                      <div className="w-auto h-auto overflow-hidden flex items-center justify-center bg-white">
                        <img
                          src={targetTablets.image}
                          alt={targetTablets.name}
                          className="border-gradient h-full w-auto min-h-32 max-h-96 sm:h-96 object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="text-black text-sm tracking-wide md:text-md lg:text-lg font-bold text-justify">
                        {targetTablets.blog || "..."}
                      </div>
                      <div className="w-full h-auto overflow-hidden flex flex-col gap-4 mt-2 text-2xl text-[#002] items-start justify-end">
                        {(targetTablets.dimension ||
                          targetTablets.build ||
                          targetTablets.weight) && (
                          <div className="flex flex-col gap-3 w-full">
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
                          <div className="flex flex-col gap-3 w-full">
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
                          <div className="flex flex-col gap-3 w-full">
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
                          <div className="w-full flex gap-4 justify-start py-2 flex-col rounded-lg">
                            {targetTablets.os && (
                              <InfoSection
                                label="OS"
                                value={targetTablets.os}
                              />
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
                          <div className="w-full flex items-start gap-4 justify-start py-2 flex-col rounded-lg">
                            <div className="flex items-center gap-2 w-full">
                              <div className="flex items-center gap-1 p-2 rounded-lg bg-green-100">
                                <h1 className="text-xs sm:text-sm md:text-md lg:text-[16px] font-extrabold text-green-600">
                                  RAM:
                                </h1>
                              </div>
                              <div className="text-xs flex sm:text-sm md:text-md lg:text-[16px] w-full bg-zinc-200 px-3 py-2 rounded-md text-black">
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
                                <h1 className="text-xs sm:text-sm md:text-md lg:text-[16px] font-extrabold text-green-600">
                                  Storage:
                                </h1>
                              </div>
                              <div className="text-xs flex sm:text-sm md:text-md lg:text-[16px] w-full bg-zinc-200 px-3 py-2 rounded-md text-black">
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
                          <div className="flex flex-col gap-3 w-full">
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
                          <div className="flex flex-col gap-3 w-full">
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
                          <div className="flex flex-col gap-3 w-full">
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
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b-2 border-black/20 w-full"></div>
            <div className="max-w-[1250px] text-justify px-4 flex flex-col items-left justify-center gap-12 mt-16 mb-8">
              {targetTablets.descriptions.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start justify-center gap-2"
                >
                  {item.heading && (
                    <h1 className="text-md md:text-lg lg:text-xl font-extrabold whitespace-nowrap uppercase">
                      {item.heading}
                    </h1>
                  )}
                  {item.detail && (
                    <p className="text-[10px] leading-1 md:text-sm lg:text-lg">
                      {item.detail}
                    </p>
                  )}
                  {item.descriptionimage && (
                    <div className="h-full w-full">
                      <div className="flex items-center justify-center w-full h-full">
                        <img
                          src={item.descriptionimage}
                          alt={item.name}
                          className="h-[300px] md:h-auto md:max-h-[400px] object-center w-auto object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
      </HelmetProvider>
    </>
  );
}

export default TabletBlog;
