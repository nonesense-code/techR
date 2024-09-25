import React, { useEffect, useState } from "react";
import Navbar from "./HomePage/Navbar";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { easeInOut, motion } from "framer-motion";
import Footer from "./Footer";
import CircularLoader from "../CircularLoader";
const backendURL = import.meta.env.VITE_BACKEND_URL;
const imageURL = import.meta.env.VITE_IMAGE_URL;

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
  const [laptops, setLaptops] = useState([]);
  const [targetLaptops, setTargetLaptops] = useState({});
  const [product, setProduct] = useState([]);
  const { itname } = useParams();
  const [loading, setLoading] = useState(true);
  const [showFooter, setshowFooter] = useState(false);

  const row1 =
    targetLaptops.ram1 || targetLaptops.storage1 || targetLaptops.price1;
  const row2 =
    targetLaptops.ram2 || targetLaptops.storage2 || targetLaptops.price2;
  const row3 =
    targetLaptops.ram3 || targetLaptops.storage3 || targetLaptops.price3;

  const rows = [
    row1 && {
      ram: targetLaptops.ram1,
      storage: targetLaptops.storage1,
      price: targetLaptops.price1,
    },
    row2 && {
      ram: targetLaptops.ram2,
      storage: targetLaptops.storage2,
      price: targetLaptops.price2,
    },
    row3 && {
      ram: targetLaptops.ram3,
      storage: targetLaptops.storage3,
      price: targetLaptops.price3,
    },
  ]
    .filter(Boolean)
    .filter((row) => row.ram && row.storage && row.price);

  useEffect(() => {
    const loadData = async () => {
      const allLaptops = await fetchData(backendURL);
      setLaptops(allLaptops);
      setLoading(false);
      setshowFooter(true);
      const allProducts = await fetchData(backendURL);
      setProduct(allProducts);
    };

    loadData();
  }, []);

  useEffect(() => {
    const fetchTargetLaptops = async () => {
      try {
        const response = await axios.get(`${backendURL}/${itname}`);
        setTargetLaptops(response.data);
        setLoading(false);
        setshowFooter(true);
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

  return (
    <>
      <Navbar />
      {loading ? (
        <div>
          <CircularLoader />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex h-auto w-auto items-center justify-center px-4 md:px-8 lg:px-1"
        >
          <div className="h-full w-auto">
            <div className="w-auto max-w-7xl">
              <div className="flex flex-col md:flex-row items-start justify-between border-b-4 border-black/10">
                <div className="hidden lg:flex w-full md:w-1/3 h-auto">
                  <div className="flex flex-col gap-4 items-center h-full mt-4">
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
                                src={`${imageURL}${item.image}`}
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
                <div className="w-full lg:border-l-4 lg:border-black/10 py-4">
                  <h1 className="text-2xl md:text-4xl px-4 flex items-center justify-center md:justify-start min-h-[68px] whitespace-nowrap tracking-tighter text-[#001] font-semibold border-b-[3px] border-black/10 py-2">
                    {targetLaptops.name || "..."}
                  </h1>
                  <div className="w-full h-auto p-4 flex flex-col gap-12 md:gap-4">
                    <div className="w-full h-auto overflow-hidden flex items-center justify-center">
                      <img
                        src={`${imageURL}${targetLaptops.image}`}
                        alt={targetLaptops.name}
                        className="w-auto bg-white min-h-80 sm:h-96 object-cover rounded-xl"
                      />
                    </div>
                    <div className="p-4 text-black text-lg md:text-xl font-semibold mt-4">
                      {targetLaptops.blog || "..."}
                    </div>
                    <div className="w-full h-auto overflow-hidden flex flex-col gap-4 mt-2 text-2xl text-[#002] items-start justify-end">
                      {(targetLaptops.dimension ||
                        targetLaptops.build ||
                        targetLaptops.weight) && (
                        <div className="w-full flex items-center justify-start p-2 bg-zinc-50 rounded-lg">
                          <div className="hidden md:flex flex-col mr-6 leading-tighter">
                            {["B", "O", "D", "Y"].map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ x: 0, scale: 1 }}
                                animate={{
                                  x: 4,
                                  scale: 1.2,
                                  color: "#001",
                                }}
                                transition={{
                                  delay: index * 0.9,
                                  duration: 4,
                                  repeat: Infinity,
                                  repeatType: "reverse",
                                  ease: easeInOut,
                                }}
                                className="text-lg md:text-xl text-center text-red font-bold"
                              >
                                {item}
                              </motion.div>
                            ))}
                          </div>
                          <div className="flex flex-col w-full gap-2">
                            {targetLaptops.dimension && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Dimension:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.dimension || "..."}
                                </div>
                              </div>
                            )}
                            {targetLaptops.build && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Build:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.build || "..."}
                                </div>
                              </div>
                            )}
                            {targetLaptops.weight && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Weight:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.weight || "..."}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {(targetLaptops.dtype ||
                        targetLaptops.size ||
                        targetLaptops.resolution) && (
                        <div className="w-full flex items-center justify-start p-2 bg-zinc-50 rounded-lg">
                          <div className="hidden md:flex flex-col mr-6 leading-tighter">
                            {["D", "I", "S", "P", "L", "A", "Y"].map(
                              (item, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ x: 0, scale: 1 }}
                                  animate={{
                                    x: 4,
                                    scale: 1.2,
                                    color: "#001",
                                  }}
                                  transition={{
                                    delay: index * 0.9,
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: easeInOut,
                                  }}
                                  className="text-lg md:text-xl text-center text-red font-bold"
                                >
                                  {item}
                                </motion.div>
                              )
                            )}
                          </div>
                          <div className="flex flex-col w-full gap-2">
                            {targetLaptops.dtype && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Type:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.dtype || "..."}
                                </div>
                              </div>
                            )}
                            {targetLaptops.size && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Size:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.size || "..."}
                                </div>
                              </div>
                            )}
                            {targetLaptops.resolution && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Resolution:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.resolution || "..."}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {(targetLaptops.frontcamera || targetLaptops.video) && (
                        <div className="w-full flex items-center justify-start p-2 bg-zinc-50 rounded-lg">
                          <div className="hidden md:flex flex-col mr-6 leading-tighter">
                            {["C", "A", "M", "E", "R", "A"].map(
                              (item, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ x: 0, scale: 1 }}
                                  animate={{
                                    x: 4,
                                    scale: 1.2,
                                    color: "#001",
                                  }}
                                  transition={{
                                    delay: index * 0.9,
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: easeInOut,
                                  }}
                                  className="text-lg md:text-xl text-center text-red font-bold"
                                >
                                  {item}
                                </motion.div>
                              )
                            )}
                          </div>
                          <div className="flex flex-col w-full gap-2">
                            {targetLaptops.frontcamera && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] mr-6 md:text-lg w-[96px] font-extrabold text-green-600 whitespace-nowrap">
                                    FrontCamera:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.frontcamera || "..."}
                                </div>
                              </div>
                            )}
                            {targetLaptops.video && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Video:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.video || "..."}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {(targetLaptops.os ||
                        targetLaptops.processor ||
                        targetLaptops.graphics) && (
                        <div className="w-full flex items-center justify-start p-2 bg-zinc-50 rounded-lg">
                          <div className="hidden md:flex flex-col mr-6 leading-tighter">
                            {["P", "L", "A", "T", "F", "O", "R", "M"].map(
                              (item, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ x: 0, scale: 1 }}
                                  animate={{
                                    x: 4,
                                    scale: 1.2,
                                    color: "#001",
                                  }}
                                  transition={{
                                    delay: index * 0.9,
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: easeInOut,
                                  }}
                                  className="text-lg md:text-xl text-center text-red font-bold"
                                >
                                  {item}
                                </motion.div>
                              )
                            )}
                          </div>
                          <div className="flex flex-col w-full gap-2">
                            {targetLaptops.os && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    OS:
                                  </h1>
                                </div>

                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.os || "..."}
                                </div>
                              </div>
                            )}
                            {targetLaptops.processor && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Processor:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.processor || "..."}
                                </div>
                              </div>
                            )}
                            {targetLaptops.graphics && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    GPU:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.graphics || "..."}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {rows.length > 0 && (
                        <div className="w-full flex items-center justify-start p-2 bg-zinc-50 rounded-lg">
                          <div className="hidden md:flex flex-col mr-6">
                            {["M", "E", "M", "O", "R", "Y"].map(
                              (item, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ x: 0, scale: 1 }}
                                  animate={{
                                    x: 4,
                                    scale: 1.2,
                                    color: "#001",
                                  }}
                                  transition={{
                                    delay: index * 0.9,
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: easeInOut,
                                  }}
                                  className="text-lg md:text-xl text-center text-red font-bold"
                                >
                                  {item}
                                </motion.div>
                              )
                            )}
                          </div>
                          <div className="flex flex-col w-full gap-2">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 p-2 rounded-lg">
                                <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                  RAM:
                                </h1>
                              </div>
                              <div className="text-[18px] flex gap-2 w-full bg-zinc-200 px-2 rounded-md text-black">
                                {rows.map(
                                  (row, index) =>
                                    row && (
                                      <div key={index}>
                                        {row.ram}
                                        {index < rows.length - 1 && ","}
                                      </div>
                                    )
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 p-2 rounded-lg">
                                <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                  Storage:
                                </h1>
                              </div>
                              <div className="text-[18px] flex gap-2 w-full bg-zinc-200 px-2 rounded-md text-black">
                                {rows.map(
                                  (row, index) =>
                                    row && (
                                      <div key={index}>
                                        {row.storage}
                                        {index < rows.length - 1 && ","}
                                      </div>
                                    )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {(targetLaptops.capacity || targetLaptops.charging) && (
                        <div className="w-full flex items-center justify-start p-2 bg-zinc-50 rounded-lg">
                          <div className="hidden md:flex flex-col mr-6">
                            {["B", "A", "T", "T", "E", "R", "Y"].map(
                              (item, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ x: 0, scale: 1 }}
                                  animate={{
                                    x: 4,
                                    scale: 1.2,
                                    color: "#001",
                                  }}
                                  transition={{
                                    delay: index * 0.9,
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: easeInOut,
                                  }}
                                  className="text-lg md:text-xl text-center text-red font-bold"
                                >
                                  {item}
                                </motion.div>
                              )
                            )}
                          </div>
                          <div className="flex flex-col w-full gap-2">
                            {targetLaptops.capacity && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Capacity:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.capacity || "..."}
                                </div>
                              </div>
                            )}
                            {targetLaptops.charging && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Charging:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.charging || "..."}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {(targetLaptops.wifi || targetLaptops.bluetooth) && (
                        <div className="w-full flex items-center justify-start p-2 bg-zinc-50 rounded-lg">
                          <div className="hidden md:flex flex-col mr-6">
                            {["N", "E", "T", "W", "O", "R", "K", "S"].map(
                              (item, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ x: 0, scale: 1 }}
                                  animate={{
                                    x: 4,
                                    scale: 1.2,
                                    color: "#001",
                                  }}
                                  transition={{
                                    delay: index * 0.9,
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: easeInOut,
                                  }}
                                  className="text-lg md:text-xl text-center text-red font-bold"
                                >
                                  {item}
                                </motion.div>
                              )
                            )}
                          </div>
                          <div className="flex flex-col w-full gap-2">
                            {targetLaptops.wifi && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Wi-Fi:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.wifi || "..."}
                                </div>
                              </div>
                            )}
                            {targetLaptops.bluetooth && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Bluetooth:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.bluetooth || "..."}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {(targetLaptops.typec ||
                        targetLaptops.audiojack ||
                        targetLaptops.ethernet ||
                        targetLaptops.usba ||
                        targetLaptops.hdmi) && (
                        <div className="w-full flex items-center justify-start p-2 bg-zinc-50 rounded-lg">
                          <div className="hidden md:flex flex-col mr-6">
                            {["P", "O", "R", "T", "S"].map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ x: 0, scale: 1 }}
                                animate={{
                                  x: 4,
                                  scale: 1.2,
                                  color: "#001",
                                }}
                                transition={{
                                  delay: index * 0.9,
                                  duration: 4,
                                  repeat: Infinity,
                                  repeatType: "reverse",
                                  ease: easeInOut,
                                }}
                                className="text-lg md:text-xl text-center font-bold"
                              >
                                {item}
                              </motion.div>
                            ))}
                          </div>
                          <div className="flex flex-col w-full gap-2">
                            {targetLaptops.typec && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Type C:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.typec || "..."}
                                </div>
                              </div>
                            )}
                            {targetLaptops.audiojack && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600 whitespace-nowrap">
                                    Audio Jack:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.audiojack || "..."}
                                </div>
                              </div>
                            )}
                            {targetLaptops.ethernet && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600 whitespace-nowrap">
                                    Ethernet:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.ethernet || "..."}
                                </div>
                              </div>
                            )}
                            {targetLaptops.usba && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600 whitespace-nowrap">
                                    USB Type A:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.usba || "..."}
                                </div>
                              </div>
                            )}
                            {targetLaptops.hdmi && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600 whitespace-nowrap">
                                    HDMI:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetLaptops.hdmi || "..."}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {rows.length > 0 && (
                    <div className="h-auto w-full p-8 text-[12px] md:text-[18px] lg:text-xl">
                      <div className="border-4 border-black overflow-hidden rounded-lg w-full flex flex-col">
                        <div className="w-full flex flex-wrap bg-gray-200">
                          <div className="flex-1 border-r-4 border-black overflow-hidden p-2 text-center font-bold">
                            S.N
                          </div>
                          <div className="flex-1 border-r-4 border-black z-20 p-2 text-center font-bold">
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
            <div className="w-full py-4">
              <div className="flex flex-col gap-4 w-auto mx-auto p-6">
                {product.length > 0 &&
                  product.map((item, index) => (
                    <div
                      className="flex flex-col lg:flex-row p-4 w-full items-center justify-between bg-white h-auto gap-2 rounded-lg"
                      key={index}
                    >
                      <div className="w-full">
                        <Link
                          to={`/${item.productType}/${item.name
                            .toLowerCase()
                            .split(" ")
                            .join("")}`}
                        >
                          <div className="h-80 w-auto flex items-center justify-center">
                            <img
                        src={`${imageURL}${item.image}`}
                        alt={item.name}
                              className="object-cover rounded-xl w-auto h-80"
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="w-full sm:w-1/2 flex flex-col p-4">
                        <div className="w-full flex flex-col gap-4 text-center">
                          <div className="">
                            <div className="text-lg sm:text-xl md:text-2xl whitespace-nowrap justify-center items-center font-extrabold">
                              {item.name}
                            </div>
                          </div>
                          <div className="text-md sm:text-lg md:text-xl font-semibold">
                            <motion.div
                              whileHover={{
                                scale: 1.01,
                                color: "#232F3E",
                              }}
                              className="tracking-wide break-words capitalize"
                            >
                              Categorie:{item.popularity || "Unknown"}
                            </motion.div>
                            <motion.div
                              whileHover={{
                                scale: 1.01,
                                color: "#232F3E",
                              }}
                              className="break-words"
                            >
                              Price:{item.price1 || "$..."}
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
      )}
      {showFooter && <Footer />}
    </>
  );
}

export default LaptopBlog;
