import React from 'react';
import { useState } from 'react';

import ChatBot from './../../pages/mypage/ChatBot';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';


const ChatbotButton = () => {
    const [isChatBotModalOpen, setIsChatBotModalOpen] = useState(false);

    const openAndCloseChatbotModal = () => {
        setIsChatBotModalOpen(!isChatBotModalOpen);
    };

    return (
        <div style={{ position: 'fixed', bottom: '60px', right: '10px' }}>
            <ChatBubbleOutlineIcon style={{ width: '40px', height: '40px', margin: '0 10px', cursor: 'pointer' }} onClick={openAndCloseChatbotModal}/>

            {isChatBotModalOpen && <ChatBot closeModal={openAndCloseChatbotModal} />}
            <div style={{textAlign: 'center'}}>
                챗봇
            </div>
        </div>
    );
};

export default ChatbotButton;