import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import Phones from "./components/Phones";
import Laptops from "./components/Laptops";
import Tablets from "./components/Tablets";
import PhoneBlog from "./components/PhoneBlog";
import LaptopBlog from "./components/LaptopBlog";
import TabletBlog from "./components/TabletBlog";
import About from "./components/HomePage/About";
import Filter from "./components/Filter";
import Navbar from "./components/HomePage/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phone" element={<Phones />} />
          <Route path="/laptop" element={<Laptops />} />
          <Route path="/tablet" element={<Tablets />} />
          <Route path="/about" element={<About />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/phone/:itname" element={<PhoneBlog />} />
          <Route path="/laptop/:itname" element={<LaptopBlog />} />
          <Route path="/tablet/:itname" element={<TabletBlog />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
