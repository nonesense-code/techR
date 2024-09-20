import React from "react";

function Footer() {
  return (
    <>
      <footer className="relative bottom-0 px-4 py-2 w-full h-auto bg-black text-gray-400 flex items-center justify-center">
        &copy; {new Date().getFullYear()} TechR. All rights reserved.
      </footer>
    </>
  );
}

export default Footer;
