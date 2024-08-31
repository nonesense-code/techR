import React, { useEffect, useState } from "react";
import Navbar from "./HomePage/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Phones() {
  const [phones, setPhones] = useState([]);
  const backendURL = "https://tech-r.vercel.app/product/api";

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get(`${backendURL}`);
        if (Array.isArray(response.data)) {
          setPhones(response.data);
        } else {
          console.error("Data is not in the expected format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching phones:", error);
      }
    };

    fetchPhones();
  }, [backendURL]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="min-h-screen w-full bg-gray-100"
    >
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Available Phones
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {phones.length > 0 ? (
            phones.map(
              (phone, index) =>
                phone.productType === "phone" && (
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                      duration: 0.4,
                    }}
                    key={index}
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                  >
                    <Link
                      to={`${phone.name.toLowerCase().split(" ").join("")}`}
                      className="flex h-full flex-col items-center justify-center w-auto"
                    >
                      <div className="h-full w-full">
                        <img
                          src={phone.image}
                          alt={phone.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                          {phone.name}
                        </h2>
                        <p className="text-gray-600 mt-2">
                          {phone.description || "No description available"}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                )
            )
          ) : (
            <p className="text-center text-lg text-gray-600">
              No Phones available
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Phones;
