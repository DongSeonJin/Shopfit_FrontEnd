import React from "react";
import { Route, Routes } from "react-router-dom";


import ProductDetail from "../components/shop/ProductDetail";
import HomeContent from '../components/common/HomeContent';
import Communityhan from './Communityhan'
import Shopping from '../pages/Shopping';
import News from '../pages/News';

const Home = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeContent />} />
      </Routes>
      <Communityhan />
      <Shopping />
      <News />
    </div>
  );
};

export default Home;
