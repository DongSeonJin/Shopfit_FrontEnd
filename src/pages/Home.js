import React from "react";
import { Route, Routes } from "react-router-dom";

import HomeContent from "../components/common/HomeContent";
import Community from "../pages/Community";
import Shopping from "../pages/Shopping";
import News from "../pages/News";
import ProductDetail from "../components/shop/ProductDetail";

const Home = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeContent />} />

        <Route path="/community" element={<Community />} />

        <Route path="/shopping" element={<Shopping />} />
        <Route path="/shopping/:pageNum" element={<Shopping />} />
        <Route path="/shopping/search/:keyword" element={<Shopping />} />
        <Route
          path="/shopping/search/:keyword/:pageNum"
          element={<Shopping />}
        />

        <Route
          path="/shopping/products/:productNum"
          element={<ProductDetail />}
        />

        <Route path="/news/list" element={<News />} />
        <Route path="/news/list/:pageNum" element={<News />} />
        <Route path="/news/list/search/:keyword" element={<News />} />
        <Route path="/news/list/search/:keyword/:pageNum" element={<News />} />
      </Routes>
    </div>
  );
};

export default Home;
