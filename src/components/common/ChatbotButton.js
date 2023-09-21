import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import ChatBot from './../../pages/mypage/ChatBot';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { Link } from 'react-router-dom';


const ChatbotButton = () => {
    const userId = useSelector(state => state.authUser.userId);
    const userAuthority = useSelector(state => state.authUser.authority);

    const [isChatBotModalOpen, setIsChatBotModalOpen] = useState(false);

    const openAndCloseChatbotModal = () => {
        setIsChatBotModalOpen(!isChatBotModalOpen);
    };

    return (
        <div style={{ position: 'fixed', bottom: '60px', right: '10px' }}>
            {/* 삭제 예정 */}
            <div>{userId}</div>
            <div>{userAuthority}</div>
            <div>
                <Link to='/login'>로그인페이지</Link>
            </div>

            <ChatBubbleOutlineIcon style={{ width: '40px', height: '40px', margin: '0 10px', cursor: 'pointer' }} onClick={openAndCloseChatbotModal}/>

            {isChatBotModalOpen && <ChatBot closeModal={openAndCloseChatbotModal} />}
            <div style={{textAlign: 'center'}}>
                챗봇
            </div>
        </div>
    );
};

export default ChatbotButton;