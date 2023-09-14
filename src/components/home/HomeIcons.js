import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChatBot from '../../pages/mypage/ChatBot';


const HomeIcons = () => {

    const [isChatBotModalOpen, setIsChatBotModalOpen] = useState(false);

    const openAndCloseChatbotModal = () => {
        setIsChatBotModalOpen(!isChatBotModalOpen);
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5% 20%'}}>
            
            <Link to="/shopping/wishlist">
                <StarIcon style={{ width: '60px', height: '60px', margin: '0 10px 0 10px'}} />
            </Link>

            <Link to="/shopping/cart">
                <ShoppingCartIcon style={{ width: '60px', height: '60px', margin: '0 10px 0 10px' }} />
            </Link>

            {/* <button onClick={openAndCloseChatbotModal}> */}
                <ChatBubbleOutlineIcon style={{ width: '60px', height: '60px', margin: '0 10px' }} onClick={openAndCloseChatbotModal}/>
            {/* </button> */}

            {/* 챗봇 모달 */}
            {isChatBotModalOpen && <ChatBot closeModal={openAndCloseChatbotModal} />}


        </div>
      
    );
};

export default HomeIcons;
