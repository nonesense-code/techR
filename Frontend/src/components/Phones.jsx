import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

function Phones() {
  const gamingURL = import.meta.env.VITE_GAMER_URL;
  const professionalURL = import.meta.env.VITE_PROFESSIONAL_URL;
  const studentsURL = import.meta.env.VITE_STUDENTS_URL;
  const normalusageURL = import.meta.env.VITE_NORMALUSAGE_URL;

  const {
    isLoading: loadinggamingphone,
    data: gamingphone = [],
    gamingphoneisError,
    gamingphoneError,
  } = useQuery(["gamingphone", gamingURL], () => filterProducts(gamingURL), {
    staleTime: 1000 * 60 * 5,
  });

  const {
    isLoading: loadingprofessionalphone,
    data: professionalphone = [],
    professionalphoneisError,
    professionalphoneError,
  } = useQuery(
    ["professionalphone", professionalURL],
    () => filterProducts(professionalURL),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const {
    isLoading: loadingstudentsphone,
    data: studentsphone = [],
    studentsphoneisError,
    studentsphoneError,
  } = useQuery(
    ["studentsphone", studentsURL],
    () => filterProducts(studentsURL),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const {
    isLoading: loadingnormalusagephone,
    data: normalusagephone = [],
    normalusagephoneisError,
    normalusagephoneError,
  } = useQuery(
    ["normalusagephone", normalusageURL],
    () => filterProducts(normalusageURL),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const isLoading =
    loadinggamingphone ||
    loadingprofessionalphone ||
    loadingstudentsphone ||
    loadingnormalusagephone;

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col justify-between">
        <Helmet>
          <title>Best Phones of 2024 under various categories and price segments</title>
        </Helmet>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="h-screen w-full"
          >
            <CircularLoader />
          </motion.div>
        ) : (
          <div className="min-h-screen h-auto w-full mt-12">
            <div className="container mx-auto px-4 flex flex-col gap-6 md:gap-8 mb-12">
              <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
                Find Your Perfect phone Companion!
              </h1>

              <div className="flex flex-col items-center justify-center">
                <h1 className="text-md md:text-3xl font-bold bg-black p-2 rounded-md text-[#FFA500] mb-2">
                  Gaming phone
                </h1>
                <div className="flex items-center justify-center gap-4 flex-col">
                  {gamingphone &&
                    gamingphone.map(
                      (phone, index) =>
                        phone.productType === "phone" && (
                          <div
                            key={index}
                            className="border-2 border-zinc-500 shadow-lg shadow-indigo-600 rounded-xl overflow-hidden p-2 md:flex flex-row w-full items-center justify-center"
                          >
                            <Link
                              to={`/${phone.productType}/${phone.name
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
                                        src={phone.image}
                                        alt={phone.name}
                                        className="w-full h-52 md:w-72 md:h-72 object-contain object-center rounded-md"
                                        loading="lazy"
                                      />
                                    </motion.div>
                                  </motion.div>
                                </div>
                                <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                  <h2 className="text-lg whitespace-nowrap break-words md:text-xl lg:text-2xl text-black text-center font-extrabold">
                                    {phone.name}
                                  </h2>
                                  <p className="text-stone-600 border-[2px] border-stone-600/30 p-2 rounded-xl text-xs md:text-sm lg:text-lg break-words text-center">
                                    {(phone.blog &&
                                      truncateText(phone.blog, 30)) ||
                                      "No description available"}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        )
                    )}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <h1 className="text-md md:text-3xl font-bold bg-black p-2 rounded-md text-[#FFA500] mb-2">
                  Professional phone
                </h1>
                <div className="flex items-center justify-center gap-4 flex-col">
                  {professionalphone &&
                    professionalphone.map(
                      (phone, index) =>
                        phone.productType === "phone" && (
                          <div
                            key={index}
                            className="border-2 border-purple-600 shadow-lg shadow-purple-600 rounded-xl overflow-hidden p-2 md:flex flex-row w-full items-center justify-center"
                          >
                            <Link
                              to={`/${phone.productType}/${phone.name
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
                                        src={phone.image}
                                        alt={phone.name}
                                        className="w-full h-52 md:w-72 md:h-72 object-contain object-center rounded-md"
                                        loading="lazy"
                                      />
                                    </motion.div>
                                  </motion.div>
                                </div>
                                <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                  <h2 className="text-lg whitespace-nowrap break-words md:text-xl lg:text-2xl text-black text-center font-extrabold">
                                    {phone.name}
                                  </h2>
                                  <p className="text-stone-600 border-[2px] border-stone-600/30 p-2 rounded-xl text-xs md:text-sm lg:text-lg break-words text-center">
                                    {(phone.blog &&
                                      truncateText(phone.blog, 30)) ||
                                      "No description available"}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        )
                    )}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <h1 className="text-md md:text-3xl font-bold bg-black p-2 rounded-md text-[#FFA500] mb-2">
                  Students phone
                </h1>
                <div className="flex items-center justify-center gap-4 flex-col">
                  {studentsphone &&
                    studentsphone.map(
                      (phone, index) =>
                        phone.productType === "phone" && (
                          <div
                            key={index}
                            className="border-2 border-orange-600 shadow-lg shadow-orange-600 rounded-xl overflow-hidden p-2 md:flex flex-row w-full items-center justify-center"
                          >
                            <Link
                              to={`/${phone.productType}/${phone.name
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
                                        src={phone.image}
                                        alt={phone.name}
                                        className="w-full h-52 md:w-72 md:h-72 object-contain object-center rounded-md"
                                        loading="lazy"
                                      />
                                    </motion.div>
                                  </motion.div>
                                </div>
                                <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                  <h2 className="text-lg whitespace-nowrap break-words md:text-xl lg:text-2xl text-black text-center font-extrabold">
                                    {phone.name}
                                  </h2>
                                  <p className="text-stone-600 border-[2px] border-stone-600/30 p-2 rounded-xl text-xs md:text-sm lg:text-lg break-words text-center">
                                    {(phone.blog &&
                                      truncateText(phone.blog, 30)) ||
                                      "No description available"}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        )
                    )}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <h1 className="text-md md:text-3xl font-bold bg-black p-2 rounded-md text-[#FFA500] mb-2">
                  Normal Usage phone
                </h1>
                <div className="flex items-center justify-center gap-4 flex-col">
                  {normalusagephone &&
                    normalusagephone.map(
                      (phone, index) =>
                        phone.productType === "phone" && (
                          <div
                            key={index}
                            className="border-2 border-sky-600 shadow-lg shadow-sky-600 rounded-xl overflow-hidden p-2 md:flex flex-row w-full items-center justify-center"
                          >
                            <Link
                              to={`/${phone.productType}/${phone.name
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
                                        src={phone.image}
                                        alt={phone.name}
                                        className="w-full h-52 md:w-72 md:h-72 object-contain object-center rounded-md"
                                        loading="lazy"
                                      />
                                    </motion.div>
                                  </motion.div>
                                </div>
                                <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                  <h2 className="text-lg whitespace-nowrap break-words md:text-xl lg:text-2xl text-black text-center font-extrabold">
                                    {phone.name}
                                  </h2>
                                  <p className="text-stone-600 border-[2px] border-stone-600/30 p-2 rounded-xl text-xs md:text-sm lg:text-lg break-words text-center">
                                    {(phone.blog &&
                                      truncateText(phone.blog, 30)) ||
                                      "No description available"}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        )
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </HelmetProvider>
  );
}

export default Phones;
