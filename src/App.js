import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/common/Header';
import Home from './routes/Home';
import Footer from './components/common/Footer';
import { refreshTokenApi } from './lib/api/authApi'; 
import { getCookieToken } from './store/Cookie'; 
import { useSelector } from 'react-redux';


const App = () => {
  const user = useSelector(state => state.authUser.user); //리덕스에서 가져온 user정보
  useEffect(() => {

    if (user) {
      refreshTokenApi(); // 유저정보가 존재하는 경우에만 리프레시 토큰 검증 및 액세스 토큰 갱신 시도
    }
  }, []);

  return (
    <div style={{ background: 'black', color: 'white'}}>
      <Header />
      <Home />
      <Footer />
    </div>
  );
};


export default App;
  