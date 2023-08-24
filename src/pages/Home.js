import React from "react";
import { Route, Routes } from "react-router-dom";


import ProductDetail from "../components/shop/ProductDetail";
import HomeContent from '../components/common/HomeContent';
import Community from '../pages/Community';
import Community1 from '../components/community/PostList1';
import Community2 from '../components/community/PostList2';
import Community3 from '../components/community/PostList3';
import Shopping from '../pages/Shopping';
import News from '../pages/News';
import Communityhan from './Communityhan';

const Home = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeContent />} />

        
        {/* <Route path="/community/:categoryId" element={<Community />} /> */}

        <Route path="/community" element={<Communityhan />} />
        <Route path="/post/list/1" element={<Community1 />} />
        <Route path="/post/list/2" element={<Community2 />} />
        <Route path="/post/list/3" element={<Community3 />} />


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
