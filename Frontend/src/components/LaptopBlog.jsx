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

const fetchTargetLaptops = async (targetURL, navigate) => {
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

function LaptopBlog() {
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

  const targetlaptopURL = import.meta.env.VITE_TARGETLAPTOP_URL;
  const { itname } = useParams();

  const targetURL = `${targetlaptopURL}/${itname}`;
  const { data: targetlaptops = [], isLoading: isLoadingTarget } = useQuery(
    ["targetlaptops", targetURL],
    () => fetchTargetLaptops(targetURL, navigate),
    {
      staleTime: 1000 * 60 * 5,
    }
  );
  const isLoading =
    loadingBudget || loadingFlagship || loadingMidrange || isLoadingTarget;

  const hasMultipleOptions =
    targetlaptops.ram2 || targetlaptops.storage2 || targetlaptops.price2;
  const hasThreeOptions =
    targetlaptops.ram3 || targetlaptops.storage3 || targetlaptops.price3;

  const rows = [
    {
      ram: targetlaptops.ram1,
      storage: targetlaptops.storage1,
      price: targetlaptops.price1,
    },
    hasMultipleOptions && {
      ram: targetlaptops.ram2,
      storage: targetlaptops.storage2,
      price: targetlaptops.price2,
    },
    hasThreeOptions && {
      ram: targetlaptops.ram3,
      storage: targetlaptops.storage3,
      price: targetlaptops.price3,
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
                {targetlaptops
                  ? `${targetlaptops.name} - Description and Details`
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
                        <div className="hidescroller w-full pt-4 flex flex-col gap-8 items-center overflow-y-auto p-4 h-[500px]">
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
                                <h1 className="w-full text-center bg-zinc-600 rounded-b-lg">
                                  {item.name}
                                </h1>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex mt-8 w-ful h-auto">
                      <div className="h-auto">
                        <h1 className="text-2xl text-center">Midrange</h1>
                        <div className="hidescroller w-full pt-4 flex flex-col gap-8 items-center overflow-y-auto p-4 h-[500px]">
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
                                <h1 className="w-full text-center bg-zinc-600 rounded-b-lg">
                                  {item.name}
                                </h1>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex mt-8 w-ful h-auto">
                      <div className="h-auto">
                        <h1 className="text-2xl text-center">Budget</h1>
                        <div className="hidescroller w-full pt-4 flex flex-col gap-8 items-center overflow-y-auto p-4 h-[500px]">
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
                                <h1 className="w-full text-center bg-zinc-600 rounded-b-lg">
                                  {item.name}
                                </h1>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:border-l-4 md:border-black/10 py-4">
                    <h1 className="mt-8 text-2xl md:text-3xl px-4 flex items-center justify-center lg:justify-start whitespace-nowrap tracking-tighter text-[#001] font-semibold border-b-[3px] border-black/10">
                      {targetlaptops.name || "..."}
                    </h1>
                    <div className="w-full h-auto py-4 md:px-4 flex flex-col gap-4">
                      <div className="w-full h-auto overflow-hidden flex items-center justify-center bg-white rounded-xl">
                        <img
                          src={targetlaptops.image}
                          alt={targetlaptops.name}
                          className="w-auto h-32 min-h-72 sm:h-96 object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="text-black text-sm tracking-wide md:text-md lg:text-lg font-bold text-justify">
                        {targetlaptops.blog || "..."}
                      </div>
                      <div className="w-full h-auto overflow-hidden flex flex-col gap-4 mt-2 text-2xl text-[#002] items-start justify-end">
                        {(targetlaptops.dimension ||
                          targetlaptops.build ||
                          targetlaptops.weight) && (
                          <div className="flex flex-col gap-3 w-full px-4">
                            {targetlaptops.dimension && (
                              <InfoSection
                                label="Dimension"
                                value={targetlaptops.dimension}
                              />
                            )}
                            {targetlaptops.build && (
                              <InfoSection
                                label="Build"
                                value={targetlaptops.build}
                              />
                            )}
                            {targetlaptops.weight && (
                              <InfoSection
                                label="Weight"
                                value={targetlaptops.weight}
                              />
                            )}
                          </div>
                        )}
                        {(targetlaptops.dtype ||
                          targetlaptops.size ||
                          targetlaptops.resolution) && (
                          <div className="flex flex-col gap-3 w-full px-4">
                            {targetlaptops.dtype && (
                              <InfoSection
                                label="Type"
                                value={targetlaptops.dtype}
                              />
                            )}
                            {targetlaptops.size && (
                              <InfoSection
                                label="Size"
                                value={targetlaptops.size}
                              />
                            )}
                            {targetlaptops.resolution && (
                              <InfoSection
                                label="Resolution"
                                value={targetlaptops.resolution}
                              />
                            )}
                          </div>
                        )}
                        {(targetlaptops.frontcamera ||
                          targetlaptops.maincamera ||
                          targetlaptops.video) && (
                          <div className="flex flex-col gap-3 w-full px-4">
                            {targetlaptops.frontcamera && (
                              <InfoSection
                                label="FrontCamera"
                                value={targetlaptops.frontcamera}
                              />
                            )}
                            {targetlaptops.maincamera && (
                              <InfoSection
                                label="BackCamera"
                                value={targetlaptops.maincamera}
                              />
                            )}
                            {targetlaptops.video && (
                              <InfoSection
                                label="Video"
                                value={targetlaptops.video}
                              />
                            )}
                          </div>
                        )}
                        {(targetlaptops.os ||
                          targetlaptops.processor ||
                          targetlaptops.graphics) && (
                          <div className="w-full flex gap-4 justify-start p-2 bg-zinc-50 flex-col rounded-lg px-4">
                            {targetlaptops.os && (
                              <InfoSection
                                label="OS"
                                value={targetlaptops.os}
                              />
                            )}
                            {targetlaptops.processor && (
                              <InfoSection
                                label="Processor"
                                value={targetlaptops.processor}
                              />
                            )}
                            {targetlaptops.graphics && (
                              <InfoSection
                                label="Graphics"
                                value={targetlaptops.graphics}
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
                        {(targetlaptops.capacity || targetlaptops.charging) && (
                          <div className="flex flex-col gap-3 w-full px-4">
                            {targetlaptops.capacity && (
                              <InfoSection
                                label="Capacity"
                                value={targetlaptops.capacity}
                              />
                            )}
                            {targetlaptops.charging && (
                              <InfoSection
                                label="Charging"
                                value={targetlaptops.charging}
                              />
                            )}
                          </div>
                        )}
                        {(targetlaptops.wifi || targetlaptops.bluetooth) && (
                          <div className="flex flex-col gap-3 w-full px-4">
                            {targetlaptops.wifi && (
                              <InfoSection
                                label="Wi-Fi"
                                value={targetlaptops.wifi}
                              />
                            )}
                            {targetlaptops.bluetooth && (
                              <InfoSection
                                label="Bluetooth"
                                value={targetlaptops.bluetooth}
                              />
                            )}
                          </div>
                        )}
                        {(targetlaptops.typec || targetlaptops.audiojack) && (
                          <div className="flex flex-col gap-3 w-full px-4">
                            {targetlaptops.typec && (
                              <InfoSection
                                label="Type-C"
                                value={targetlaptops.typec}
                              />
                            )}
                            {targetlaptops.audiojack && (
                              <InfoSection
                                label="Audio Jack"
                                value={targetlaptops.audiojack}
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
                    {/* <div className="flex flex-col items-center justify-center text-lg text-center">
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
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b-2 border-black/20 w-full"></div>
            <div className="max-w-6xl text-justify px-4 flex flex-col items-left justify-center gap-12 mt-16">
              <div className="flex flex-col items-start justify-center gap-2">
                <h1 className="text-md md:text-lg lg:text-xl font-extrabold whitespace-nowrap">
                  TOPIC 1
                </h1>
                <p className="text-[10px] leading-1 md:text-sm lg:text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet quos voluptas minus qui voluptatibus ipsa magnam
                  pariatur quia tempora blanditiis dolores nostrum et expedita,
                  sequi iure sit, aut numquam accusantium temporibus vitae
                  dolorum cupiditate architecto excepturi rem! Placeat iste
                  sequi, inventore assumenda rem corrupti vitae porro labore
                  consectetur optio error dolore nam saepe fugiat, perspiciatis
                  aut quos ad soluta quae, velit corporis culpa ea.
                  Reprehenderit quam animi, ad, nemo magnam, laborum
                  consequuntur unde facere quas autem aperiam reiciendis
                  explicabo. Alias illo fugiat quae mollitia! Nesciunt
                  voluptatibus rem consequuntur voluptate. Laborum explicabo
                  esse voluptatum animi nulla similique, sequi odit libero
                  doloribus dolorum! Totam officia sapiente cupiditate ut?
                  Eveniet sunt asperiores vitae hic nobis ratione deleniti
                  recusandae doloribus perspiciatis, at fugit mollitia assumenda
                  quia officiis fugiat, nulla quas voluptatum porro eum quis
                  necessitatibus. Eum ducimus quia placeat ratione, recusandae
                  libero est nisi molestiae repudiandae, quasi reprehenderit
                  dolorem illo reiciendis veniam, consequuntur obcaecati tenetur
                  delectus sit! Sapiente recusandae, provident eos qui aliquam
                  animi doloremque accusamus exercitationem modi blanditiis
                  magnam maxime corrupti numquam! Eaque facilis alias itaque
                  soluta ipsam, laborum, esse a voluptates quam iusto cupiditate
                  assumenda magni! Eum nostrum consequuntur itaque architecto,
                  voluptatem voluptatum, omnis, ducimus excepturi debitis
                  pariatur corporis corrupti nulla quasi.
                </p>
              </div>
              <div className="flex flex-col items-start justify-center gap-2">
                <h1 className="text-md md:text-lg lg:text-xl font-extrabold whitespace-nowrap">
                  TOPIC 1
                </h1>
                <p className="text-[10px] leading-1 md:text-sm lg:text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet quos voluptas minus qui voluptatibus ipsa magnam
                  pariatur quia tempora blanditiis dolores nostrum et expedita,
                  sequi iure sit, aut numquam accusantium temporibus vitae
                  dolorum cupiditate architecto excepturi rem! Placeat iste
                  sequi, inventore assumenda rem corrupti vitae porro labore
                  consectetur optio error dolore nam saepe fugiat, perspiciatis
                  aut quos ad soluta quae, velit corporis culpa ea.
                  Reprehenderit quam animi, ad, nemo magnam, laborum
                  consequuntur unde facere quas autem aperiam reiciendis
                  explicabo. Alias illo fugiat quae mollitia! Nesciunt
                  voluptatibus rem consequuntur voluptate. Laborum explicabo
                  esse voluptatum animi nulla similique, sequi odit libero
                  doloribus dolorum! Totam officia sapiente cupiditate ut?
                  Eveniet sunt asperiores vitae hic nobis ratione deleniti
                  recusandae doloribus perspiciatis, at fugit mollitia assumenda
                  quia officiis fugiat, nulla quas voluptatum porro eum quis
                  necessitatibus. Eum ducimus quia placeat ratione, recusandae
                  libero est nisi molestiae repudiandae, quasi reprehenderit
                  dolorem illo reiciendis veniam, consequuntur obcaecati tenetur
                  delectus sit! Sapiente recusandae, provident eos qui aliquam
                  animi doloremque accusamus exercitationem modi blanditiis
                  magnam maxime corrupti numquam! Eaque facilis alias itaque
                  soluta ipsam, laborum, esse a voluptates quam iusto cupiditate
                  assumenda magni! Eum nostrum consequuntur itaque architecto,
                  voluptatem voluptatum, omnis, ducimus excepturi debitis
                  pariatur corporis corrupti nulla quasi.
                </p>
              </div>
              <div className="flex flex-col items-start justify-center gap-2">
                <h1 className="text-md md:text-lg lg:text-xl font-extrabold whitespace-nowrap">
                  TOPIC 1
                </h1>
                <p className="text-[10px] leading-1 md:text-sm lg:text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet quos voluptas minus qui voluptatibus ipsa magnam
                  pariatur quia tempora blanditiis dolores nostrum et expedita,
                  sequi iure sit, aut numquam accusantium temporibus vitae
                  dolorum cupiditate architecto excepturi rem! Placeat iste
                  sequi, inventore assumenda rem corrupti vitae porro labore
                  consectetur optio error dolore nam saepe fugiat, perspiciatis
                  aut quos ad soluta quae, velit corporis culpa ea.
                  Reprehenderit quam animi, ad, nemo magnam, laborum
                  consequuntur unde facere quas autem aperiam reiciendis
                  explicabo. Alias illo fugiat quae mollitia! Nesciunt
                  voluptatibus rem consequuntur voluptate. Laborum explicabo
                  esse voluptatum animi nulla similique, sequi odit libero
                  doloribus dolorum! Totam officia sapiente cupiditate ut?
                  Eveniet sunt asperiores vitae hic nobis ratione deleniti
                  recusandae doloribus perspiciatis, at fugit mollitia assumenda
                  quia officiis fugiat, nulla quas voluptatum porro eum quis
                  necessitatibus. Eum ducimus quia placeat ratione, recusandae
                  libero est nisi molestiae repudiandae, quasi reprehenderit
                  dolorem illo reiciendis veniam, consequuntur obcaecati tenetur
                  delectus sit! Sapiente recusandae, provident eos qui aliquam
                  animi doloremque accusamus exercitationem modi blanditiis
                  magnam maxime corrupti numquam! Eaque facilis alias itaque
                  soluta ipsam, laborum, esse a voluptates quam iusto cupiditate
                  assumenda magni! Eum nostrum consequuntur itaque architecto,
                  voluptatem voluptatum, omnis, ducimus excepturi debitis
                  pariatur corporis corrupti nulla quasi.
                </p>
              </div>
              <div className="flex flex-col items-start justify-center gap-2">
                <h1 className="text-md md:text-lg lg:text-xl font-extrabold whitespace-nowrap">
                  TOPIC 1
                </h1>
                <p className="text-[10px] leading-1 md:text-sm lg:text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet quos voluptas minus qui voluptatibus ipsa magnam
                  pariatur quia tempora blanditiis dolores nostrum et expedita,
                  sequi iure sit, aut numquam accusantium temporibus vitae
                  dolorum cupiditate architecto excepturi rem! Placeat iste
                  sequi, inventore assumenda rem corrupti vitae porro labore
                  consectetur optio error dolore nam saepe fugiat, perspiciatis
                  aut quos ad soluta quae, velit corporis culpa ea.
                  Reprehenderit quam animi, ad, nemo magnam, laborum
                  consequuntur unde facere quas autem aperiam reiciendis
                  explicabo. Alias illo fugiat quae mollitia! Nesciunt
                  voluptatibus rem consequuntur voluptate. Laborum explicabo
                  esse voluptatum animi nulla similique, sequi odit libero
                  doloribus dolorum! Totam officia sapiente cupiditate ut?
                  Eveniet sunt asperiores vitae hic nobis ratione deleniti
                  recusandae doloribus perspiciatis, at fugit mollitia assumenda
                  quia officiis fugiat, nulla quas voluptatum porro eum quis
                  necessitatibus. Eum ducimus quia placeat ratione, recusandae
                  libero est nisi molestiae repudiandae, quasi reprehenderit
                  dolorem illo reiciendis veniam, consequuntur obcaecati tenetur
                  delectus sit! Sapiente recusandae, provident eos qui aliquam
                  animi doloremque accusamus exercitationem modi blanditiis
                  magnam maxime corrupti numquam! Eaque facilis alias itaque
                  soluta ipsam, laborum, esse a voluptates quam iusto cupiditate
                  assumenda magni! Eum nostrum consequuntur itaque architecto,
                  voluptatem voluptatum, omnis, ducimus excepturi debitis
                  pariatur corporis corrupti nulla quasi.
                </p>
              </div>
              <div className="flex flex-col items-start justify-center gap-2">
                <h1 className="text-md md:text-lg lg:text-xl font-extrabold whitespace-nowrap">
                  TOPIC 1
                </h1>
                <p className="text-[10px] leading-1 md:text-sm lg:text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet quos voluptas minus qui voluptatibus ipsa magnam
                  pariatur quia tempora blanditiis dolores nostrum et expedita,
                  sequi iure sit, aut numquam accusantium temporibus vitae
                  dolorum cupiditate architecto excepturi rem! Placeat iste
                  sequi, inventore assumenda rem corrupti vitae porro labore
                  consectetur optio error dolore nam saepe fugiat, perspiciatis
                  aut quos ad soluta quae, velit corporis culpa ea.
                  Reprehenderit quam animi, ad, nemo magnam, laborum
                  consequuntur unde facere quas autem aperiam reiciendis
                  explicabo. Alias illo fugiat quae mollitia! Nesciunt
                  voluptatibus rem consequuntur voluptate. Laborum explicabo
                  esse voluptatum animi nulla similique, sequi odit libero
                  doloribus dolorum! Totam officia sapiente cupiditate ut?
                  Eveniet sunt asperiores vitae hic nobis ratione deleniti
                  recusandae doloribus perspiciatis, at fugit mollitia assumenda
                  quia officiis fugiat, nulla quas voluptatum porro eum quis
                  necessitatibus. Eum ducimus quia placeat ratione, recusandae
                  libero est nisi molestiae repudiandae, quasi reprehenderit
                  dolorem illo reiciendis veniam, consequuntur obcaecati tenetur
                  delectus sit! Sapiente recusandae, provident eos qui aliquam
                  animi doloremque accusamus exercitationem modi blanditiis
                  magnam maxime corrupti numquam! Eaque facilis alias itaque
                  soluta ipsam, laborum, esse a voluptates quam iusto cupiditate
                  assumenda magni! Eum nostrum consequuntur itaque architecto,
                  voluptatem voluptatum, omnis, ducimus excepturi debitis
                  pariatur corporis corrupti nulla quasi.
                </p>
              </div>
              <div className="flex flex-col items-start justify-center gap-2">
                <h1 className="text-md md:text-lg lg:text-xl font-extrabold whitespace-nowrap">
                  TOPIC 1
                </h1>
                <p className="text-[10px] leading-1 md:text-sm lg:text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet quos voluptas minus qui voluptatibus ipsa magnam
                  pariatur quia tempora blanditiis dolores nostrum et expedita,
                  sequi iure sit, aut numquam accusantium temporibus vitae
                  dolorum cupiditate architecto excepturi rem! Placeat iste
                  sequi, inventore assumenda rem corrupti vitae porro labore
                  consectetur optio error dolore nam saepe fugiat, perspiciatis
                  aut quos ad soluta quae, velit corporis culpa ea.
                  Reprehenderit quam animi, ad, nemo magnam, laborum
                  consequuntur unde facere quas autem aperiam reiciendis
                  explicabo. Alias illo fugiat quae mollitia! Nesciunt
                  voluptatibus rem consequuntur voluptate. Laborum explicabo
                  esse voluptatum animi nulla similique, sequi odit libero
                  doloribus dolorum! Totam officia sapiente cupiditate ut?
                  Eveniet sunt asperiores vitae hic nobis ratione deleniti
                  recusandae doloribus perspiciatis, at fugit mollitia assumenda
                  quia officiis fugiat, nulla quas voluptatum porro eum quis
                  necessitatibus. Eum ducimus quia placeat ratione, recusandae
                  libero est nisi molestiae repudiandae, quasi reprehenderit
                  dolorem illo reiciendis veniam, consequuntur obcaecati tenetur
                  delectus sit! Sapiente recusandae, provident eos qui aliquam
                  animi doloremque accusamus exercitationem modi blanditiis
                  magnam maxime corrupti numquam! Eaque facilis alias itaque
                  soluta ipsam, laborum, esse a voluptates quam iusto cupiditate
                  assumenda magni! Eum nostrum consequuntur itaque architecto,
                  voluptatem voluptatum, omnis, ducimus excepturi debitis
                  pariatur corporis corrupti nulla quasi.
                </p>
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
      </HelmetProvider>
    </>
  );
}

export default LaptopBlog;
