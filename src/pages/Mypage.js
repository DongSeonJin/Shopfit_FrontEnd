import React from "react";
import { Route, Routes } from 'react-router-dom';

import UserLogin from "../components/mypage/UserLogin";
import OrderHistory from "../components/mypage/OrderHistory";

const Mypage = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<UserLogin />} />
                <Route path="/orderhistory" element={<OrderHistory />} />
            </Routes>
        </div>
    );
};
    
export default Mypage;