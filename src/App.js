import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/common/Header';
import Home from './routes/Home';
import Footer from './components/common/Footer';


import { refreshTokenApi } from './lib/api/authApi';
//eslint-disable-next-line
import { getCookieToken } from './store/Cookie';

import { useSelector } from 'react-redux';
import ChatbotButton from './components/common/ChatbotButton';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Spinner from './components/common/Spinner';
import { useLocation } from 'react-router-dom';


const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // route는 페이지 전환시에도 컴포넌트가 유지되므로 패이지 전환을 감지할 수 있게끔 해주는 메서드
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_KEY;

  useEffect(() => {

      refreshTokenApi(); // 유저정보가 존재하는 경우에만 리프레시 토큰 검증 및 액세스 토큰 갱신 시도

      setLoading(true); // 페이지 전환 시 loading 상태 true로 설정
      setTimeout(() => setLoading(false), 2000); // 일정 시간 후 loading 상태 false로 설정

    // eslint-disable-next-line
  }, [location]);

  return (
    <div style={{ background: 'black', color: 'white' }}>
      <GoogleOAuthProvider clientId={clientId}>
        {loading ? (
            <Spinner />
        ) : (
          <>
            <Header />
            <Home />
            <ChatbotButton />
            <Footer />
          </>
        )}
      </GoogleOAuthProvider>
    </div>
  );
};


export default App;
