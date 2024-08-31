import React from "react";
import Navbar from "./Navbar";
import Landing from "./Landing";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-[#232F3E] w-full">
        <Navbar />
      </div>
      <main className="flex-grow">
        <Landing />
      </main>
    </div>
  );
}

export default Home;
