import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions'
import axios from 'axios';

import Modal from './../../components/common/modal/Modal';
import { Button } from '@mui/material';

const UserLogin = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('/login', {
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
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width:'100%', minHeight: `calc(100vh - 720px)`}}>
            <div style={{width: '360px', alignContent: 'center'}}>
                <div style={{display: 'flex', width: '240px', cursor: 'pointer', marginLeft: '20px'}} onClick={handleHome}>
                    <div style={{flex: "1"}}>
                        <img src="https://kr.object.ncloudstorage.com/post-bucket/imageslide/%23fit%20%281%29.gif" alt="slide_img" style={{width:"120px", height:"120px"}}/>
                    </div>
                    <div style={{flex: '2', fontSize: '36px', fontWeight: 'bold', textAlign: 'center', lineHeight: '120px' }}>샵피트</div>
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="이메일"
                        value={email}
                        onChange={handleEmailChange}
                        style={{paddingLeft: '10px',width: '360px', height: '60px', margin: '5px 0', borderRadius: '10px'}}
                    />
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={handlePasswordChange}
                        style={{paddingLeft: '10px', width: '360px', height: '60px', margin: '5px 0', borderRadius: '10px'}}
                    />
                </div>

                <Button onClick={handleLogin} variant="outlined" style={{width: '360px', height: '60px', textAlign: 'center', margin: '20px 0', borderRadius: '10px', fontSize: '24px'}}>로그인</Button>

                <div style={{display: 'flex'}}>
                    <div style={{flex: '1', textAlign: 'center'}}>
                        <Link to='http://localhost:3000/resetpassword' style={{textDecoration: 'none', color: 'white'}}>비밀번호 재설정</Link>
                    </div>
                    <div style={{flex: '1', textAlign: 'center', borderLeft: '1px solid white'}}>
                        <Link to='http://localhost:3000/signup' style={{textDecoration: 'none', color: 'white'}}>회원가입</Link>
                    </div>
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
    setUser,
  };

export default connect(null, mapDispatchToProps)(UserLogin);