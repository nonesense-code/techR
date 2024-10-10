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

function Laptops() {
  const gamingURL = import.meta.env.VITE_GAMER_URL;
  const professionalURL = import.meta.env.VITE_PROFESSIONAL_URL;
  const studentsURL = import.meta.env.VITE_STUDENTS_URL;
  const normalusageURL = import.meta.env.VITE_NORMALUSAGE_URL;

  const {
    isLoading: loadinggaminglaptop,
    data: gaminglaptop = [],
    gaminglaptopisError,
    gaminglaptopError,
  } = useQuery(["gaminglaptop", gamingURL], () => filterProducts(gamingURL), {
    staleTime: 1000 * 60 * 5,
  });

  const {
    isLoading: loadingprofessionallaptop,
    data: professionallaptop = [],
    professionallaptopisError,
    professionallaptopError,
  } = useQuery(
    ["professionallaptop", professionalURL],
    () => filterProducts(professionalURL),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const {
    isLoading: loadingstudentslaptop,
    data: studentslaptop = [],
    studentslaptopisError,
    studentslaptopError,
  } = useQuery(
    ["studentslaptop", studentsURL],
    () => filterProducts(studentsURL),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const {
    isLoading: loadingnormalusagelaptop,
    data: normalusagelaptop = [],
    normalusagelaptopisError,
    normalusagelaptopError,
  } = useQuery(
    ["normalusagelaptop", normalusageURL],
    () => filterProducts(normalusageURL),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const isLoading =
    loadinggaminglaptop ||
    loadingprofessionallaptop ||
    loadingstudentslaptop ||
    loadingnormalusagelaptop;

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
              Find Your Perfect Laptop Companion!
            </h1>

            <section className="mb-10 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-center mb-4">
                Gaming Laptops
              </h2>
              <div className="flex flex-col items-center justify-center w-full gap-6">
                {gaminglaptop.length > 0 &&
                  gaminglaptop.map(
                    (laptop, index) =>
                      laptop.productType === "laptop" && (
                        <motion.div
                          key={index}
                          className="bg-transparent shadow-md shadow-black rounded-lg overflow-hidden p-2 md:flex flex-row w-full"
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link
                            to={`${laptop.name
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
                                    src={laptop.image}
                                    alt={laptop.name}
                                    className="w-full md:w-full md:h-96 p-12 object-contain object-center"
                                    loading="lazy"
                                  />
                                </motion.div>
                              </div>
                              <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                <h3 className="underline-animations text-xl text-black text-center font-extrabold">
                                  {laptop.name}
                                </h3>
                                <p className="text-stone-600">
                                  {(laptop.blog &&
                                    truncateText(laptop.blog, 30)) ||
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
                Professional Laptops
              </h2>
              <div className="flex flex-col items-center justify-center w-full gap-6">
                {professionallaptop.length > 0 &&
                  professionallaptop.map(
                    (laptop, index) =>
                      laptop.productType === "laptop" && (
                        <motion.div
                          key={index}
                          className="bg-white shadow-lg rounded-lg overflow-hidden p-2 md:flex flex-row w-full"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Link
                            to={`${laptop.name
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
                                    src={laptop.image}
                                    alt={laptop.name}
                                    className="w-full md:w-full md:h-96 p-12 object-contain object-center"
                                    loading="lazy"
                                  />
                                </motion.div>
                              </div>
                              <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                <h3 className="underline-animations text-xl text-black text-center font-extrabold">
                                  {laptop.name}
                                </h3>
                                <p className="text-stone-600">
                                  {(laptop.blog &&
                                    truncateText(laptop.blog, 30)) ||
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
                Student Laptops
              </h2>
              <div className="flex flex-col items-center justify-center w-full gap-6">
                {studentslaptop.length > 0 &&
                  studentslaptop.map(
                    (laptop, index) =>
                      laptop.productType === "laptop" && (
                        <motion.div
                          key={index}
                          className="bg-white shadow-lg rounded-lg overflow-hidden p-2 md:flex flex-row w-full"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Link
                            to={`${laptop.name
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
                                    src={laptop.image}
                                    alt={laptop.name}
                                    className="w-full md:w-full md:h-96 p-12 object-contain object-center"
                                    loading="lazy"
                                  />
                                </motion.div>
                              </div>
                              <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                <h3 className="underline-animations text-xl text-black text-center font-extrabold">
                                  {laptop.name}
                                </h3>
                                <p className="text-stone-600">
                                  {(laptop.blog &&
                                    truncateText(laptop.blog, 30)) ||
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
                Normal Usage Laptops
              </h2>
              <div className="flex flex-col items-center justify-center w-full gap-6">
                {normalusagelaptop.length > 0 &&
                  normalusagelaptop.map(
                    (laptop, index) =>
                      laptop.productType === "laptop" && (
                        <motion.div
                          key={index}
                          className="bg-white shadow-lg rounded-lg overflow-hidden p-2 md:flex flex-row w-full"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Link
                            to={`${laptop.name
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
                                    src={laptop.image}
                                    alt={laptop.name}
                                    className="w-full md:w-full md:h-96 p-12 object-contain object-center"
                                    loading="lazy"
                                  />
                                </motion.div>
                              </div>
                              <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                <h3 className="underline-animations text-xl text-black text-center font-extrabold">
                                  {laptop.name}
                                </h3>
                                <p className="text-stone-600">
                                  {(laptop.blog &&
                                    truncateText(laptop.blog, 30)) ||
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

export default Laptops;
