import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import CircularLoader from "../../CircularLoader";
import AIlanding from "./AIlanding";
import { CiMobile3 } from "react-icons/ci";
import { LiaLaptopSolid } from "react-icons/lia";
import { FaTabletAlt } from "react-icons/fa";
import samsumgtab from "../../images/galaxytabs9ultra.jpg";
import acer from "../../images/acernitrov15.png";
import apple from "../../images/applemac.png";
import redmi from "../../images/redminote11pro.jpeg";
import GoogleAds from "../GoogleAds";
import { useQuery } from "react-query";

const fetchProducts = async (backendURL) => {
  const response = await axios.get(backendURL);
  if (!Array.isArray(response.data)) {
    throw new Error("Data format is not an array");
  }
  return response.data;
};

function Landing() {
  const popular_items = [
    {
      name: "Apple Macbook Pro",
      image: apple,
      link: "/laptop/applemacbookpro",
    },
    {
      name: "Acer Nitro V 15",
      image: acer,
      link: "/laptop/acernitrov15",
    },
    {
      name: "Redmi Note 11 Pro",
      image: redmi,
      link: "/phone/redminote11pro",
    },
    {
      name: "Galaxy Tab S9 Ultra",
      image: samsumgtab,
      link: "/tablet/galaxytabs9ultra",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {}, 500);
    return () => clearTimeout(timer);
  }, []);

  const productsURLs = {
    latest: import.meta.env.VITE_LATESTPRODUCTS_URL,
    budget: import.meta.env.VITE_BUDGETPRODUCTS_URL,
    mostsold: import.meta.env.VITE_MOSTSOLDPRODUCTS_URL,
    midrange: import.meta.env.VITE_MIDRANGEPRODUCTS_URL,
    mostpopular: import.meta.env.VITE_MOSTPOPULARPRODUCTS_URL,
    flagship: import.meta.env.VITE_FLAGSHIPPRODUCTS_URL,
    recommended: import.meta.env.VITE_RECOMMENDEDPRODUCTS_URL,
  };

  const useFetchProducts = (key, url) => {
    return useQuery([key, url], () => fetchProducts(url), {
      staleTime: 1000 * 60 * 5,
    });
  };

  const {
    latestLoading,
    data: latestproducts = [],
    latestisError,
    latestError,
  } = useFetchProducts("latestproducts", productsURLs.latest);

  const {
    budgetLoading,
    data: budgetproducts = [],
    budgetisError,
    budgetError,
  } = useFetchProducts("budgetproducts", productsURLs.budget);

  const {
    mostsoldLoading,
    data: mostsoldproducts = [],
    mostsoldisError,
    mostsoldError,
  } = useFetchProducts("mostsoldproducts", productsURLs.mostsold);

  const {
    midrangeLoading,
    data: midrangeproducts = [],
    midrangeproductsisError,
    midrangeproductsError,
  } = useFetchProducts("midrangeproducts", productsURLs.midrange);

  const {
    mostpopularLoading,
    data: mostpopularproducts = [],
    mostpopularproductsisError,
    mostpopularproductsError,
  } = useFetchProducts("mostpopularproducts", productsURLs.mostpopular);

  const {
    flagshipLoading,
    data: flagshipproducts = [],
    flagshipproductsisError,
    flagshipproductsError,
  } = useFetchProducts("flagshipproducts", productsURLs.flagship);

  const {
    recommendedLoading,
    data: recommendedproducts = [],
    recommendedproductsisError,
    recommendedproductsError,
  } = useFetchProducts("recommendedproducts", productsURLs.recommended);

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
  }

  const isLoading =
    latestLoading ||
    budgetLoading ||
    mostsoldLoading ||
    midrangeLoading ||
    mostpopularLoading ||
    flagshipLoading ||
    recommendedLoading;

  return (
    <div className="flex flex-col items-center w-full">
      <div></div>
      <AIlanding />
      <div className="h-full min-w-full sm:min-w-0 w-auto md:max-w-[1200px]">
        <h1 className="text-center text-2xl font-bold tracking-wide">
          Distinguished Picks
        </h1>
        <div className="w-full flex flex-wrap border-2 border-stone-600 mt-2">
          <div className="flex-1 min-w-0 w-full md:w-1/3 border-r-2 border-black p-2 text-center hover:bg-sky-600/30 active:bg-sky-600/40 overflow-hidden">
            <Link
              to="/phone"
              className="h-full items-center flex justify-center w-auto p-2 text-black"
            >
              <div className="flex flex-col items-center justify-center gap-4 text-[#232F3E]">
                <CiMobile3 className="text-3xl scale-125 md:scale-150" />
                <h1 className="text-xs md:text-sm">Phones</h1>
              </div>
            </Link>
          </div>

          <div className="flex-1 min-w-0 w-full md:w-1/3 border-r-2 border-black p-2 text-center hover:bg-sky-600/30 active:bg-sky-600/40 overflow-hidden">
            <Link
              to="/laptop"
              className="h-full items-center flex justify-center w-auto p-2 text-black"
            >
              <div className="flex flex-col items-center justify-center gap-4 text-[#232F3E]">
                <LiaLaptopSolid className="text-3xl scale-125 md:scale-150" />
                <h1 className="text-xs md:text-sm">Laptops</h1>
              </div>
            </Link>
          </div>

          <div className="flex-1 min-w-0 w-full md:w-1/3 p-2 text-center hover:bg-sky-600/30 active:bg-sky-600/40 overflow-hidden">
            <Link
              to="/tablet"
              className="h-full items-center flex justify-center w-auto p-2 text-black"
            >
              <div className="flex flex-col items-center justify-center gap-4 text-[#232F3E]">
                <FaTabletAlt className="text-3xl scale-125 md:scale-150" />
                <h1 className="text-xs md:text-sm">Tablets</h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 mt-10">
          <div className="text-center text-2xl font-bold tracking-wide">
            Top Deals
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 relative h-full w-full gap-1">
            {popular_items.map((item, index) => (
              <div key={index} className="relative w-full overflow-hidden">
                <Link to={item.link}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="border-b-2 border-white/70 object-cover h-auto w-full bg-black border-r-2 border-white hover:scale-105 duration-200 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute text-center bg-black border-white border-t-2 border-b-2 text-[#00FFA3] w-full bottom-0 h-auto p-2 mx-auto left-0 right-0">
                    {item.name}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <GoogleAds />
        {!isLoading ? (
          <div className="h-auto w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-auto w-full"
            >
              <div className="container mx-auto px-4 py-8">
                {/* for the newly launched change item.popularity to item.isNew */}
                {!latestLoading && (
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="text-md lg:text-3xl font-bold bg-black p-2 rounded-md text-[#FFA500] mb-2">
                      Newly Launched
                    </h1>
                    <div className="flex items-center justify-center gap-6 flex-col">
                      {latestproducts.slice(0, 4).map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="border-2 border-[#79d1ec] rounded-xl shadow-lg shadow-[#00FFA3] backdrop-blur-md overflow-hidden p-2 md:flex flex-row w-full"
                          >
                            <Link
                              to={`/${item.productType}/${item.name
                                .toLowerCase()
                                .split(" ")
                                .join("")}`}
                              className="outline-none"
                            >
                              <div className="md:flex items-center justify-center gap-2">
                                <div className="h-auto w-auto">
                                  <motion.div
                                    initial={{ y: 0 }}
                                    animate={{ y: -2 }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                    }}
                                    className="w-auto flex items-center justify-center bg-cover bg-center"
                                  >
                                    <motion.div
                                      whileHover={{
                                        scale: 1.02,
                                      }}
                                    >
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-52 md:w-96 md:h-72 object-contain object-center"
                                        loading="lazy"
                                      />
                                    </motion.div>
                                  </motion.div>
                                </div>
                                <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                  <h2 className="underline-animations text-xl text-black text-center font-extrabold">
                                    {item.name}
                                  </h2>
                                  <p className="text-stone-600 border-[1px] shadow-stone-600 shadow-md border-stone-600/30 p-2 rounded-xl break-words text-center">
                                    {(item.blog &&
                                      truncateText(item.blog, 30)) ||
                                      "No description available"}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Budget device showcase */}
                {!budgetLoading && (
                  <div className="bg-[#F5F5F5] rounded-md lg:rounded-xl w-full h-auto flex items-center justify-center flex-col mt-20">
                    <h1 className="bg-black text-[#FFA500] rounded-md p-1 text-center w-auto text-[18px] md:text-xl whitespace-nowrap mt-4">
                      Check out the Budget devices
                    </h1>
                    <div className="flex items-center justify-evenly gap-2 w-full p-4 flex-wrap">
                      {budgetproducts.slice(0, 6).map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center flex-col gap-1"
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
                              className="h-32 w-32 md:h-64 md:w-80 object-cover object-center border-2 border-[#0006] rounded-xl shadow-md shadow-[#4A90E2]"
                              loading="lazy"
                            />
                            <h1 className="text-center mt-2">
                              Price:{item.price1}
                            </h1>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* for most sale of this year change item.popularity to item.isMostSold */}
                {!mostsoldLoading && (
                  <div className="flex flex-col items-center justify-center mt-20">
                    <h1 className="text-md lg:text-3xl font-bold bg-black p-2 rounded-md text-[#FFA500] mb-2">
                      Most Sold of {new Date().getFullYear()}
                    </h1>
                    <div className="flex items-center justify-center gap-6 flex-col">
                      {mostsoldproducts.slice(0, 4).map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="border-2 border-[#f1cb69] rounded-xl shadow-lg shadow-[#FBC02D] backdrop-blur-md overflow-hidden p-2 md:flex flex-row w-full"
                          >
                            <Link
                              to={`/${item.productType}/${item.name
                                .toLowerCase()
                                .split(" ")
                                .join("")}`}
                              className="outline-none"
                            >
                              <div className="md:flex items-center justify-center gap-2">
                                <div className="h-auto w-auto">
                                  <motion.div
                                    initial={{ y: 0 }}
                                    animate={{ y: -2 }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                    }}
                                    className="w-auto flex items-center justify-center bg-cover bg-center"
                                  >
                                    <motion.div
                                      whileHover={{
                                        scale: 1.02,
                                      }}
                                    >
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-52 md:w-96 md:h-72 object-contain object-center"
                                        loading="lazy"
                                      />
                                    </motion.div>
                                  </motion.div>
                                </div>
                                <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                  <h2 className="underline-animations text-xl text-black text-center font-extrabold">
                                    {item.name}
                                  </h2>
                                  <p className="text-stone-600 border-[1px] shadow-stone-600 shadow-md border-stone-600/30 p-2 rounded-xl break-words text-center">
                                    {(item.blog &&
                                      truncateText(item.blog, 30)) ||
                                      "No description available"}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Premium midrange device showcase */}
                {!midrangeLoading && (
                  <div className="bg-[#F5F5F5] rounded-md lg:rounded-xl w-full h-auto flex items-center justify-center flex-col mt-20">
                    <h1 className="bg-black text-[#FFA500] rounded-md p-1 text-center w-auto text-[18px] md:text-xl whitespace-nowrap mt-4">
                      Check out the premium midrange devices
                    </h1>
                    <div className="flex items-center justify-evenly gap-2 w-full p-4 flex-wrap">
                      {midrangeproducts.slice(0, 6).map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center flex-col gap-1"
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
                              className="h-32 w-32 md:h-64 md:w-80 object-cover object-center border-2 border-[#0006] rounded-xl shadow-md shadow-[#4A90E2]"
                              loading="lazy"
                            />
                            <h1 className="text-center mt-2">
                              Price:{item.price1}
                            </h1>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* for most popular it is perfect item.popularity keep as it is */}
                {!mostpopularLoading && (
                  <div className="flex flex-col items-center justify-center mt-20">
                    <h1 className="text-md lg:text-3xl font-bold bg-black p-2 rounded-md text-[#FFA500] mb-2">
                      Most Popular
                    </h1>
                    <div className="flex items-center justify-center gap-6 flex-col">
                      {mostpopularproducts.slice(0, 4).map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="border-2 border-[#77bffa] rounded-xl shadow-lg shadow-[#42A5F5] backdrop-blur-md overflow-hidden p-2 md:flex flex-row w-full"
                          >
                            <Link
                              to={`/${item.productType}/${item.name
                                .toLowerCase()
                                .split(" ")
                                .join("")}`}
                              className="outline-none"
                            >
                              <div className="md:flex items-center justify-center gap-2">
                                <div className="h-auto w-auto">
                                  <motion.div
                                    initial={{ y: 0 }}
                                    animate={{ y: -2 }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                    }}
                                    className="w-auto flex items-center justify-center bg-cover bg-center"
                                  >
                                    <motion.div
                                      whileHover={{
                                        scale: 1.02,
                                      }}
                                    >
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-52 md:w-96 md:h-72 object-contain object-center"
                                        loading="lazy"
                                      />
                                    </motion.div>
                                  </motion.div>
                                </div>
                                <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                  <h2 className="underline-animations text-xl text-black text-center font-extrabold">
                                    {item.name}
                                  </h2>
                                  <p className="text-stone-600 border-[1px] shadow-stone-600 shadow-md border-stone-600/30 p-2 rounded-xl break-words text-center">
                                    {(item.blog &&
                                      truncateText(item.blog, 30)) ||
                                      "No description available"}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* flagship device showcase */}
                {!flagshipLoading && (
                  <div className="bg-[#F5F5F5] rounded-md lg:rounded-xl w-full h-auto flex items-center justify-center flex-col mt-20">
                    <h1 className="bg-black text-[#FFA500] rounded-md p-1 text-center w-auto text-[18px] md:text-xl whitespace-nowrap mt-4">
                      Flagship devices
                    </h1>
                    <div className="flex items-center justify-evenly gap-2 w-full p-4 flex-wrap">
                      {flagshipproducts.slice(0, 6).map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center flex-col gap-1"
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
                              className="h-32 w-32 md:h-64 md:w-80 object-cover object-center border-2 border-[#0006] rounded-xl shadow-md shadow-[#4A90E2]"
                              loading="lazy"
                            />
                            <h1 className="text-center mt-2">
                              Price:{item.price1}
                            </h1>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* for recommended product change item.popularity to recommended */}
                {!recommendedLoading && (
                  <div className="flex flex-col items-center justify-center mt-20">
                    <h1 className="text-md lg:text-3xl font-bold bg-black p-2 rounded-md text-[#FFA500] mb-2">
                      Recommended for you
                    </h1>
                    <div className="flex items-center justify-center gap-6 flex-col">
                      {recommendedproducts.slice(0, 4).map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="border-2 border-[#d28bee] rounded-xl shadow-lg shadow-[#9B59B6] backdrop-blur-md overflow-hidden p-2 md:flex flex-row w-full"
                          >
                            <Link
                              to={`/${item.productType}/${item.name
                                .toLowerCase()
                                .split(" ")
                                .join("")}`}
                              className="outline-none"
                            >
                              <div className="md:flex items-center justify-center gap-2">
                                <div className="h-auto w-auto">
                                  <motion.div
                                    initial={{ y: 0 }}
                                    animate={{ y: -2 }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                    }}
                                    className="w-auto flex items-center justify-center bg-cover bg-center"
                                  >
                                    <motion.div
                                      whileHover={{
                                        scale: 1.02,
                                      }}
                                    >
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-52 md:w-96 md:h-72 object-contain object-center"
                                        loading="lazy"
                                      />
                                    </motion.div>
                                  </motion.div>
                                </div>
                                <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                  <h2 className="underline-animations text-xl text-black text-center font-extrabold">
                                    {item.name}
                                  </h2>
                                  <p className="text-stone-600 border-[1px] shadow-stone-600 shadow-md border-stone-600/30 p-2 rounded-xl break-words text-center">
                                    {(item.blog &&
                                      truncateText(item.blog, 30)) ||
                                      "No description available"}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="h-screen w-full text-xl"
          >
            <CircularLoader />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Landing;
