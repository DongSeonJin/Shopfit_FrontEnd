import React from "react";
import { Route, Routes } from "react-router-dom";

import HomeContent from "../components/common/HomeContent";
import Shopping from "../pages/Shopping";
import News from "../pages/News";
import Community from "./Community";
import SignUp from "./SignUp";
import MyPage from "./MyPage";


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
