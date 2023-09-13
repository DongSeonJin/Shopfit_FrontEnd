import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions'
import { login } from '../../components/auth/authApi'
import axios from 'axios';

import Modal from './../../components/common/modal/Modal';

const UserLogin = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
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
        setValues({...values,[e.target.id]: e.target.value,
        })
    }

    const handleLogin = async (e) => {
        // try {
            login(values)
            .then((response) => {
                localStorage.clear();
                localStorage.setItem('tokenType', response.tokenType);
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);
                window.location.href = `/`;
            }).catch((error) => {
                console.error('로그인 실패:', error);
                setErrorMessage('이메일 또는 비밀번호를 확인해 주십시오.');
                setErrorModalOpen(true);
            })
            // const response = await axios.post('/login', {
            //     email: email,
            //     password: password
            // });
            
            // if (response.data) {
            //     setUser(response.data); // 로그인 성공 시 사용자 정보 업데이트
            //     console.log('로그인 성공:', response.data);
            //     navigate('/');
            // }

        // } catch (error) {
            // console.error('로그인 실패:', error);
            // setErrorMessage('이메일 또는 비밀번호를 확인해 주십시오.');
            // setErrorModalOpen(true);
        // }
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