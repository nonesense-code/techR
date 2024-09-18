import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { easeInOut, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [isFound, setisFound] = useState(true);
  const [data, setData] = useState([]);
  const { itname } = useParams();
  const [flag, setFlag] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendURL}`);
        if (Array.isArray(response.data)) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [backendURL]);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const searchedItem = inputValue.toLowerCase().split(" ").join("");
      data.map((item) => {
        if (searchedItem === item.name.toLowerCase().split(" ").join("")) {
          setisFound(true);
          setFlag(true);
          navigate(
            `/${item.productType}/${item.name
              .toLowerCase()
              .split(" ")
              .join("")}`
          );
        } else if (itname === searchedItem) {
          setisFound(true);
          setFlag(true);
          return;
        } else {
          setisFound(false);
        }
      });
    }
  };

  useEffect(() => {
    const handleFocus = (event) => {
      if (event.key === "/") {
        event.preventDefault();
        const x = document.querySelector("#searchedText");
        if (x) {
          x.focus();
        }
      }
    };

    window.addEventListener("keydown", handleFocus);
    return () => {
      window.removeEventListener("keydown", handleFocus);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="fixed w-full bg-[#232F3E] py-2 px-4 z-50">
        <div className="flex items-center justify-between w-full flex-wrap">
          <div className="flex items-center justify-start">
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
              placeholder="Search (/)"
              className="px-2 py-1 rounded-md w-24 sm:w-48 bg-gray-600 outline-none text-white placeholder:text-white/80"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                color: !isFound ? "#900" : "white",
                textDecoration: !isFound ? "underline" : "none",
              }}
              onKeyDown={handleSearch}
              id="searchedText"
            />
            <button className="h-8 w-8 flex items-center justify-center p-2 outline-none">
              <FaSearch className="text-white" />
            </button>
          </div>
        </div>
      </div>
      <div className="pt-12"></div>
    </div>
  );
}

export default Navbar;
