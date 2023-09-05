import React from "react";
import { Route, Routes } from "react-router-dom";

import MyPosts from "../pages/mypage/MyPosts";
import OrderHistory from './../pages/mypage/OrderHistory';
import OrderHistoryDetails from './../pages/mypage/OrderHistoryDetails';
import UserInfo from './../pages/mypage/UserInfo';
import UserInfoUpdate from './../pages/mypage/UserInfoUpdate';
import UserLogin from './../pages/mypage/UserLogin';


const MyPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route path="/orderhistory/:orderId" element={<OrderHistoryDetails />} />
        <Route path="/mypage/info" element={<UserInfo />} />
        <Route path="/mypage/edit" element={<UserInfoUpdate />} />
        <Route path="/mypage/myposts/:userId" element={<MyPosts />} />
      </Routes>
    </div>
  );
};
export default MyPage;