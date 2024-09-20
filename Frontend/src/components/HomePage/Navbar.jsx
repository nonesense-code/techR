import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { CiMobile1 } from "react-icons/ci";
import { AiOutlineLaptop } from "react-icons/ai";
import { FaTabletScreenButton } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { RiMenuFold2Fill } from "react-icons/ri";
import { RiMenuFold3Fill } from "react-icons/ri";
import { IoInformationCircle } from "react-icons/io5";
import axios from "axios";
import { easeInOut, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import News from "./News";

function Navbar() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const { itname } = useParams();

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
          navigate(
            `/${item.productType}/${item.name
              .toLowerCase()
              .split(" ")
              .join("")}`
          );
        } else if (itname === searchedItem) {
          return;
        }
      });
    }
  };

  useEffect(() => {
    const handleFocus = (event) => {
      if (event.key === "/") {
        event.preventDefault();
        const x = document.querySelector("#searchedText");
        x.focus();
      }
    };

    window.addEventListener("keydown", handleFocus);
    return () => {
      window.removeEventListener("keydown", handleFocus);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="fixed w-full backdrop-blur-md py-2 px-4 z-50 bg-[#232F3E]">
        <div className="flex items-center justify-between w-auto flex-wrap gap-1">
          <div className="flex items-center justify-center gap-1 text-2xl ">
            <RiMenuFold2Fill
              className="text-white md:hidden p-1 rounded-full h-8 w-8 border-2 border-stone-600 flex items-center justify-center"
              onClick={() => setShow(!show)}
            />
            <div className="flex items-center justify-start">
              {["T", "e", "c", "h", "R"].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: "50%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.04,
                    ease: easeInOut,
                  }}
                  className="text-white font-extrabold tracking-wider"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="hidden md:flex gap-2 items-center justify-evenly flex-1 text-[#cfd3e0] font-semibold text-xl flex-wrap">
            {["Home", "Phone", "Laptop", "Tablet", "About"].map(
              (item, index) => (
                <motion.div key={index} className="underline-animation">
                  <Link
                    to={`/${item.toLowerCase().split(" ").join("")}`}
                    className="flex items-center justify-center gap-1 outline-none"
                  >
                    {index === 0 && <FaHome />} {index === 1 && <CiMobile1 />}
                    {index === 2 && <AiOutlineLaptop />}
                    {index === 3 && <FaTabletScreenButton />}
                    {index === 4 && <IoInformationCircle />}
                    {item}
                  </Link>
                </motion.div>
              )
            )}
          </div>

          <div className="flex items-center bg-gray-600 rounded-md border-2 border-black">
            <input
              type="text"
              placeholder="Search"
              className="px-2 py-1 rounded-md w-24 sm:w-48 bg-gray-600 outline-none text-white placeholder:text-white/80"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyDown={handleSearch}
              id="searchedText"
            />
            <button className="searchBtn h-8 w-8 flex items-center justify-center p-2 outline-none">
              <FaSearch className="text-white" />
            </button>
          </div>
        </div>
      </div>
      {show && (
        <div className="md:hidden bg-black min-w-52 w-auto min-h-screen z-50 fixed text-white p-4">
          <div className="flex flex-col gap-12 items-start justify-evenly">
            <div className="flex items-center gap-1 justify-start text-xl font-extrabold tracking-wide">
              <RiMenuFold3Fill
                className="p-1 rounded-full h-8 w-8 bg-stone-600 flex items-center justify-center"
                onClick={() => setShow(!show)}
              />
              <h1>techR</h1>
            </div>
            <div className="flex md:hidden flex-col gap-6 items-start justify-center flex-1 text-[#cfd3e0] font-semibold text-xl flex-wrap">
              {["Home", "Phone", "Laptop", "Tablet", "About"].map(
                (item, index) => (
                  <motion.div key={index}>
                    <Link
                      to={`/${item.toLowerCase().split(" ").join("")}`}
                      className="flex items-center justify-center gap-1 outline-none"
                    >
                      {index === 0 && <FaHome />} {index === 1 && <CiMobile1 />}
                      {index === 2 && <AiOutlineLaptop />}
                      {index === 3 && <FaTabletScreenButton />}
                      {index === 4 && <IoInformationCircle />}
                      {item}
                    </Link>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      )}
      <News />
      <div className="pb-20"></div>
    </div>
  );
}

export default Navbar;
