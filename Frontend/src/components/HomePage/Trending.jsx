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
      typeSpeed: 80,
      backSpeed: 0,
      loop: true,
    };

    const typed = new Typed(typedElement.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 mt-8 w-full">
      <div className="bg-black text-orange-600 rounded-sm p-2 text-center w-auto text-[20px] md:text-xl lg:text-2xl whitespace-nowrap">
        Trending
      </div>

      <div className="bg-zinc-400 p-2 rounded-sm text-[12px] md:text-xl lg:text-2xl">
        <span ref={typedElement} />
      </div>
    </div>
  );
};

export default Trending;
