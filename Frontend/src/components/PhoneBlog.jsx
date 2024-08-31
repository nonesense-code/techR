import React, { useEffect, useState } from "react";
import Navbar from "./HomePage/Navbar";
import { GiProcessor, GiBattery100 } from "react-icons/gi";
import { FaMicrochip } from "react-icons/fa";
import { MdCamera } from "react-icons/md";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import CircularLoader from "../CircularLoader";
const backendURL = "https://tech-r.vercel.app/product/api";

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("Data is not in the expected format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

function PhoneBlog() {
  const [phones, setPhones] = useState([]);
  const [targetPhones, setTargetPhones] = useState({});
  const [product, setProduct] = useState([]);
  const { itname } = useParams();

  useEffect(() => {
    const loadData = async () => {
      const allPhones = await fetchData(backendURL);
      setPhones(allPhones);
      const allProducts = await fetchData(backendURL);
      setProduct(allProducts);
    };

    loadData();
  }, []);

  useEffect(() => {
    const fetchTargetPhones = async () => {
      try {
        const response = await axios.get(`${backendURL}/${itname}`);
        setTargetPhones(response.data);
      } catch (error) {
        console.error("Error fetching target phone:", error);
      }
    };

    if (itname) {
      fetchTargetPhones();
    }
  }, [itname]);

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex h-auto items-center justify-center w-full px-4 md:px-8 lg:px-1"
      >
        <div className="h-full w-auto">
          <div className="w-auto max-w-7xl">
            <div className="flex flex-col md:flex-row items-start justify-between border-b-4 border-black/10">
              <div className="hidden md:flex w-full md:w-1/3 border-r-4 border-black/10 py-4 h-auto">
                <div className="flex flex-col gap-4 items-center h-full">
                  <h1 className="text-2xl">Popular</h1>
                  <div className="hidescroller w-full pt-4 flex flex-col gap-8 items-center overflow-y-auto p-4 h-[800px]">
                    {phones
                      .filter(
                        (item) =>
                          item.productType === "phone" &&
                          item.popularity === "popular"
                      )
                      .map((item, index) => (
                        <div
                          key={index}
                          className="w-52 h-auto bg-white flex flex-col items-center justify-start border-4 border-black rounded-xl"
                        >
                          <Link
                            to={`/phone/${item.name
                              .toLowerCase()
                              .split(" ")
                              .join("")}`}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="rounded-t-lg w-full h-full object-cover object-top"
                            />
                          </Link>
                          <h1 className="w-full text-center bg-zinc-600 rounded-b-lg">
                            {item.name}
                          </h1>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="w-full py-4">
                <h1 className="text-xl px-4 md:text-4xl flex items-center justify-center md:justify-start min-h-[68px] whitespace-nowrap tracking-tighter text-[#001] font-semibold border-b-[3px] border-black/10 py-2">
                  {targetPhones.name || "..."}
                </h1>
                <div className="flex flex-col md:flex-row items-center justify-around gap-4 p-4">
                  <div className="w-full md:w-1/2 bg-white overflow-hidden h-full border-2 border-black rounded-xl flex items-center justify-center">
                    <img
                      src={targetPhones.image}
                      alt={targetPhones.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col gap-6 p-2 text-2xl text-[#002] border-2 border-black rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-zinc-400 p-2 rounded-lg">
                        <GiProcessor />
                        <span className="hidden md:flex text-lg">(RAM)</span>
                      </div>
                      <span className="text-[18px]">{targetPhones.memory}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-zinc-400 p-2 rounded-lg">
                        <FaMicrochip />
                        <span className="hidden md:flex text-lg">(CPU)</span>
                      </div>
                      <span className="text-[18px]">
                        {targetPhones.processor}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-zinc-400 p-2 rounded-lg">
                        <MdCamera />
                        <span className="hidden md:flex text-lg">(Camera)</span>
                      </div>
                      <span className="text-[18px]">{targetPhones.camera}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-zinc-400 p-2 rounded-lg">
                        <GiBattery100 />
                        <span className="hidden md:flex text-lg">
                          (Battery)
                        </span>
                      </div>
                      <span className="text-[18px]">
                        {targetPhones.battery}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-black text-sm md:text-xl font-semibold mt-4">
                  {targetPhones.blog || "..."}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-7xl py-4">
            <div className="flex flex-col gap-4 w-full sm:w-1/2 mx-auto p-6">
              {product.length > 0 ? (
                product.map((item, index) => (
                  <div
                    className="flex flex-col sm:flex-row p-4 items-center justify-between bg-white h-auto gap-2 rounded-lg"
                    key={index}
                  >
                    <div className="w-full sm:w-1/2">
                      <Link
                        to={`/${item.productType}/${item.name
                          .toLowerCase()
                          .split(" ")
                          .join("")}`}
                      >
                        <div className="h-full w-full flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="object-cover rounded-xl w-full h-full"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="w-full sm:w-1/2 flex flex-col p-4">
                      <div className="text-2xl capitalize">
                        {item.productType}
                      </div>
                      <div className="text-lg">{item.name}</div>
                      <div className="text-sm mt-4 break-words">
                        {item.description || "No description available"}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-lg text-gray-600">
                  <CircularLoader />
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default PhoneBlog;
