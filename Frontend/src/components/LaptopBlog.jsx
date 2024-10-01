import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { easeInOut, motion } from "framer-motion";
import Footer from "./Footer";
import CircularLoader from "../CircularLoader";
import { FaAmazon } from "react-icons/fa";
import alibaba from "../images/alibabalogo.png";
import daraz from "../images/darazlogo.png";
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

  const InfoSection = ({ label, value }) => (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 p-2 rounded-lg bg-green-100">
        <h1 className="text-xs whitespace-nowrap sm:text-sm md:text-lg font-extrabold text-green-600">
          {label}:
        </h1>
      </div>
      <div className="text-xs sm:text-sm md:text-lg w-full bg-zinc-200 px-3 py-2 rounded-md text-black">
        {value || "Loading..."}
      </div>
    </div>
  );

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
                <div className="hidden lg:flex mt-8 w-full md:w-1/3 h-auto">
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
                  <h1 className="mt-8 text-2xl md:text-3xl px-4 flex items-center justify-center md:justify-start whitespace-nowrap tracking-tighter text-[#001] font-semibold border-b-[3px] border-black/10">
                    {targetLaptops.name || "..."}
                  </h1>
                  <div className="w-full h-auto p-4 flex flex-col gap-4">
                    <div className="w-full h-auto overflow-hidden flex items-center justify-center bg-white rounded-xl">
                      <img
                        src={targetLaptops.image}
                        alt={targetLaptops.name}
                        className="w-auto min-h-80 sm:h-96 sm:object-cover object-contain"
                      />
                    </div>
                    <div className="text-black text-sm tracking-wide md:text-xl font-bold text-ellipsis">
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
                          <div className="flex flex-col gap-3 w-full">
                            {targetLaptops.dimension && (
                              <InfoSection
                                label="Dimension"
                                value={targetLaptops.dimension}
                              />
                            )}
                            {targetLaptops.build && (
                              <InfoSection
                                label="Build"
                                value={targetLaptops.build}
                              />
                            )}
                            {targetLaptops.weight && (
                              <InfoSection
                                label="Weight"
                                value={targetLaptops.weight}
                              />
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
                          <div className="flex flex-col gap-3 w-full">
                            {targetLaptops.dtype && (
                              <InfoSection
                                label="Type"
                                value={targetLaptops.dtype}
                              />
                            )}
                            {targetLaptops.size && (
                              <InfoSection
                                label="Size"
                                value={targetLaptops.size}
                              />
                            )}
                            {targetLaptops.resolution && (
                              <InfoSection
                                label="Resolution"
                                value={targetLaptops.resolution}
                              />
                            )}
                          </div>
                        </div>
                      )}
                      {(targetLaptops.frontcamera ||
                        targetLaptops.maincamera ||
                        targetLaptops.video) && (
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
                          <div className="flex flex-col gap-3 w-full">
                            {targetLaptops.frontcamera && (
                              <InfoSection
                                label="FrontCamera"
                                value={targetLaptops.frontcamera}
                              />
                            )}
                            {targetLaptops.maincamera && (
                              <InfoSection
                                label="BackCamera"
                                value={targetLaptops.maincamera}
                              />
                            )}
                            {targetLaptops.video && (
                              <InfoSection
                                label="Video"
                                value={targetLaptops.video}
                              />
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
                          <div className="flex flex-col gap-3 w-full">
                            {targetLaptops.os && (
                              <InfoSection
                                label="OS"
                                value={targetLaptops.os}
                              />
                            )}
                            {targetLaptops.processor && (
                              <InfoSection
                                label="Processor"
                                value={targetLaptops.processor}
                              />
                            )}
                            {targetLaptops.graphics && (
                              <InfoSection
                                label="Graphics"
                                value={targetLaptops.graphics}
                              />
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
                          <div className="flex flex-col w-full gap-2 items-start justify-center">
                            <div className="flex items-center gap-2 w-full">
                              <div className="flex items-center gap-1 p-2 rounded-lg bg-green-100">
                                <h1 className="text-xs sm:text-sm md:text-lg font-extrabold text-green-600">
                                  RAM:
                                </h1>
                              </div>
                              <div className="text-xs flex sm:text-sm md:text-lg w-full bg-zinc-200 px-3 py-2 rounded-md text-black">
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
                                <h1 className="text-xs sm:text-sm md:text-lg font-extrabold text-green-600">
                                  Storage:
                                </h1>
                              </div>
                              <div className="text-xs flex sm:text-sm md:text-lg w-full bg-zinc-200 px-3 py-2 rounded-md text-black">
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
                          <div className="flex flex-col gap-3 w-full">
                            {targetLaptops.capacity && (
                              <InfoSection
                                label="Capacity"
                                value={targetLaptops.capacity}
                              />
                            )}
                            {targetLaptops.charging && (
                              <InfoSection
                                label="Charging"
                                value={targetLaptops.charging}
                              />
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
                          <div className="flex flex-col gap-3 w-full">
                            {targetLaptops.wifi && (
                              <InfoSection
                                label="Wi-Fi"
                                value={targetLaptops.wifi}
                              />
                            )}
                            {targetLaptops.bluetooth && (
                              <InfoSection
                                label="Bluetooth"
                                value={targetLaptops.bluetooth}
                              />
                            )}
                          </div>
                        </div>
                      )}
                      {(targetLaptops.typec ||
                        targetLaptops.audiojack ||
                        targetLaptops.resolution) && (
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
                          <div className="flex flex-col gap-3 w-full">
                            {targetLaptops.typec && (
                              <InfoSection
                                label="Type-C"
                                value={targetLaptops.typec}
                              />
                            )}
                            {targetLaptops.audiojack && (
                              <InfoSection
                                label="Audio Jack"
                                value={targetLaptops.audiojack}
                              />
                            )}
                            {targetLaptops.ethernet && (
                              <InfoSection
                                label="Ethernet"
                                value={targetLaptops.ethernet}
                              />
                            )}
                            {targetLaptops.usba && (
                              <InfoSection
                                label="USB-A"
                                value={targetLaptops.usba}
                              />
                            )}
                            {targetLaptops.hdmi && (
                              <InfoSection
                                label="HDMI"
                                value={targetLaptops.hdmi}
                              />
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
                  <div className="flex flex-col items-center justify-center text-lg text-center">
                    <div>
                      <h1>Make a purchase plan from here!</h1>
                      <h2>
                        Want to save big? Here's your shortcut to incredible
                        savings!
                      </h2>
                    </div>
                    <div className="flex items-center justify-center gap-4 border-2 border-black px-4 rounded-md">
                      <div className="flex items-center justify-center flex-col border-r-2 border-black min-h-24 h-auto pr-2">
                        <a href="#" target="_blank">
                          <FaAmazon className="text-4xl h-full" />
                        </a>
                        <h1 className="cursor-pointer">Amazon</h1>
                      </div>
                      <div className="flex items-center justify-center flex-col border-r-2 border-black min-h-24 h-full pr-4">
                        <a href="#" target="_blank">
                          <img
                            src={alibaba}
                            alt=""
                            className="h-16 w-20 scale-125 object-contain"
                          />
                        </a>
                        <h1 className="cursor-pointer">Alibaba</h1>
                      </div>
                      <div className="flex items-center justify-center flex-col">
                        <a href="#" target="_blank">
                          <img src={daraz} alt="" className="h-12 w-20" />
                        </a>
                        <h1 className="cursor-pointer">Daraz</h1>
                      </div>
                    </div>
                  </div>
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

export default LaptopBlog;
