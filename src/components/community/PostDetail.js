import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios 추가
import { useParams, useHistory, useNavigate } from 'react-router-dom'; // useParams와 useHistory 추가
import styles from '../../styles/community/PostDetail.module.css';

const PostDetail = () => {
  const [data, setData] = useState({});
  const { postId } = useParams(); // postId를 URL 파라미터로 가져옴
  const navigate = useNavigate(); // useNavigate 이용하여 뒤로 가기 기능을 사용할 수 있음

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버에서 게시글 정보를 가져오는 요청 보내기
        const response = await axios.get(`/post/${postId}`);
        setData(response.data);
      } catch (error) {
        console.error('게시글 조회 실패:', error);
      }
    };
    fetchData();
  }, [postId]);

  const handleLike = async () => {
    try {
      // 서버로 좋아요 요청 보내기
      await axios.post('/post/like', { postId, userId: 1, nickname: '사용자 닉네임' });
      alert('좋아요 누르기 성공');
    } catch (error) {
      console.error('좋아요 실패:', error);
      alert('좋아요 실패');
    }
  };

  return (
    <>
      <h2 align="center">게시글 상세정보</h2>


      <div className="post-view-wrapper">
        {data.title ? (
          <>
            <div className="post-view-row">
              <label>게시글 번호:  </label>
              <label>{data.postId}</label>
            </div>
            <div className="post-view-row">
              <label>제목:  </label>
              <label>{data.title}</label>
            </div>
            <div className="post-view-row">
              <label>작성일:  </label>
              <label>{data.createDate}</label>
            </div>
            <div className="post-view-row">
              <label>조회수:  </label>
              <label>{data.viewCount}</label>
            </div>
            <div className="post-view-row">
              <label>내용:  </label>
              <div>{data.content}</div>
            </div>
            <button className="post-view-like-btn" onClick={handleLike}>
              좋아요
            </button>
          </>
        ) : (
          '해당 게시글을 찾을 수 없습니다.'
        )}
        <button className="post-view-go-list-btn" onClick={() => navigate.goBack()}>
          목록으로 돌아가기
        </button>
      </div>
    </>
  );
};

export default PostDetail;
