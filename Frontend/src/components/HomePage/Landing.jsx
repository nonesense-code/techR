import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { easeInOut, motion } from "framer-motion";
import CircularLoader from "../../CircularLoader";
import AIlanding from "./AIlanding";
import Contact from "./Contact";

function Landing() {
  const [product, setProduct] = useState([]);
  const [showFooter, setShowFooter] = useState(false);
  const [loading, setLoading] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [image, setImage] = useState("");

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

  useEffect(() => {
    if (!product.popularity === "popular" || product.length === 0) return;
    const intervalId = setInterval(() => {
      const length = product.length;
      const randomIndex = Math.floor(Math.random() * length);
      setImage(product[randomIndex]?.image || "");
    }, 4000);

    return () => clearInterval(intervalId);
  }, [product]);
  return (
    <div className="flex flex-col items-center w-full">
      <AIlanding />
      <div className="h-full w-auto md:w-[800px]">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, ease: easeInOut }}
            className="flex flex-col gap-4 w-auto h-auto justify-evenly px-4 md:px-0"
          >
            {product.length > 0 &&
              product.map((item, index) => (
                <div
                  className="flex md:p-2 items-center justify-between bg-white h-auto gap-2 rounded-lg w-full flex-row"
                  key={index}
                >
                  <div className="w-full flex items-center justify-center h-full">
                    <Link
                      to={`/${item.productType}/${item.name
                        .toLowerCase()
                        .split(" ")
                        .join("")}`}
                      className="outline-none"
                    >
                      <div className="h-52 w-full flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-contain object-center rounded-xl w-full h-full"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="w-[70%] flex flex-col p-4 h-auto items-center justify-evenly">
                    <div className="text-lg font-semobold md:font-extrabold">
                      {item.name}
                    </div>
                    <div className="text-[12px] md:text-lg lg:text-xl mt-2 break-words">
                      {(item.blog && truncateText(item.blog, 16)) ||
                        "No description available"}
                    </div>
                  </div>
                </div>
              ))}
          </motion.div>
        ) : (
          <div className="h-screen w-full text-xl">
            <CircularLoader />
          </div>
        )}
      </div>
      <div className="flex flex-col items-center w-full">
        <Contact />
      </div>
      {showFooter && <Footer />}
    </div>
  );
}

export default Landing;
