import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../common/Modal';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(null); // 사용자 정보 상태 추가
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('/mypage/login', {
                email: email,
                password: password
            });
            
            if (response.data) {
                setUser(response.data); // 로그인 성공 시 사용자 정보 업데이트
                console.log('로그인 성공:', response.data);
                navigate('/');
            }

        } catch (error) {
            console.error('로그인 실패:', error);
            setErrorMessage('로그인에 실패했습니다. 다시 시도해주세요.');
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
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={handlePasswordChange}
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

            {user && (
                <div>
                    <p>로그인한 사용자 정보:</p>
                    <p>이름: {user.name}</p>
                    <p>이메일: {user.email}</p>
                </div>
            )}

        </div>
    );
};

export default UserLogin;
