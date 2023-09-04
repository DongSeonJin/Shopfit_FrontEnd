import React from "react";
import { Route, Routes } from 'react-router-dom';

import UserLogin from "../components/mypage/UserLogin";
import OrderHistory from "../components/mypage/OrderHistory";
import OrderHistoryDetails from "../components/mypage/OrderHistoryDetails";

const Mypage = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<UserLogin />} />
                <Route path="/orderhistory" element={<OrderHistory />} />
                <Route path="/orderhistory/:orderId" element={<OrderHistoryDetails />} />
            </Routes>
        </div>
    );
};
    
export default Mypage;