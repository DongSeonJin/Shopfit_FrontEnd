import React from "react";

import { Route, Routes } from "react-router-dom";
import UserLogin from "../components/mypage/UserLogin";
import UserInfo from "../components/mypage/UserInfo";
import UserInfoUpdate from "../components/mypage/UserInfoUpdate";
import MyPosts from "../components/mypage/MyPosts";
import OrderHistory from "../components/mypage/OrderHistory";
import OrderHistoryDetails from "../components/mypage/OrderHistoryDetails";

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

