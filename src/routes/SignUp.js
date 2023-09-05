import React from 'react';
import SignupForm from '../pages/oauth/SignUpForm';
import { Route, Routes } from 'react-router';

const SignUp = () => {
    return (
        <div>
            <Routes>
                <Route path="/signup" element={<SignupForm />} />
            </Routes>
        </div>
    );
};

export default SignUp;