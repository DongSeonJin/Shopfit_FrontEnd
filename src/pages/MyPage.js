import React from "react";
import { Route, Routes } from "react-router-dom";
// import UserLogin from "../components/mypage/UserLogin";
import UserInfo from "../components/mypage/UserInfo";
import UserInfoUpdate from "../components/mypage/UserInfoUpdate";

const MyPage = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/login" element={<UserLogin />} /> */}
        <Route path="/mypage/info" element={<UserInfo />} />
        <Route path="/mypage/edit" element={<UserInfoUpdate />} />
      </Routes>
    </div>
  );
};
export default MyPage;
