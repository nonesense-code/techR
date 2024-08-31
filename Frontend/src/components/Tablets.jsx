import React, { useEffect, useState } from "react";
import Navbar from "./HomePage/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CircularLoader from "../CircularLoader";
function Tablets() {
  const [tablets, setTablets] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendURL = "https://tech-r.vercel.app/product/api";
  // const backendURL = "http://192.168.254.3:5000/product/api";

  useEffect(() => {
    const fetchTablets = async () => {
      try {
        const response = await axios.get(`${backendURL}`);
        setLoading(false);
        if (Array.isArray(response.data)) {
          setTablets(response.data);
        } else {
          console.error("Data is not in the expected format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching tablets:", error);
      }
    };
    fetchTablets();
  }, [backendURL]);

  return (
    <div className="h-screen w-full">
      <Navbar />
      {loading ? (
        <CircularLoader />
      ) : (
        <div className="h-screen w-full">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
              Available Tablets
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {tablets.length > 0 &&
                tablets.map(
                  (tablet, index) =>
                    tablet.productType === "tablet" && (
                      <motion.div
                        whileHover={{
                          scale: 1.03,
                          duration: 0.4,
                        }}
                        key={index}
                        className="bg-white shadow-lg rounded-lg overflow-hidden"
                      >
                        <Link
                          to={`${tablet.name
                            .toLowerCase()
                            .split(" ")
                            .join("")}`}
                          className="block"
                        >
                          <img
                            src={tablet.image}
                            alt={tablet.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                              {tablet.name}
                            </h2>
                            <p className="text-gray-600 mt-2">
                              {tablet.description || "No description available"}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    )
                )}
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tablets;
