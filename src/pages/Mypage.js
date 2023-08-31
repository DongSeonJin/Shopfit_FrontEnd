import React from "react";
import { Route, Routes } from 'react-router-dom';

import UserLogin from "../components/mypage/UserLogin";

const Mypage = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<UserLogin />} />
            </Routes>
        </div>
    );
};
    
export default Mypage;