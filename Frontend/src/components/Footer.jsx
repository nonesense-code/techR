import React from "react";

function Footer() {
  return (
    <>
      <footer className="relative mt-4 bottom-0 px-4 py-2 w-full h-12 bg-black text-white flex items-center justify-center">
        &copy; {new Date().getFullYear()} TechSo. All rights reserved.
      </footer>
    </>
  );
}

export default Footer;
