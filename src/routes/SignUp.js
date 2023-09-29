import React from "react";
import SignupForm from "../pages/mypage/SignUpForm";
import UserLogin from "./../pages/mypage/UserLogin";
import { Route, Routes } from "react-router";

const SignUp = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>
  );
};

export default SignUp;
