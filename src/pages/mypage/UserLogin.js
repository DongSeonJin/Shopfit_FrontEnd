import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions'
import { login } from '../../lib/api/authApi'
import axios from 'axios';
import { useDispatch } from 'react-redux';

import Modal from './../../components/common/modal/Modal';

import { setRefreshToken } from '../../store/Cookie';
import { SET_TOKEN } from '../../redux/AuthReducer';

const UserLogin = ({ setUser }) => {
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
        try {

            // try {
            //     login(values)
            //         .then((response) => {

            //                 setUser(response.data); // 로그인 성공 시 사용자 정보 업데이트
            //                 // 쿠키에 Refresh Token, store에 Access Token 저장
            //                 setRefreshToken(response.json.refreshToken);
            //                 dispatch(SET_TOKEN(response.json.accessToken));
            //                 console.log(response.json.accessToken);

            //                 navigate('/');



            //         })
            // } catch (error) {
            //     console.error('로그인 실패:', error);
            //     setErrorMessage('이메일 또는 비밀번호를 확인해 주십시오.');
            //     setErrorModalOpen(true);
            // }
            const response = await login(values);

            console.log('Response:', response); // Add this line to debug the response

            if (response) {
                    
                setUser(response.data); // 로그인 성공 시 사용자 정보 업데이트
                // 쿠키에 Refresh Token, store에 Access Token 저장
                setRefreshToken(response.refreshToken);
                dispatch(SET_TOKEN(response.accessToken));
                console.log(response.accessToken);
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
        <div style={{ textAlign: 'center', margin: '10% 20%' }}>
            <h2>로그인 페이지</h2>
            <div>
                <input
                    type="text"
                    placeholder="이메일"
                    value={values.email}
                    id="email"
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={values.password}
                    id="password"
                    onChange={handleChange}
                />
            </div>
            <button onClick={handleLogin}>로그인</button>
            <button onClick={handleHome}>홈으로</button>

            {errorModalOpen && (
                <Modal
                    errorMessage={errorMessage}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

const mapDispatchToProps = {
    setUser,
};

export default connect(null, mapDispatchToProps)(UserLogin);