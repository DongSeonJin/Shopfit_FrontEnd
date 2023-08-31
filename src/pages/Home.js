import React from "react";
import { Route, Routes } from "react-router-dom";

import HomeContent from '../components/common/HomeContent';
import Shopping from '../pages/Shopping';
import News from '../pages/News';
import Community from "./Community";
import Mypage from "./Mypage";

const Home = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeContent />} />
      </Routes>
      <Mypage />
      <Community />
      <Shopping />
      <News />
    </div>
  );
};

export default Home;
