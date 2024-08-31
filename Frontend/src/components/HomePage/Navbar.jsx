import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

function Navbar() {
  const [inputValue, setInputValue] = useState("");
  const [phoneData, setPhoneData] = useState([]);
  const backendURL = "https://tech-r.vercel.app/product/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendURL}`);
        if (Array.isArray(response.data)) {
          setPhoneData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
        <h1 className="text-2xl text-white font-bold">techR</h1>
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
