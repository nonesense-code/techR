import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { easeInOut, motion } from "framer-motion";
function Navbar() {
  const [inputValue, setInputValue] = useState("");
  const [phoneData, setPhoneData] = useState([]);
  const backendURL = "https://tech-r.vercel.app/product/api";
  // const backendURL = "http://192.168.254.3:5000/product/api";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendURL}`);
        if (Array.isArray(response.data)) {
          setPhoneData(response.data);
        }
      } catch (error) {
        console.error("Error fetching datas:", error);
      }
    };

    fetchData();
  }, [backendURL]);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const searchTerm = inputValue.toLowerCase().split(" ").join("");
      console.log("Searching for:", searchTerm);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#232F3E] w-auto py-2 px-4">
      <div className="flex items-center justify-between w-full max-w-screen-lg mx-auto">
        <div className="flex items-center justify-start w-full">
          {["t", "e", "c", "h", "R"].map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: "50%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: index * 0.04,
                ease: easeInOut,
              }}
              className="text-2xl text-white font-bold"
            >
              {item}
            </motion.div>
          ))}
        </div>
        <div className="flex items-center bg-gray-600 rounded-md border-2 border-black">
          <input
            type="text"
            placeholder="Search"
            className="px-2 py-1 rounded-md w-24 sm:w-48 bg-gray-600 outline-none placeholder:text-zinc-200/70"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleSearch}
            id="searchedText"
          />
          <button className="h-8 w-8 flex items-center justify-center p-2 outline-none">
            <FaSearch className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
