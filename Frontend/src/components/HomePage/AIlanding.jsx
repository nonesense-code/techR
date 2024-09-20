import React from "react";
import Trending from "./Trending";
import img1 from "../../images/landingimage1.png";
import img2 from "../../images/landingimage2.png";
import img3 from "../../images/landimgimage3.png";
import img4 from "../../images/landingimage4.png";

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
const Landing = () => {
  return (
    <div className="h-auto text-white">
      <section
        className="flex flex-col items-center justify-center text-center h-72 bg-cover bg-bottom"
        style={{
          backgroundImage: `url(${img3})`,
        }}
      >
        <div>
          <Trending />
        </div>
        <h1 className="text-5xl font-bold">Welcome to TechR</h1>
        <p className="text-lg text-sky-600 mb-6 tracking-tight">
          Innovating technology solutions for a smarter future.
        </p>
      </section>

      <section className="px-8 py-16">
        <div className="flex items-center justify-center w-auto flex-col">
          <h2 className="stroke text-4xl font-bold mb-2 text-center">
            HOT DROP
          </h2>
          <h2 className="text-sm mb-8 text-center text-zinc-400">
            Click Image for more details!
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="bg-gray-900 p-6 rounded-lg text-center"
            style={{ backgroundImage: `url(${img4})` }}
          >
            <Link to="/phone/iphone16promax">
              <img
                src="https://www.apple.com/v/iphone-16-pro/a/images/overview/product-viewer/iphone-pro/all_colors__fdpduog7urm2_large.jpg"
                alt={img2}
                className="mb-4 mx-auto h-48 object-cover rounded-md"
              />
              <h3 className="text-2xl font-semibold mb-2">
                Iphone 16 pro lineup
              </h3>
            </Link>
            <p className="text-gray-400">
              Apple anounces its one of the major launch event of iPhones of
              this year with exciting features.
            </p>
          </div>
          <div
            className="bg-gray-900 p-6 rounded-lg text-center"
            style={{ backgroundImage: `url(${img4})` }}
          >
            <Link to="/laptop/asusrogzephyrusg14">
              <img
                src="https://rog.asus.com/media/157809658839.jpg"
                alt="Product 2"
                className="mb-4 mx-auto h-48 object-cover rounded-md"
              />
              <h3 className="text-2xl font-semibold mb-2">
                Just Launched: ASUS ROG Zephyrus G14
              </h3>
            </Link>

            <p className="text-gray-400">
              High-performance gaming laptop featuring Ryzen 9, RTX 40 GPU, and
              a stunning 120Hz display.
            </p>
          </div>
          <div
            className="bg-gray-900 p-6 rounded-lg text-center"
            style={{ backgroundImage: `url(${img4})` }}
          >
            <Link to="/tablet/appleipadpro">
              <img
                src="https://www.apple.com/newsroom/videos/ipad-pro-magic-keyboard/posters/Apple-iPad-Pro-Magic-Keyboard-240507.jpg.large_2x.jpg"
                alt="Product 3"
                className="mb-4 mx-auto h-48 object-cover rounded-md"
              />
              <h3 className="text-2xl font-semibold mb-2">
                Introducing the All-New Apple iPad Pro
              </h3>
            </Link>
            <p className="text-gray-400">
              Powerful M2 chip, Liquid Retina XDR display, and enhanced
              multitasking capabilities for creative professionals.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
