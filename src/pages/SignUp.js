import React from 'react';
import SignupForm from '../components/auth/SignUpForm';
import { Route, Routes } from 'react-router';

const SignUp = () => {
    return (
        <div>
            <Routes>
                <Route path="/signUp" element={<SignupForm />} />
            </Routes>
        </div>
    );
};

export default SignUp;