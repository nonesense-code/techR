import React, { useEffect, useState } from "react";
import Navbar from "./HomePage/Navbar";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion, easeInOut } from "framer-motion";
import Footer from "./Footer";
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

function PhoneBlog() {
  const [phones, setPhones] = useState([]);
  const [targetPhones, setTargetPhones] = useState({});
  const [product, setProduct] = useState([]);
  const { itname } = useParams();
  const [loading, setLoading] = useState(true);
  const [showFooter, setshowFooter] = useState(false);

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

  useEffect(() => {
    const loadData = async () => {
      const allPhones = await fetchData(backendURL);
      setPhones(allPhones);
      setLoading(false);
      setshowFooter(true);
      const allProducts = await fetchData(backendURL);
      setProduct(allProducts);
    };

    loadData();
  }, []);

  // const random = Math.ceil(Math.random());
  // console.log(random);

  useEffect(() => {
    const fetchTargetPhones = async () => {
      try {
        const response = await axios.get(`${backendURL}/${itname}`);
        setTargetPhones(response.data);
        setLoading(false);
        setshowFooter(true);
      } catch (error) {
        console.error("Error fetching target phone:", error);
      }
    };
    fetchTargetPhones();
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
          className="flex h-auto items-center justify-center w-full px-4 md:px-8 lg:px-1"
        >
          <div className="h-full w-auto">
            <div className="w-auto max-w-7xl">
              <div className="flex flex-col md:flex-row items-start justify-between border-b-4 border-black/10">
                <div className="hidden lg:flex w-full md:w-1/3 h-auto">
                  <div className="flex flex-col gap-4 items-center h-full mt-4">
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
                <div className="w-full lg:border-l-4 lg:border-black/10 py-4">
                  <h1 className="text-4xl px-4 flex items-center justify-center md:justify-start min-h-[68px] whitespace-nowrap tracking-tighter text-[#001] font-semibold border-b-[3px] border-black/10 py-2">
                    {targetPhones.name || "..."}
                  </h1>
                  <div className="w-full h-auto p-4 flex flex-col gap-12 md:gap-4">
                    <div className="w-full h-auto overflow-hidden flex items-center justify-center">
                      <img
                        src={
                          targetPhones.image ||
                          "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
                        }
                        alt={targetPhones.name}
                        className="w-full md:max-w-[400px] bg-white md:w-auto min-h-80 sm:h-96 object-cover rounded-xl"
                      />
                    </div>
                    <div className="text-black text-lg md:text-xl font-semibold text-ellipsis">
                      {targetPhones.blog || "..."}
                    </div>
                    <div className="w-full h-auto overflow-hidden flex flex-col gap-4 mt-2 text-2xl text-[#002] items-start justify-end">
                      {(targetPhones.dimension ||
                        targetPhones.build ||
                        targetPhones.weight) && (
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
                            {targetPhones.dimension && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Dimension:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetPhones.dimension || "..."}
                                </div>
                              </div>
                            )}
                            {targetPhones.build && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Build:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetPhones.build || "..."}
                                </div>
                              </div>
                            )}
                            {targetPhones.weight && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Weight:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetPhones.weight || "..."}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {(targetPhones.dtype ||
                        targetPhones.size ||
                        targetPhones.resolution) && (
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
                            {targetPhones.dtype && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Type:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetPhones.dtype || "..."}
                                </div>
                              </div>
                            )}
                            {targetPhones.size && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Size:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetPhones.size || "..."}
                                </div>
                              </div>
                            )}
                            {targetPhones.resolution && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Resolution:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetPhones.resolution || "..."}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {(targetPhones.frontcamera || targetPhones.video) && (
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
                            {targetPhones.frontcamera && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] mr-6 md:text-lg w-[96px] font-extrabold text-green-600 whitespace-nowrap">
                                    FrontCamera:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetPhones.frontcamera || "..."}
                                </div>
                              </div>
                            )}
                            {targetPhones.video && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Video:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetPhones.video || "..."}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {(targetPhones.os ||
                        targetPhones.processor ||
                        targetPhones.graphics) && (
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
                            {targetPhones.os && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    OS:
                                  </h1>
                                </div>

                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetPhones.os || "..."}
                                </div>
                              </div>
                            )}
                            {targetPhones.processor && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Processor:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetPhones.processor || "..."}
                                </div>
                              </div>
                            )}
                            {targetPhones.graphics && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    GPU:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetPhones.graphics || "..."}
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
                      {(targetPhones.capacity || targetPhones.charging) && (
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
                            {targetPhones.capacity && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Capacity:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetPhones.capacity || "..."}
                                </div>
                              </div>
                            )}
                            {targetPhones.charging && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Charging:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetPhones.charging || "..."}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {(targetPhones.wifi || targetPhones.bluetooth) && (
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
                            {targetPhones.wifi && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Wi-Fi:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetPhones.wifi || "..."}
                                </div>
                              </div>
                            )}
                            {targetPhones.bluetooth && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Bluetooth:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetPhones.bluetooth || "..."}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {(targetPhones.typec ||
                        targetPhones.audiojack ||
                        targetPhones.resolution) && (
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
                            {targetPhones.typec && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600">
                                    Type C:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetPhones.typec || "..."}
                                </div>
                              </div>
                            )}
                            {targetPhones.audiojack && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                  <h1 className="text-[16px] md:text-lg w-[96px] font-extrabold text-green-600 whitespace-nowrap">
                                    Audio Jack:
                                  </h1>
                                </div>
                                <div className="text-[18px] w-full bg-zinc-200 px-2 rounded-md text-black">
                                  {targetPhones.audiojack || "..."}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {rows.length > 0 && (
                    <div className="h-auto w-full p-8">
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
                              src={item.image}
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

export default PhoneBlog;
