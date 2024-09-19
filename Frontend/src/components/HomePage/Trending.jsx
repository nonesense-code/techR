import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const Trending = () => {
  const typedElement = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "Apple iPhone 16 Pro Max",
        "Samsung Galaxy S24 Ultra",
        "Apple iPhone 15 Pro Max",
        "Google Pixel 9 Pro",
        "OnePlus 12",
        "Xioami 14 Ultra",
      ],
      typeSpeed: 100,
      backSpeed: 0,
      loop: true,
    };

    const typed = new Typed(typedElement.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 mt-2 mb-8 w-full flex-col md:flex-row">
      <div className="bg-black text-[#FFA500] rounded-sm p-1  text-center w-auto text-[14px] md:text-xl whitespace-nowrap">
        Trending
      </div>
      <div className="bg-zinc-400 px-1 md:p-1 rounded-sm text-[12px] md:text-xl">
        <span ref={typedElement} />
      </div>
    </div>
  );
};

export default Trending;
