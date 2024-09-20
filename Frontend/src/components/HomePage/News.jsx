import React from "react";
import { motion } from "framer-motion";
const newsItems = [
  "iPhone 16 launches with great improvement in camera and with 6.9 inch display",
  "Samsung Galaxy S25 Ultra renders tease exciting design improvements",
  "The Google Pixel 9 Pro has launched with a stunning 6.3-inch AMOLED display, improved AI-powered camera features, and enhanced battery efficiency",
  "PS5 Pro is officially revealed, promising enhanced PSVR 2 gaming experiences",
  "AirPods Pro 2 gets a hearing test feature in a new software update",
  "Qualcomm's next-gen gaming engine redefines mobile gaming experiences",
  "Meta showcases its AI hardware with energy-efficient RISC-V cores",
  "Sony’s new PS5 Pro aims for a game-changing VR performance",
];
const News = () => {
  let news = newsItems.join(" | ");
  return (
    <div className="fixed bg-[#000] pt-14 z-40">
      <div className="w-full overflow-hidden whitespace-nowrap flex text-[16px] text-gray-400 tracking-wide">
        <motion.h1
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
          }}
          className="marquee_text pl-4"
        >
          {news}
        </motion.h1>
      </div>
    </div>
  );
};

export default News;
