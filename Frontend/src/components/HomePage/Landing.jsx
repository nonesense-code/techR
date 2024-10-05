import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import CircularLoader from "../../CircularLoader";
import AIlanding from "./AIlanding";
import Contact from "./Contact";
import { CiMobile3 } from "react-icons/ci";
import { LiaLaptopSolid } from "react-icons/lia";
import { FaTabletAlt } from "react-icons/fa";
import samsumgtab from "../../images/galaxytabs9ultra.jpg";
import acer from "../../images/acernitrov15.png";
import apple from "../../images/applemac.png";
import iPhone from "../../images/iPhone16promax_1.avif";
import redmi from "../../images/redminote11pro.jpeg";

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

  const [product, setProduct] = useState([]);
  const [showFooter, setShowFooter] = useState(false);
  const [loading, setLoading] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

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

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
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
                  />
                  <div className="absolute text-center bg-black border-white border-t-2 border-b-2 text-[#00FFA3] w-full bottom-0 h-auto p-2 mx-auto left-0 right-0">
                    {item.name}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="h-auto w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-auto w-full"
            >
              <div className="container mx-auto px-4 py-8">
                {/* for the newly launched change item.popularity to item.isNew */}
                <div className="flex flex-col items-start justify-center">
                  <h1 className="text-xl lg:text-3xl font-bold bg-black p-2 rounded-md text-[#FFA500] mb-2">
                    Newly Launched
                  </h1>
                  <div className="flex items-center justify-center gap-6 flex-col">
                    {product
                      .filter((item) => item.popularity === "average")
                      .map((item, index) => {
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

                {/* for most sale of this year change item.popularity to item.isMostSold */}
                <div className="flex flex-col items-start justify-center mt-20">
                  <h1 className="text-xl lg:text-3xl font-bold bg-black p-2 rounded-md text-[#FFA500] mb-2">
                    Most Sold of {new Date().getFullYear()}
                  </h1>
                  <div className="flex items-center justify-center gap-6 flex-col">
                    {product
                      .filter((item) => item.popularity === "average")
                      .map((item, index) => {
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

                {/* for most popular it is perfect item.popularity keep as it is */}
                <div className="flex flex-col items-start justify-center mt-20">
                  <h1 className="text-xl lg:text-3xl font-bold bg-black p-2 rounded-md text-[#FFA500] mb-2">
                    Most Popular
                  </h1>
                  <div className="flex items-center justify-center gap-6 flex-col">
                    {product
                      .filter((item) => item.popularity === "average")
                      .map((item, index) => {
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

                {/* for recommended product change item.popularity to recommended */}
                <div className="flex flex-col items-start justify-center mt-20">
                  <h1 className="text-xl lg:text-3xl font-bold bg-black p-2 rounded-md text-[#FFA500] mb-2">
                    Recommended for you
                  </h1>
                  <div className="flex items-center justify-center gap-6 flex-col">
                    {product
                      .filter((item) => item.popularity === "average")
                      .map((item, index) => {
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
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="h-screen w-full text-xl">
            <CircularLoader />
          </div>
        )}
      </div>
      {showFooter && <Footer />}
    </div>
  );
}

export default Landing;
