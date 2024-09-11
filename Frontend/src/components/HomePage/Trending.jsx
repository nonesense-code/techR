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
    <div className="flex items-center justify-evenly flex-wrap gap-2">
      <div className="bg-black text-orange-600 text-2xl rounded-sm p-2">
        Trending
      </div>
      <div className="text-xl bg-zinc-400 p-2 rounded-sm">
        <span ref={typedElement} />
      </div>
    </div>
  );
};

export default Trending;
