import React, { useEffect, useState } from "react";
import Navbar from "./HomePage/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function Phones() {
  const [phones, setPhones] = useState([]);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

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

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  return (
    <div className="h-screen w-full">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="h-screen w-full"
      >
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
            Available Phones
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {phones.length > 0 &&
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
                        className="block"
                      >
                        <img
                          src={phone.image}
                          alt={phone.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="p-4">
                          <h2 className="text-xl font-semibold text-gray-800">
                            {phone.name}
                          </h2>
                          <p className="text-gray-600 mt-2">
                            {(phone.blog && truncateText(phone.blog, 20)) ||
                              "No description available"}{" "}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  )
              )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Phones;
