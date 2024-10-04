import React, { useState } from "react";
import Trending from "./Trending";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import redmi from "../../images/redminote11pro.jpeg";
import samsungtab from "../../images/galaxytabs9ultra.jpg";
import iPhone from "../../images/iPhone16promax_1.avif";

const Landing = () => {
  const hotDrops = {
    name: "Redmi Note 11 pro",
    note: "The newly launched Redmi Note 11 pro Max features a 108MP of main camera with an stunning photo quality!",
    link: "/phone/redminote11pro",
  };

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  return (
    <div className="h-auto text-white w-full max-w-[1300px] z-0">
      <section className="flex flex-col items-center justify-center text-center h-auto mt-8">
        <div>
          <Trending />
        </div>
        <div className="flex items-center justify-center w-auto md:w-full flex-col">
          <h2 className="stroke text-2xl md:text-3xl font-bold mb-1 text-center cursor-pointer">
            HOT DROP
          </h2>
        </div>
      </section>

      <section className="w-full md:px-8 flex items-center justify-center gap-2 mt-2 md:mt-4">
        <div className="flex flex-col md:flex-row items-center w-full md:h-80 justify-center gap-2 mb-12 flex-wrap relative">
          <div className="text-center w-full bg-no-repeat bg-center md:w-full relative">
            <Link to={hotDrops.link} className="outline-none w-auto">
              <div
                onMouseEnter={() => setShow1(true)}
                onMouseLeave={() => setShow1(false)}
                className="flex items-center w-full justify-center h-auto md:h-auto md:w-auto flex-col relative"
              >
                <div>
                  <img
                    src={redmi}
                    alt={hotDrops.name}
                    className="mb-4 md:h-80 w-full md:w-auto h-full object-contain rounded-md md:rounded-none"
                  />
                </div>
                {show1 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="hidden lg:flex absolute left-80 top-32 justify-center w-full z-50">
                      {[
                        "R",
                        "e",
                        "d",
                        "m",
                        "i",
                        " ",
                        "N",
                        "o",
                        "t",
                        "e",
                        " ",
                        "1",
                        "1",
                        " ",
                        "P",
                        "r",
                        "o",
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: -10 }}
                          transition={{ duration: 0.2, delay: index * 0.01 }}
                          className="text-4xl text-[#00FFA3] mx-[1px]"
                        >
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Link>
            <div className="absolute text-sm font-semibold md:text-xs text-black bottom-4 md:bottom-[16px] w-full z-30 bg-[#00ffa2c4] p-2">
              <h1>{hotDrops.note}</h1>
            </div>
          </div>
        </div>
        <div className="hidden flex-col md:flex items-center w-full md:h-80 justify-center gap-2 mb-12 flex-wrap relative">
          <div className="text-center w-full bg-no-repeat bg-center md:w-full relative">
            <Link to={hotDrops.link} className="outline-none w-auto">
              <div
                onMouseEnter={() => setShow2(true)}
                onMouseLeave={() => setShow2(false)}
                className="flex items-center w-full justify-center h-auto md:h-auto md:w-auto flex-col relative"
              >
                <img
                  src={samsungtab}
                  alt={hotDrops.name}
                  className="mb-4 md:h-80 w-full md:w-auto h-full object-contain md:rounded-none p-2 border-2 border-black"
                />
                {show2 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="hidden lg:flex absolute right-80 top-32 justify-center w-full z-50">
                      {[
                        "G",
                        "a",
                        "l",
                        "a",
                        "x",
                        "y",
                        "T",
                        "a",
                        "b",
                        "S",
                        "9",
                        "U",
                        "l",
                        "t",
                        "r",
                        "a",
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: -10 }}
                          transition={{ duration: 0.2, delay: index * 0.01 }}
                          className="text-4xl text-[#00FFA3] mx-[1px]"
                        >
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Link>
            <div className="absolute text-md md:text-xs text-black bottom-4 md:bottom-[16px] w-full z-30 bg-[#00ffa2c4] p-2">
              <h1>{hotDrops.note}</h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
