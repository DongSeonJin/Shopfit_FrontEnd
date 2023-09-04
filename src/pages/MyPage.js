import React from "react";
import { Route, Routes } from 'react-router-dom';
// import UserLogin from "../components/mypage/UserLogin";
import MyPosts from "../components/mypage/MyPosts";
const Mypage = () => {
    return (
        <div>
            <Routes>
                {/* <Route path="/login" element={<UserLogin />} /> */}
                <Route path="/mypage/myposts/:userId" element={<MyPosts />} />
            </Routes>
        </div>
    );
};
export default Mypage;