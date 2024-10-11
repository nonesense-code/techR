import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, easeInOut } from "framer-motion";
import CircularLoader from "../CircularLoader";
import { FaAmazon } from "react-icons/fa";
import alibaba from "../images/alibabalogo.png";
import daraz from "../images/darazlogo.png";
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

const fetchTargetPhone = async (targetURL, navigate) => {
  try {
    const response = await axios.get(targetURL);

    if (typeof response.data === "object" && response.data !== null) {
      return response.data;
    } else {
      navigate("/phone");
      return;
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response);
    } else {
      console.error("Error during request setup:", error.message);
    }
    navigate("/phone");
    return;
  }
};

function PhoneBlog() {
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

  const targetPhoneURL = import.meta.env.VITE_TARGETPHONE_URL;
  const { itname } = useParams();

  const targetURL = `${targetPhoneURL}/${itname}`;
  const { data: targetPhones = [], isLoading: isLoadingTarget } = useQuery(
    ["targetPhones", targetURL],
    () => fetchTargetPhone(targetURL, navigate),
    {
      staleTime: 1000 * 60 * 5,
    }
  );
  const isLoading =
    loadingBudget || loadingFlagship || loadingMidrange || isLoadingTarget;

  const hasMultipleOptions =
    targetPhones.ram2 || targetPhones.storage2 || targetPhones.price2;
  const hasThreeOptions =
    targetPhones.ram3 || targetPhones.storage3 || targetPhones.price3;

  const rows = [
    {
      ram: targetPhones.ram1,
      storage: targetPhones.storage1,
      price: targetPhones.price1,
    },
    hasMultipleOptions && {
      ram: targetPhones.ram2,
      storage: targetPhones.storage2,
      price: targetPhones.price2,
    },
    hasThreeOptions && {
      ram: targetPhones.ram3,
      storage: targetPhones.storage3,
      price: targetPhones.price3,
    },
  ]
    .filter(Boolean)
    .filter((row) => row.ram && row.storage && row.price);

  const InfoSection = ({ label, value }) => (
    <div className="flex items-center gap-2 max-w-[1200px]">
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
                {targetPhones
                  ? `${targetPhones.name} - Description and Details`
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
                  <div className="w-full md:border-l-4 md:border-black/10 py-4">
                    <h1 className="mt-8 text-2xl md:text-3xl px-4 flex items-center justify-center lg:justify-start whitespace-nowrap tracking-tighter text-[#001] font-semibold border-b-[3px] border-black/10">
                      {targetPhones.name || "..."}
                    </h1>
                    <div className="w-full h-auto py-4 md:px-4 flex flex-col gap-4">
                      <div className="border-gradient w-full h-auto overflow-hidden flex items-center justify-center bg-white">
                        <img
                          src={targetPhones.image}
                          alt={targetPhones.name}
                          className="w-auto h-32 min-h-72 sm:h-96 object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="text-black text-sm tracking-wide md:text-md lg:text-lg font-bold text-justify">
                        {targetPhones.blog || "..."}
                      </div>
                      <div className="w-full h-auto overflow-hidden flex flex-col gap-4 mt-2 text-2xl text-[#002] items-start justify-end">
                        {(targetPhones.dimension ||
                          targetPhones.build ||
                          targetPhones.weight) && (
                          <div className="flex flex-col gap-3 w-full px-4">
                            {targetPhones.dimension && (
                              <InfoSection
                                label="Dimension"
                                value={targetPhones.dimension}
                              />
                            )}
                            {targetPhones.build && (
                              <InfoSection
                                label="Build"
                                value={targetPhones.build}
                              />
                            )}
                            {targetPhones.weight && (
                              <InfoSection
                                label="Weight"
                                value={targetPhones.weight}
                              />
                            )}
                          </div>
                        )}
                        {(targetPhones.dtype ||
                          targetPhones.size ||
                          targetPhones.resolution) && (
                          <div className="flex flex-col gap-3 w-full px-4">
                            {targetPhones.dtype && (
                              <InfoSection
                                label="Type"
                                value={targetPhones.dtype}
                              />
                            )}
                            {targetPhones.size && (
                              <InfoSection
                                label="Size"
                                value={targetPhones.size}
                              />
                            )}
                            {targetPhones.resolution && (
                              <InfoSection
                                label="Resolution"
                                value={targetPhones.resolution}
                              />
                            )}
                          </div>
                        )}
                        {(targetPhones.frontcamera ||
                          targetPhones.maincamera ||
                          targetPhones.video) && (
                          <div className="flex flex-col gap-3 w-full px-4">
                            {targetPhones.frontcamera && (
                              <InfoSection
                                label="FrontCamera"
                                value={targetPhones.frontcamera}
                              />
                            )}
                            {targetPhones.maincamera && (
                              <InfoSection
                                label="BackCamera"
                                value={targetPhones.maincamera}
                              />
                            )}
                            {targetPhones.video && (
                              <InfoSection
                                label="Video"
                                value={targetPhones.video}
                              />
                            )}
                          </div>
                        )}
                        {(targetPhones.os ||
                          targetPhones.processor ||
                          targetPhones.graphics) && (
                          <div className="w-full flex gap-4 justify-start p-2 bg-zinc-50 flex-col rounded-lg px-4">
                            {targetPhones.os && (
                              <InfoSection label="OS" value={targetPhones.os} />
                            )}
                            {targetPhones.processor && (
                              <InfoSection
                                label="Processor"
                                value={targetPhones.processor}
                              />
                            )}
                            {targetPhones.graphics && (
                              <InfoSection
                                label="Graphics"
                                value={targetPhones.graphics}
                              />
                            )}
                          </div>
                        )}

                        {rows.length > 0 && (
                          <div className="w-full flex items-start gap-4 justify-start p-2 bg-zinc-50 flex-col rounded-lg px-4">
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
                        {(targetPhones.capacity || targetPhones.charging) && (
                          <div className="flex flex-col gap-3 w-full px-4">
                            {targetPhones.capacity && (
                              <InfoSection
                                label="Capacity"
                                value={targetPhones.capacity}
                              />
                            )}
                            {targetPhones.charging && (
                              <InfoSection
                                label="Charging"
                                value={targetPhones.charging}
                              />
                            )}
                          </div>
                        )}
                        {(targetPhones.wifi || targetPhones.bluetooth) && (
                          <div className="flex flex-col gap-3 w-full px-4">
                            {targetPhones.wifi && (
                              <InfoSection
                                label="Wi-Fi"
                                value={targetPhones.wifi}
                              />
                            )}
                            {targetPhones.bluetooth && (
                              <InfoSection
                                label="Bluetooth"
                                value={targetPhones.bluetooth}
                              />
                            )}
                          </div>
                        )}
                        {(targetPhones.typec || targetPhones.audiojack) && (
                          <div className="flex flex-col gap-3 w-full px-4">
                            {targetPhones.typec && (
                              <InfoSection
                                label="Type-C"
                                value={targetPhones.typec}
                              />
                            )}
                            {targetPhones.audiojack && (
                              <InfoSection
                                label="Audio Jack"
                                value={targetPhones.audiojack}
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
            <div className="max-w-6xl text-justify px-4 flex flex-col items-left justify-center gap-12 mt-16 mb-8">
              {targetLaptops.descriptions.map((item, index) => (
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
                      <img
                        src={item.descriptionimage}
                        alt={item.name}
                        className="h-[450px] object-center w-full object-cover"
                      />
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

export default PhoneBlog;
