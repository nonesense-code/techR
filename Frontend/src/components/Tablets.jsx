import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import CircularLoader from "../CircularLoader";
import { useQuery } from "react-query";

const filterProducts = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function Tablets() {
  const gamingURL = import.meta.env.VITE_GAMER_URL;
  const professionalURL = import.meta.env.VITE_PROFESSIONAL_URL;
  const studentsURL = import.meta.env.VITE_STUDENTS_URL;
  const normalusageURL = import.meta.env.VITE_NORMALUSAGE_URL;

  const {
    isLoading: loadinggamingtablet,
    data: gamingtablet = [],
    gamingtabletisError,
    gamingtabletError,
  } = useQuery(["gamingtablet", gamingURL], () => filterProducts(gamingURL), {
    staleTime: 1000 * 60 * 5,
  });

  const {
    isLoading: loadingprofessionaltablet,
    data: professionaltablet = [],
    professionaltabletisError,
    professionaltabletError,
  } = useQuery(
    ["professionaltablet", professionalURL],
    () => filterProducts(professionalURL),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const {
    isLoading: loadingstudentstablet,
    data: studentstablet = [],
    studentstabletisError,
    studentstabletError,
  } = useQuery(
    ["studentstablet", studentsURL],
    () => filterProducts(studentsURL),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const {
    isLoading: loadingnormalusagetablet,
    data: normalusagetablet = [],
    normalusagetabletisError,
    normalusagetabletError,
  } = useQuery(
    ["normalusagetablet", normalusageURL],
    () => filterProducts(normalusageURL),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const isLoading =
    loadinggamingtablet ||
    loadingprofessionaltablet ||
    loadingstudentstablet ||
    loadingnormalusagetablet;

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }
  return (
    <div className="min-h-screen w-full">
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CircularLoader />
        </motion.div>
      ) : (
        <div className="min-h-screen h-auto w-full mt-12">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-3xl font-bold text-center mb-4 text-gray-800">
              Find Your Perfect tablet Companion!
            </h1>

            <section className="mb-10 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-center mb-4">
                Gaming Tablets
              </h2>
              <div className="flex flex-col items-center justify-center w-full gap-6">
                {gamingtablet.length > 0 &&
                  gamingtablet.map(
                    (tablet, index) =>
                      tablet.productType === "tablet" && (
                        <motion.div
                          key={index}
                          className="bg-transparent shadow-md shadow-black rounded-lg overflow-hidden p-2 md:flex flex-row w-full"
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link
                            to={`${tablet.name
                              .toLowerCase()
                              .split(" ")
                              .join("")}`}
                            className="outline-none"
                          >
                            <div className="md:flex items-center justify-center gap-2">
                              <div className="h-auto w-auto">
                                <motion.div
                                  initial={{ y: 0 }}
                                  animate={{ y: 6 }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                  }}
                                  whileHover={{
                                    scale: 1.01,
                                  }}
                                  className="w-auto flex items-center justify-center bg-cover bg-center"
                                >
                                  <img
                                    src={tablet.image}
                                    alt={tablet.name}
                                    className="w-full md:w-full md:h-96 p-12 object-contain object-center"
                                    loading="lazy"
                                  />
                                </motion.div>
                              </div>
                              <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                <h3 className="underline-animations text-xl text-black text-center font-extrabold">
                                  {tablet.name}
                                </h3>
                                <p className="text-stone-600">
                                  {(tablet.blog &&
                                    truncateText(tablet.blog, 30)) ||
                                    "No description available"}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      )
                  )}
              </div>
            </section>

            <section className="mb-10 bg-green-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-center mb-4">
                Professional Tablets
              </h2>
              <div className="flex flex-col items-center justify-center w-full gap-6">
                {professionaltablet.length > 0 &&
                  professionaltablet.map(
                    (tablet, index) =>
                      tablet.productType === "tablet" && (
                        <motion.div
                          key={index}
                          className="bg-white shadow-lg rounded-lg overflow-hidden p-2 md:flex flex-row w-full"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Link
                            to={`${tablet.name
                              .toLowerCase()
                              .split(" ")
                              .join("")}`}
                            className="outline-none"
                          >
                            <div className="md:flex items-center justify-center gap-2">
                              <div className="h-auto w-auto">
                                <motion.div
                                  initial={{ y: 0 }}
                                  animate={{ y: 6 }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                  }}
                                  whileHover={{
                                    scale: 1.01,
                                  }}
                                  className="w-auto flex items-center justify-center bg-cover bg-center"
                                >
                                  <img
                                    src={tablet.image}
                                    alt={tablet.name}
                                    className="w-full md:w-full md:h-96 p-12 object-contain object-center"
                                    loading="lazy"
                                  />
                                </motion.div>
                              </div>
                              <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                <h3 className="underline-animations text-xl text-black text-center font-extrabold">
                                  {tablet.name}
                                </h3>
                                <p className="text-stone-600">
                                  {(tablet.blog &&
                                    truncateText(tablet.blog, 30)) ||
                                    "No description available"}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      )
                  )}
              </div>
            </section>

            <section className="mb-10 bg-purple-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-center mb-4">
                Student Tablets
              </h2>
              <div className="flex flex-col items-center justify-center w-full gap-6">
                {studentstablet.length > 0 &&
                  studentstablet.map(
                    (tablet, index) =>
                      tablet.productType === "tablet" && (
                        <motion.div
                          key={index}
                          className="bg-white shadow-lg rounded-lg overflow-hidden p-2 md:flex flex-row w-full"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Link
                            to={`${tablet.name
                              .toLowerCase()
                              .split(" ")
                              .join("")}`}
                            className="outline-none"
                          >
                            <div className="md:flex items-center justify-center gap-2">
                              <div className="h-auto w-auto">
                                <motion.div
                                  initial={{ y: 0 }}
                                  animate={{ y: 6 }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                  }}
                                  whileHover={{
                                    scale: 1.01,
                                  }}
                                  className="w-auto flex items-center justify-center bg-cover bg-center"
                                >
                                  <img
                                    src={tablet.image}
                                    alt={tablet.name}
                                    className="w-full md:w-full md:h-96 p-12 object-contain object-center"
                                    loading="lazy"
                                  />
                                </motion.div>
                              </div>
                              <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                <h3 className="underline-animations text-xl text-black text-center font-extrabold">
                                  {tablet.name}
                                </h3>
                                <p className="text-stone-600">
                                  {(tablet.blog &&
                                    truncateText(tablet.blog, 30)) ||
                                    "No description available"}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      )
                  )}
              </div>
            </section>

            <section className="mb-10 bg-yellow-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-center mb-4">
                Normal Usage Tablets
              </h2>
              <div className="flex flex-col items-center justify-center w-full gap-6">
                {normalusagetablet.length > 0 &&
                  normalusagetablet.map(
                    (tablet, index) =>
                      tablet.productType === "tablet" && (
                        <motion.div
                          key={index}
                          className="bg-white shadow-lg rounded-lg overflow-hidden p-2 md:flex flex-row w-full"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Link
                            to={`${tablet.name
                              .toLowerCase()
                              .split(" ")
                              .join("")}`}
                            className="outline-none"
                          >
                            <div className="md:flex items-center justify-center gap-2">
                              <div className="h-auto w-auto">
                                <motion.div
                                  initial={{ y: 0 }}
                                  animate={{ y: 6 }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                  }}
                                  whileHover={{
                                    scale: 1.01,
                                  }}
                                  className="w-auto flex items-center justify-center bg-cover bg-center"
                                >
                                  <img
                                    src={tablet.image}
                                    alt={tablet.name}
                                    className="w-full md:w-full md:h-96 p-12 object-contain object-center"
                                    loading="lazy"
                                  />
                                </motion.div>
                              </div>
                              <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                <h3 className="underline-animations text-xl text-black text-center font-extrabold">
                                  {tablet.name}
                                </h3>
                                <p className="text-stone-600">
                                  {(tablet.blog &&
                                    truncateText(tablet.blog, 30)) ||
                                    "No description available"}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      )
                  )}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tablets;
