import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { easeInOut, motion } from "framer-motion";
import { FaCrosshairs } from "react-icons/fa";
import CircularLoader from "../../CircularLoader";
import Trending from "./Trending";
import Qnas from "./Qna's";

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
      <div className="w-auto flex-col items-center flex justify-center px-4 md:px-6 lg:px-8">
        <div className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-[#232F3E] mt-2">
          <div>
            <Trending />
          </div>
        </div>
        <div className="flex items-center justify-evenly gap-2">
          <div>
            <Qnas data="laptop" />
          </div>
          {image && (
            <div className="h-96 w-auto rounded-xl overflow-hidden flex items-center justify-center bg-white">
              <img
                src={image}
                alt="Trends"
                className="min-w-96 min-h-96 h-auto md:h-96 w-auto object-cover bg-cover object-center"
              />
            </div>
          )}
        </div>
      </div>
      <div className="h-full w-auto md:w-[800px]">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, ease: easeInOut }}
            className="flex flex-col gap-4 w-auto h-auto justify-evenly p-6"
          >
            {product.length > 0 &&
              product.map((item, index) => (
                <div
                  className="flex p-2 items-center justify-between bg-white h-auto gap-2 rounded-lg w-full sm:flex-row flex-col"
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
                          className="object-cover rounded-xl w-full h-full"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="w-auto flex flex-col p-4 h-auto">
                    <div className="text-xl font-extrabold text-center">
                      {item.name}
                    </div>
                    <div className="text-sm md:text-lg lg:text-xl mt-4 break-words">
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
        {showFooter && <Footer />}
      </div>
    </div>
  );
}

export default Landing;
