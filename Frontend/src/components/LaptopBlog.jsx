import React, { useEffect, useState } from "react";
import Navbar from "./HomePage/Navbar";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import CircularLoader from "../CircularLoader";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const fetchData = async () => {
  try {
    const response = await axios.get(`${backendURL}`);
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

function LaptopBlog() {
  const [loading, setLoading] = useState(true);
  const [laptops, setLaptops] = useState([]);
  const [targetLaptops, setTargetLaptops] = useState({});
  const [product, setProduct] = useState([]);
  const { itname } = useParams();

  useEffect(() => {
    const loadData = async () => {
      const allLaptops = await fetchData(backendURL);
      setLaptops(allLaptops);
      const allProducts = await fetchData(backendURL);
      setProduct(allProducts);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    const fetchTargetLaptops = async () => {
      try {
        const response = await axios.get(`${backendURL}/${itname}`);
        setTargetLaptops(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching target laptop:", error);
      }
    };

    fetchTargetLaptops();
  }, [itname]);

  useEffect(() => {
    const body = document.querySelector("#root");

    body.scrollIntoView({
      behavior: "smooth",
    });
  }, [itname]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <CircularLoader />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex h-auto w-auto items-center justify-center px-4 md:px-8 lg:px-1"
      >
        <div className="h-full w-auto">
          <div className="w-auto max-w-7xl">
            <div className="flex flex-col md:flex-row items-start justify-between border-b-4 border-black/10">
              <div className="hidden md:flex w-full md:w-1/3 border-r-4 border-black/10 py-4 h-auto">
                <div className="flex flex-col gap-4 items-center h-full">
                  <h1 className="text-2xl">Popular</h1>
                  <div className="hidescroller w-full pt-4 flex flex-col gap-8 items-center overflow-y-auto p-4 h-[800px]">
                    {laptops
                      .filter(
                        (item) =>
                          item.productType === "laptop" &&
                          item.popularity === "popular"
                      )
                      .map((item, index) => (
                        <div
                          key={index}
                          className="w-52 h-auto bg-white flex flex-col items-center justify-start border-4 border-black rounded-xl"
                        >
                          <Link
                            to={`/laptop/${item.name
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
                  {targetLaptops.name || "..."}
                </h1>
                <div className="w-full h-auto p-4 flex flex-col gap-12 md:gap-4">
                  <div className="w-full h-auto bg-white overflow-hidden border-2 border-black rounded-xl flex items-center justify-center">
                    <img
                      src={targetLaptops.image}
                      alt={targetLaptops.name}
                      className="w-full md:max-w-[600px] md:w-auto min-h-80 sm:h-96 object-cover rounded-xl"
                    />
                  </div>
                  <div className="w-full h-auto overflow-hidden flex flex-col gap-4 mt-2 text-2xl text-[#002] items-start justify-end">
                    <div className="w-full flex items-center justify-start p-2 bg-zinc-50 rounded-lg">
                      <div className="text-lg md:text-xl text-center text-red font-bold text-red-700">
                        BODY
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              Dimension:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.dimension || "Not found"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              Build:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.build || "Not found"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              Weight:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.weight || "Not found"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-start p-2 bg-zinc-50 rounded-lg">
                      <div className="text-lg md:text-xl text-center text-red font-bold text-red-700">
                        DISPLAY
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              Type:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.dtype || "Not found"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              Size:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.size || "Not found"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              Resolution:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.resolution || "Not found"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-start p-2 bg-zinc-50 rounded-lg">
                      <div className="text-lg md:text-xl text-center text-red font-bold text-red-700">
                        CAMERA
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] mr-6 md:text-lg w-[96px] font-extrabold whitespace-nowrap">
                              MainCamera:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.maincamera || "Not found"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              Video:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.video || "Not found"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-start p-2 bg-zinc-50 rounded-lg">
                      <div className="text-lg md:text-xl text-center text-red font-bold text-red-700">
                        PLATFORM
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              OS:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.os || "Not found"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              Processor:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.processor || "Not found"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              GPU:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.graphics || "Not found"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-start p-2 bg-zinc-50 rounded-lg">
                      <div className="text-lg md:text-xl text-center text-red font-bold text-red-700">
                        MEMORY
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              RAM:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.memory || "Not found"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              Storage:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.storage || "Not found"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-start p-2 bg-zinc-50 rounded-lg">
                      <div className="text-lg md:text-xl text-center text-red font-bold text-red-700">
                        BATTERY
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              Capacity:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.capacity || "Not found"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              Charging:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.charging || "Not found"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-start p-2 bg-zinc-50 rounded-lg">
                      <div className="text-lg md:text-xl text-center text-red font-bold text-red-700">
                        NETWORKS
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              Wi-Fi:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.wifi || "Not found"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              Bluetooth:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.bluetooth || "Not found"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-start p-2 bg-zinc-50 rounded-lg">
                      <div className="text-lg md:text-xl text-center text-red font-bold text-red-700">
                        PORTS
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              Type C:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.typec || "Not found"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              USB A:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.usba || "Not found"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              Ethernet:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.ethernet || "Not found"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold">
                              HDMI:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.hdmi || "Not found"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 p-2 rounded-lg">
                            <h1 className="text-[16px] whitespace-nowrap md:text-lg w-[96px] font-extrabold">
                              Audio Jack:
                            </h1>
                          </div>
                          <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                            {targetLaptops.audiojack || "Not found"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-black text-lg md:text-xl font-semibold mt-4">
                  {targetLaptops.blog || "..."}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-7xl py-4">
            <div className="flex flex-col gap-4 w-full sm:w-1/2 mx-auto p-6">
              {product.length > 0 &&
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
                      <div className="w-full flex flex-col gap-4 text-center">
                        <div>
                          <div className="text-lg sm:text-xl md:text-2xl">
                            {item.name}
                          </div>
                        </div>
                        <div className="text-md sm:text-lg md:text-xl font-semibold">
                          <motion.div
                            whileHover={{
                              scale: 1.01,
                              color: "#900",
                            }}
                            className="tracking-wide break-words"
                          >
                            Categorie:{item.popularity || "Unknown"}
                          </motion.div>
                          <motion.div
                            whileHover={{
                              scale: 1.01,
                              color: "#900",
                            }}
                            className="break-words"
                          >
                            Price:{item.price || "Not mentioned"}
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default LaptopBlog;
