import React from "react";
import Home from "./components/HomePage/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Phones from "./components/Phones";
import Laptops from "./components/Laptops";
import Tablets from "./components/Tablets";
import PhoneBlog from "./components/PhoneBlog";
import LaptopBlog from "./components/LaptopBlog";
import TabletBlog from "./components/TabletBlog";
import Filter from "./components/Filter";
function App() {
  return (
    <>
      <Router>
        <Routes>  
          <Route path="/" element={<Home />} />
          <Route path="/phone" element={<Phones />} />
          <Route path="/laptop" element={<Laptops />} />
          <Route path="/tablet" element={<Tablets />} />
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
