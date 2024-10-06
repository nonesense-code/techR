import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CircularLoader from "../CircularLoader";

function Laptops() {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await axios.get(`${backendURL}`);
        if (Array.isArray(response.data)) {
          setLaptops(response.data);
          setLoading(false);
        } else {
          console.error("Data is not in the expected format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching laptops:", error);
        setLoading(false);
      }
    };

    fetchLaptops();
  }, [backendURL]);

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  return (
    <div className="h-auto w-full">
      {loading ? (
        <CircularLoader />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="h-screen w-full"
        >
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
              Available Laptops
            </h1>
            <div className="flex flex-col items-center justify-center w-full gap-6">
              {laptops.length > 0 &&
                laptops.map(
                  (laptop, index) =>
                    laptop.productType === "laptop" && (
                      <div
                        key={index}
                        className="bg-white shadow-lg rounded-lg overflow-hidden p-2 md:flex flex-row w-full"
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
                              <h2 className="underline-animations text-xl text-black text-center font-extrabold">
                                {laptop.name}
                              </h2>
                              <p className="text-stone-600">
                                {(laptop.blog &&
                                  truncateText(laptop.blog, 30)) ||
                                  "No description available"}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )
                )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Laptops;
