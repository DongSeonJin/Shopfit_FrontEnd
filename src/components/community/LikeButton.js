import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LikeIcon from '@material-ui/icons/Favorite';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import styles from '../../styles/community/LikeButton.module.css'


const LikeButton = ({ postId }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const userId = 1; // 시큐리티 적용 전 테스트용 userId 1

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 서버에서 좋아요 상태 가져오기
                const [likeResponse] = await Promise.all([
                    axios.post(`/post/like`, { postId: postId, userId })
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
                await axios.post('/post/like/add', { postId: postId, userId });

            } else {
                // 이미 누른거면 좋아요 취소 요청
                await axios.post('/post/like/delete', { postId: postId, userId });

            }

            // 좋아요 성공 후 해당 포스트 정보 다시 가져오기
            const response = await axios.post(`/post/like`, { postId: postId, userId });
            
            setLikeCount(response.data.likeCnt);
            setIsLiked(!isLiked);
        } catch (error) {
            console.error('좋아요 실패:', error);

            if (error.response && error.response.status === 404) {
                alert('로그인이 필요한 기능입니다.');
                return;
            }

            if (error.response && error.response.status === 400) {
                alert("이미 '좋아요'를 누른 상태입니다.");
                return;
            }

            

        }
    };


    return (
        <>
            <div className="icons-list">
            {isLiked ? 
                <HeartFilled onClick={handleLike} className={styles['redButton']} /> : // 좋아요를 누른 경우
                <HeartOutlined onClick={handleLike} className={styles['button']} /> // 좋아요를 누르지 않은 경우
            }
            <span>{likeCount}</span>
            </div>
        </>
    );
};

export default LikeButton;
