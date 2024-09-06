import React, { useState, useEffect, useRef } from "react";
import { CiMobile1 } from "react-icons/ci";
import { AiOutlineLaptop } from "react-icons/ai";
import { FaTabletScreenButton } from "react-icons/fa6";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { easeInOut, motion } from "framer-motion";
import { FaCrosshairs } from "react-icons/fa";
import CircularLoader from "../../CircularLoader";
import Typed from "typed.js";

function Landing() {
  const [product, setProduct] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(null);
  const [showFooter, setShowFooter] = useState(false);
  const [loading, setLoading] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [isMounted, setIsMounted] = useState(false);
  const typedRef = useRef(null);
  const elRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);

    if (isMounted && elRef.current) {
      const options = {
        strings: [
          "Samsung Galaxy S24 Ultra",
          "Iphone 15 pro max",
          "Google Pixels 8 Pro",
          "OnePlus 12",
          "Xioami 14 Ultra",
        ],
        typeSpeed: 100,
        backSpeed: 0,
        loop: true,
      };

      typedRef.current = new Typed(elRef.current, options);
    }
    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }
    };
  }, [isMounted]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendURL}`);
        if (Array.isArray(response.data)) {
          setProduct(response.data);
          setLoading(true);
        } else {
          console.error("Data is not in the expected format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [backendURL]);

  const TypedComponent = () => {
    const typedRef = useRef(null);
    const elRef = useRef(null);

    useEffect(() => {
      if (elRef.current) {
        const options = {
          strings: [
            "Welcome to TechSo!",
            "We provide handpumps, pulleys, and more...",
            "Explore our range of innovative solutions!",
          ],
          typeSpeed: 50,
          backSpeed: 30,
          loop: true,
        };

        typedRef.current = new Typed(elRef.current, options);
      }

      return () => {
        if (typedRef.current) {
          typedRef.current.destroy();
        }
      };
    }, []);
  };
  const toggleAnswer = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };

  const queries = [
    {
      qns: "Best product of 2024",
      ans: [
        "Iphone 15 Pro Max",
        "Samsung Galaxy S24 Ultra",
        "Xiaomi 13 Ultra",
        "Google Pixel 9 Pro",
        "Sony Xperia 1 VI",
        "One Plus 12",
        "Oppo Find X6 Pro",
        "Asus ROG Phone 7",
        "Huawei Mate 60 Pro",
        "Motorola Edge 40 Pro",
      ],
    },
    {
      qns: "Best laptops of 2024",
      ans: [
        "Apple MacBook Pro",
        "Dell XPS 15",
        "ASUS ROG Zephyrus G14",
        "HP Spectre X360",
        "Acer Swift 3",
        "ROG Strix G18",
        "Lenovo LOQ 15",
        "Acer Nitro V",
        "HP Victus 15",
      ],
    },
    {
      qns: "Best tablets of 2024",
      ans: [
        "Apple iPad Pro",
        "Apple iPad Air",
        "Samsung Galaxy Tab S9+",
        "Microsoft Surface Pro 9",
        "Lenovo Tab P12 Pro",
        "Amazon Fire HD 11",
        "Apple iPad Mini",
        "Huawei MatePad Pro",
        "Samsung Galaxy Tab A9",
      ],
    },
    {
      qns: "Most sold of 2024",
      ans: [
        "Smartphones",
        "Laptops",
        "Smart Home Appliances",
        "Wearables",
        "Gaming Consoles",
        "Google Nest HUB",
        "Amazon Echo",
        "PlayStation",
        "Smart Speakers",
        "Drones",
      ],
    },
    {
      qns: "Latest Tech Innovations",
      ans: [
        "AI Models",
        "Quantum Computing",
        "Foldables and Flipables",
        "Bandwidth Upgrade",
        "Augmented Reality (AR)",
        "Advanced Robotics",
        "Virtual Reality (VR)",
        "Autonomous Vehicles",
        "Metaverse Development",
        "Robots",
      ],
    },
    {
      qns: "Future Tech Predictions",
      ans: [
        "Powerful Chipsets",
        "Offline AI",
        "Enhanced Performance",
        "High AI Range",
      ],
    },
  ];

  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center w-full">
          <div className="w-full md:w-[80%] px-4 md:px-6 lg:px-8">
            <div className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-[#232F3E] mb-6 mt-8">
              <h1>Research the best from techR!</h1>
              <h2 className="text-xl md:text-2xl font-semibold">
                Leading research center
              </h2>
            </div>
            <div className="flex flex-col w-auto md:flex-row gap-4 justify-center">
              <div className="hidden lg:flex flex-col w-auto px-4 py-6 rounded-lg">
                {queries.map((item, index) => (
                  <div
                    key={index}
                    className="w-full p-2 mb-2 cursor-pointer text-[#003] text-lg md:text-xl font-semibold tracking-tighter"
                    onClick={() => toggleAnswer(index)}
                  >
                    <div className="rounded-lg w-auto border-2 border-stone-500 bg-zinc-400/60 px-4 py-2 text-center">
                      {item.qns}
                    </div>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{
                        height: visibleIndex === index ? "auto" : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className={`${
                        visibleIndex === index ? "block" : "hidden"
                      } bg-[#232F3E]/10 rounded-b-xl text-black`}
                    >
                      <div className="flex flex-col items-center justify-center rounded-b-xl ml-4">
                        {item.ans.map((inneritem, innerindex) => (
                          <div
                            key={innerindex}
                            className="my-1 text-[18px] font-semibold"
                          >
                            {inneritem}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col w-auto p-2 rounded-lg">
                <div className="text-center text-2xl md:text-3xl lg:text-4xl italic font-bold py-4 text-[#232F3E]">
                  Best sales of 2024!
                </div>
                <div className="flex flex-col items-center justify-center h-auto w-auto gap-20">
                  <div className="w-auto flex-items-center justify-center h-auto">
                    <div className="h-auto w-auto flex items-center justify-center flex-col">
                      <div className="flex flex-row items-center justify-center gap-6 mb-6 text-black flex-wrap">
                        <Link to="/phone" className="outline-none">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="border-2 border-stone-600 p-4 rounded-xl outline-none flex flex-col items-center justify-center"
                          >
                            <CiMobile1 className="text-4xl mb-2" />
                            <h1 className="text-xl">Phones</h1>
                          </motion.div>
                        </Link>
                        <Link to="/laptop" className="outline-none">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="border-2 border-stone-600 p-4 rounded-xl flex flex-col items-center justify-center"
                          >
                            <AiOutlineLaptop className="text-4xl mb-2" />
                            <h1 className="text-xl">Laptops</h1>
                          </motion.div>
                        </Link>
                        <Link to="/tablet" className="outline-none">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="border-2 border-stone-600 p-4 rounded-xl flex flex-col items-center justify-center"
                          >
                            <FaTabletScreenButton className="text-4xl mb-2" />
                            <h1 className="text-xl">Tablets</h1>
                          </motion.div>
                        </Link>
                      </div>
                      <div className="h-auto w-full text-center text-xl text-black md:text-3xl">
                        <div className="flex flex-col h-auto w-auto gap-2">
                          <div>Locate Your Ultimate Gadget</div>
                          <div className="flex items-center justify-center">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="border-2 w-1/2 border-stone-600 p-4 rounded-xl"
                            >
                              <Link
                                to="/filter"
                                className="h-full w-full outline-none flex flex-col items-center justify-center"
                              >
                                <FaCrosshairs className="text-4xl mb-2" />
                                <h1 className="text-xl">
                                  Filter by Your Criteria!
                                </h1>
                              </Link>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {isMounted && (
                    <div className="flex gap-2 flex-wrap items-center justify-evenly">
                      <div className="bg-black text-orange-600 font-semibold text-xl p-2 rounded-sm">
                        <h1>Trending</h1>
                      </div>
                      <div>
                        <span ref={elRef} className="text-xl"></span>
                      </div>
                    </div>
                  )}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, ease: easeInOut }}
                    className="flex flex-col gap-4 w-auto h-auto justify-evenly p-6"
                  >
                    {product.length > 0 &&
                      product.map((item, index) => (
                        <div
                          className="flex p-2 items-center justify-between bg-white h-auto gap-2 rounded-lg w-full sm:flex-row flex-col"
                          key={index}
                        >
                          <div className="w-full flex items-center justify-center h-full">
                            <Link
                              to={`/${item.productType}/${item.name
                                .toLowerCase()
                                .split(" ")
                                .join("")}`}
                              className="outline-none"
                            >
                              <div className="h-52 w-52 flex items-center justify-center">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="object-cover rounded-xl w-full h-full"
                                />
                              </div>
                            </Link>
                          </div>
                          <div className="w-full flex flex-col p-4 h-auto">
                            <div className="text-2xl capitalize">
                              {item.productType}
                            </div>
                            <div className="text-lg">{item.name}</div>
                            <div className="text-sm mt-4 break-words">
                              {item.description || "No description available"}
                            </div>
                          </div>
                        </div>
                      ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          {showFooter && (
            <div className="w-full select-none">
              <Footer />
            </div>
          )}
        </div>
      ) : (
        <div className="h-screen w-full text-xl">
          <CircularLoader />
        </div>
      )}
    </div>
  );
}

export default Landing;
