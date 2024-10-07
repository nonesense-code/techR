import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CircularLoader from "../CircularLoader";

function Tablets() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [products, setProducts] = useState({
    phones: [],
    laptops: [],
    tablets: [],
    mostpopular: [],
    latest: [],
    budget: [],
    mostsold: [],
    midrange: [],
    flagship: [],
    recommended: [],
    popularity: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async (url) => {
    try {
      const response = await axios.get(url);
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(backendURL);
  }, []);

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
        <div className="min-h-screen w-full">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
              Available Tablets
            </h1>
            <div className="flex flex-col items-center justify-center w-full gap-6">
              {products.tablets.length > 0 &&
                products.tablets.map((tablet, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-lg overflow-hidden p-2 md:flex flex-row w-full"
                  >
                    <Link
                      to={`${tablet.name.toLowerCase().split(" ").join("")}`}
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
                              src={tablet.image}
                              alt={tablet.name}
                              className="w-full md:w-full md:h-96 p-12 object-contain object-center"
                              loading="lazy"
                            />
                          </motion.div>
                        </div>
                        <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                          <h2 className="underline-animations text-xl text-black text-center font-extrabold">
                            {tablet.name}
                          </h2>
                          <p className="text-stone-600">
                            {(tablet.blog && truncateText(tablet.blog, 30)) ||
                              "No description available"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tablets;
