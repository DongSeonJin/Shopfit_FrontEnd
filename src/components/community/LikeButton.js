import React, { useState, useEffect } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import styles from '../../styles/community/LikeButton.module.css'
import { useSelector } from 'react-redux';
import { authApi } from '../../lib/api/authApi';
import { useNavigate } from 'react-router';


const LikeButton = ({ postId }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const navigate = useNavigate();
    
     const userId = useSelector(state => state.authUser.userId); //리덕스에서 가져온 user정보
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 서버에서 좋아요 상태 가져오기
                const [likeResponse] = await Promise.all([
                    authApi.post(`/post/isLiked`, { postId: postId, userId })
                ]);

                setLikeCount(likeResponse.data.likeCnt);
                setIsLiked(likeResponse.data.isLiked === 1);
            } catch (error) {
                console.error('게시글 조회 실패 :', error);
            }
        };
        fetchData();
    }, [postId]);

    const handleLike = async (event) => {
        event.stopPropagation();
        try {

            if (!isLiked) {
                // 서버로 좋아요 요청 보내기
                await authApi.post('/post/like', { postId: postId, userId });

            } else {
                // 이미 누른거면 좋아요 취소 요청
                await authApi.delete(`/post/like/${postId}/${userId}`);

            }

            // 좋아요 성공 후 해당 포스트 정보 다시 가져오기
            const response = await authApi.post(`/post/isLiked`, { postId: postId, userId });
            
            setLikeCount(response.data.likeCnt);
            setIsLiked(!isLiked);
        } catch (error) {
            console.error('좋아요 실패:', error);

            if (error.response && error.response.status === 403) {
                alert('로그인이 필요한 기능입니다.');
                navigate('/login');
                return;
            }

            

        }
    };


    return (
        <div className="icons-list">
            {isLiked ? 
                <HeartFilled onClick={handleLike} className={styles['redButton']} /> :   // 좋아요를 누른 경우
                <HeartOutlined onClick={handleLike} className={styles['button']} /> // 좋아요를 누르지 않은 경우
            }
            <span> {likeCount}</span>
        </div>
    );
};

export default LikeButton;
