import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../lib/api/authApi'
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';
import Modal from './../../components/common/modal/Modal';

import { setRefreshToken } from '../../store/Cookie';
import { SET_TOKEN } from '../../redux/AuthReducer';
import { SET_USER } from '../../redux/UserReducer';
import GoogleLoginButton from '../../components/oauth2/GoogleLoginButton';

const UserLogin = () => {
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value);
    // };

    // const handlePasswordChange = (e) => {
    //     setPassword(e.target.value);
    // };

    const handleChange = async (e) => {
        setValues({
            ...values, [e.target.id]: e.target.value,
        })
    }



    const handleLogin = async (e) => {
        if (!values.email && !values.password) {
            setErrorMessage('이메일과 비밀번호를 입력해주세요.');
            setErrorModalOpen(true);
            return; // Don't proceed further
        }

        if (!values.email) {
            setErrorMessage('이메일을 입력해주세요.');
            setErrorModalOpen(true);
            return;
        }

        if (!values.password) {
            setErrorMessage('비밀번호를 입력해주세요.');
            setErrorModalOpen(true);
            return;
        }

        try {
            const response = await login(values);

            console.log('Response:', response); // Add this line to debug the response

            if (response) {

                dispatch(SET_USER(response)); // 로그인 성공 시 사용자 정보 업데이트
                // 쿠키에 Refresh Token, store에 Access Token 저장
                setRefreshToken(response.refreshToken);
                dispatch(SET_TOKEN(response.accessToken));
                console.log('로그인 성공:');

                navigate('/');
            }

        } catch (error) {
            console.error('로그인 실패:', error);
            setErrorMessage('이메일 또는 비밀번호를 확인해 주십시오.');
            setErrorModalOpen(true);
        }
    };

    const handleHome = async () => {
        navigate('/');
    };

    const handleCloseModal = () => {
        setErrorModalOpen(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '1420px', width: '100%', minHeight: `calc(100vh - 720px)`, margin: '0 auto 150px' }}>

            <div style={{ width: '360px', alignContent: 'center' }}>

                <div style={{ display: 'flex', width: '240px', cursor: 'pointer', marginLeft: '20px' }} onClick={handleHome}>
                    <div style={{ flex: "1" }}>
                        <img src="https://kr.object.ncloudstorage.com/post-bucket/imageslide/%23fit%20%281%29.gif" alt="slide_img" style={{ width: "120px", height: "120px" }} />
                    </div>
                    <div style={{ flex: '2', fontSize: '36px', fontWeight: 'bold', textAlign: 'center', lineHeight: '120px' }}>샵피트</div>
                </div>


                <div>
                    <input
                        type="text"
                        placeholder="이메일"
                        value={values.email}
                        id="email"
                        onChange={handleChange}
                        style={{ paddingLeft: '10px', width: '360px', height: '60px', margin: '5px 0', borderRadius: '10px' }}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={values.password}
                        id="password"
                        onChange={handleChange}
                        style={{ paddingLeft: '10px', width: '360px', height: '60px', margin: '5px 0', borderRadius: '10px' }}
                    />
                </div>
                <Button onClick={handleLogin} variant="outlined" style={{ width: '360px', height: '60px', textAlign: 'center', margin: '20px 0', borderRadius: '10px', fontSize: '24px' }}>로그인</Button>

                <div style={{ display: 'flex' }}>
                    <div style={{ flex: '1', textAlign: 'center' }}>
                        <Link to='http://localhost:3000/mypage/edit/password' style={{ textDecoration: 'none', color: 'white' }}>비밀번호 재설정</Link>
                    </div>
                    <div style={{ flex: '1', textAlign: 'center', borderLeft: '1px solid white' }}>
                        <Link to='http://localhost:3000/signup' style={{ textDecoration: 'none', color: 'white' }}>회원가입</Link>
                    </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <GoogleLoginButton />
                </div>


                {errorModalOpen && (
                    <Modal
                        errorMessage={errorMessage}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </div>
    );
};

const mapDispatchToProps = {
    SET_USER,
    SET_TOKEN
};

export default connect(null, mapDispatchToProps)(UserLogin);