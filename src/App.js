import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/common/Header';
import Home from './routes/Home';
import Footer from './components/common/Footer';
import './axiosConfig';


import { refreshTokenApi } from './lib/api/authApi';
//eslint-disable-next-line
import { getCookieToken } from './store/Cookie';

import { useSelector } from 'react-redux';
import ChatbotButton from './components/common/ChatbotButton';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useLocation } from 'react-router-dom';

import styles from './App.module.css';


const App = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_KEY;


  useEffect(() => {
    refreshTokenApi(); // 유저정보가 존재하는 경우에만 리프레시 토큰 검증 및 액세스 토큰 갱신 시도
  }, [])


  return (
    <div className={styles.background}> {/* 모듈 스타일 적용 */}
      <GoogleOAuthProvider clientId={clientId}>
          <Header />
          <Home />
          <ChatbotButton />
          <Footer />
      </GoogleOAuthProvider>
    </div>
  );
};


export default App;
