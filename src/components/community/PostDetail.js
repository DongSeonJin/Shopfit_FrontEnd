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
        setData({
          ...response.data,
          imageUrls: [
            response.data.imageUrl1, 
            response.data.imageUrl2, 
            response.data.imageUrl3]});
      } catch (error) {
        console.error('게시글 조회 실패 :', error);
      }
    };
    fetchData();
  }, [postId]);

  const handleLike = async () => {
    try {
      // 서버로 좋아요 요청 보내기
      await axios.post('/post/like', { postId: data.postId, userId:1, nickname:'사용자 닉네임'});
      alert('좋아요 누르기 성공');

      // 좋아요 성공 후 해당 포스트 정보 다시 가져오기
      const response = await axios.get(`/post/${postId}`);

      // 가져온 데이터를 통해 상태 갱신
      setData(response.data);
    } catch (error) {
      console.error('좋아요 실패:', error);
      alert('좋아요 실패');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/post/delete/${postId}`);
      alert('게시글이 삭제되었습니다.');
      navigate('/community/post/list'); // 삭제 후 목록으로 돌아가기
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  return (
    <>
      <h2 align="center">게시글 상세정보</h2>

      <div className="post-view-wrapper">
        {data.postId ? (
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
                  <TableCell>{data.createdAt}</TableCell>
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
                  <TableCell>제목</TableCell>
                  <TableCell>{data.title}</TableCell>
                </TableRow>
              </TableBody>

              <TableBody>
                <TableRow>
                  <TableCell>내용</TableCell>
                  <TableCell>{data.content}</TableCell>
                </TableRow>
              </TableBody>
              
            </Table>

            {data.imageUrls.map((imageUrl, index) =>
              imageUrl && (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`첨부이미지${index + 1}`}
                  style={{ width: '500px', height: '500px' }}
                />
              )
            )}

            {/* {data.imageUrl1 && (
              <img src={data.imageUrl1} alt="첨부이미지1" style={{width: '500px', height: '500px'}} />
            )}
            {data.imageUrl2 && (
              <img src={data.imageUrl2} alt="첨부이미지2" style={{width: '500px', height: '500px'}} />
            )}
            {data.imageUrl3 && (
              <img src={data.imageUrl3} alt="첨부이미지3" style={{width: '500px', height: '500px'}} />
            )} */}

            <br /><br /><br />

            
            <LikeIcon onClick={handleLike} style={{color:'red', cursor: 'pointer'}} />

            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/community/post/list')}
              style={{ marginTop: '10px' }}
            > 목록으로 돌아가기 </Button>

            {data.postId && (  // postId 가 존재할 때만 버튼 보이기
              <>
              <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/community/post/update/${postId}`} // 수정 페이지 경로로 이동
                  style={{ marginTop: '10px', marginLeft: '10px' }}
              > 수정하기 </Button>

              <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    onClick={handleDelete}
                    style={{ marginTop: '10px', marginLeft: '10px' }}
              > 삭제하기 </Button>
              </>
            )}
          
          </>
        ) : (
          '' // 해당 게시글을 찾을 수 없습니다.
        )}

      
        

        

    

      </div>
    </>
  );
};

export default PostDetail;
