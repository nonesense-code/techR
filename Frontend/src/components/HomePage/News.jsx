import React from "react";
import { motion } from "framer-motion";
const newsItems = [
  "New Tech Gadget Released: The Latest in AI Innovation",
  "Breakthrough in Quantum Computing: What It Means for the Future",
  "Tech Giants Collaborate on New Standards for Cybersecurity",
  "Virtual Reality Headsets: The Next Big Thing in Entertainment",
  "5G Rollout Continues: How It Will Impact Mobile Technology",
  "Latest Trends in Smart Home Technology: What to Expect",
  "Artificial Intelligence in Healthcare: Revolutionizing Patient Care",
  "Upcoming Tech Conferences You Shouldn't Miss",
];
const News = () => {
  let news = newsItems.join(" | ");
  return (
    <div className="fixed page2 bg-[#000] pt-14">
      <div className="w-full overflow-hidden whitespace-nowrap flex text-[24px]">
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
