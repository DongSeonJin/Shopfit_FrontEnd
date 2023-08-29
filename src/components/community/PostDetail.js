import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios 추가

import { useParams, useNavigate, Link } from 'react-router-dom'; // useParams와 useHistory 추가

import styles from '../../styles/community/PostDetail.module.css';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { Button } from '@material-ui/core'
import LikeIcon from '@material-ui/icons/Favorite';
import UpdateIcon from '@material-ui/icons/Edit';



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
        console.error('게시글 조회 실패 :', error);
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
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>게시글 번호</TableCell>
                  <TableCell>{data.postId}</TableCell>
                </TableRow>
              </TableBody>

              <TableBody>
                <TableRow>
                  <TableCell>작성자</TableCell>
                  <TableCell>{data.nickname}</TableCell>
                </TableRow>
              </TableBody>

              <TableBody>
                <TableRow>
                  <TableCell>작성일</TableCell>
                  <TableCell>{data.createDate}</TableCell>
                </TableRow>
              </TableBody>

              <TableBody>
                <TableRow>
                  <TableCell>조회수</TableCell>
                  <TableCell>{data.viewCount}</TableCell>
                </TableRow>
              </TableBody>

              <TableBody>
                <TableRow>
                  <TableCell>내용</TableCell>
                  <TableCell>{data.content}</TableCell>
                </TableRow>
              </TableBody>
              
            </Table>

            {data.imageUrl1 && (
              <img src={data.imageUrl1} alt="첨부이미지1" />
            )}
            {data.imageUrl2 && (
              <img src={data.imageUrl2} alt="첨부이미지2" />
            )}
            {data.imageUrl3 && (
              <img src={data.imageUrl3} alt="첨부이미지3" />
            )}
            <br /><br /><br />
            
            <LikeIcon onClick={handleLike} style={{color:'red', cursor: 'pointer'}} />
            <UpdateIcon
              component={Link}
              to={`/post/${postId}`}
              style={{ color: 'blue', cursor: 'pointer', marginLeft: '10px' }}
            />
          </>
        ) : (
          '해당 게시글을 찾을 수 없습니다.'
        )}

      
        <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(-1)}
              style={{ marginTop: '10px' }}
        > 목록으로 돌아가기 </Button>

        <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/post/update/${postId}`} // 수정 페이지 경로로 이동
              style={{ marginTop: '10px', marginLeft: '10px' }}
        > 수정하기 </Button>


      </div>
    </>
  );
};

export default PostDetail;
