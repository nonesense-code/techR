import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { easeInOut, motion } from "framer-motion";
// import CircularLoader from "../../CircularLoader";
import AIlanding from "./AIlanding";
import Contact from "./Contact";

function Landing() {
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
      <div className="h-full w-auto md:w-[800px]">
        {loading && (
          <div className="h-auto w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-auto w-full"
            >
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
                  Available products
                </h1>
                <div className="flex flex-col items-center justify-center w-full gap-6">
                  {product.length > 0 &&
                    product.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white shadow-2xl rounded-lg overflow-hidden p-2 md:flex flex-row w-full"
                      >
                        <Link
                          to={`/${item.productType}/${item.name
                            .toLowerCase()
                            .split(" ")
                            .join("")}`}
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
                                className="w-auto flex items-center justify-center bg-cover bg-center"
                              >
                                <motion.div
                                  whileHover={{
                                    scale: 1.2,
                                  }}
                                >
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full md:w-full md:h-96 p-12 object-contain object-center"
                                  />
                                </motion.div>
                              </motion.div>
                            </div>
                            <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                              <h2 className="underline-animations text-xl text-black text-center font-extrabold">
                                {item.name}
                              </h2>
                              <p className="text-stone-600">
                                {(item.blog && truncateText(item.blog, 30)) ||
                                  "No description available"}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
          {/* : (
           <div className="h-screen w-full text-xl">
             <CircularLoader />
           </div>
         )} */}
      </div>
      <div className="flex flex-col items-center w-full">
        <Contact />
      </div>
      {showFooter && <Footer />}
    </div>
  );
}

export default Landing;
