import React from "react";
import { Route, Routes } from "react-router-dom";

import HomeContent from './../pages/home/HomeContent';
import Community from './Community';
import Shopping from './Shopping';
import News from './News';
import MyPage from './MyPage';
import SignUp from './SignUp';

const Home = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeContent />} />
      </Routes>
      <Community />
      <Shopping />
      <News />
      <MyPage />
      <SignUp />

    </div>
  );
};

export default Home;
