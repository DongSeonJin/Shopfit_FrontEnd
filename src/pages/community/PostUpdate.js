import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import PostFileUploadComponent from "../../components/community/PostFileUploadComponent";
import { Button, TextField, } from '@material-ui/core';

// import styles from '../../styles/community/PostCreate.module.css';


const PostUpdate = () => {
  const nickname = useSelector(state => state.authUser.nickname);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [imageUrl3, setImageUrl3] = useState('');
  
  const { postId } = useParams();
  
  const categories = [
      { id: 1, name: '오운완' },
      { id: 2, name: '식단' },
  ];
  
  const navigate = useNavigate();

  // 기존 게시글 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버에서 게시글 정보를 가져오는 요청 보내기
        let response;
        response= await axios.get(`/post/${postId}`);
        
        setTitle(response.data.title);
        setContent(response.data.content);
        setCategory(response.data.category);
        setImageUrl1(response.data.imageUrl1);
        setImageUrl2(response.data.imageUrl2);
        setImageUrl3(response.data.imageUrl3);

      } catch (error) {
        console.error('게시글 가져오기 실패:', error);
      }
    };
      
    fetchData();
      
  },[postId]);

  const handleSubmit=async (e)=>{
    e.preventDefault();
    console.log("버튼 눌림");
        
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('category', category);
    postData.append('nickname', nickname);  
    postData.append ('imageUrl1', imageUrl1);
    postData.append ('imageUrl2', imageUrl2);        
    postData.append ('imageUrl3', imageUrl3);   
        
    try{
      const response = await axios.put(`/post/${postId}`,postData,{
        headers:{
          "Content-Type": "application/json"
        }
      });

      console.log(response);
          
      alert("게시글이 수정되었습니다.");

      // 입력 필드 초기화
      setTitle('');
      setContent('');
      setImageUrl1('');
      setImageUrl2('');
      setImageUrl3('');
      
      navigate(`/community/post/${postId}`);
          
    } catch(error){
      console.error("게시글 수정 실패:",error);
      
      if(error.response && error.response.status === 404) {
      alert('존재하지 않는 게시글입니다.');
      return;
      }

      alert("다시 시도해주세요.");
    }
  }

  return (
    <div style={{maxWidth: '1080px', width: '100%', margin: '0 auto 150px'}}>

      <div style={{textAlign: 'center', height: '54px', marginBottom: '50px', fontSize: '28px', fontWeight: 'bold'}}>게시글 수정</div>

      <form onSubmit={handleSubmit} style={{ width: '80%', minWidth: '720px', margin: '0 auto'}}>
        {/* 카테고리 선택 필드 */}
        <div style={{display: 'flex'}}>
          <div style={{flex: '1', paddingRight: '5px'}}>
            <div style={{fontWeight: 'bold', marginBottom: '10px'}}>카테고리</div>
            <select
              labelId="category-label"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{backgroundColor: 'white', borderRadius: '5px', marginBottom: '20px', width: '100%', padding: '0 20px', height: '56px'}}
            >
              <option value="">카테고리를 선택하세요</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div style={{flex: '1', paddingLeft: '5px'}}>
            <div style={{fontWeight: 'bold', marginBottom: '10px'}}>작성자</div>
            <TextField
                value={nickname}
                fullWidth
                variant='outlined'
                style={{backgroundColor: 'white', borderRadius: '5px', marginBottom: '20px', width: '100%'}}
            />
          </div>
        </div>

        <div style={{fontWeight: 'bold', marginBottom: '10px'}}>제목</div>
        <TextField 
          fullWidth 
          variant="outlined" 
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{backgroundColor: 'white', borderRadius: '5px', marginBottom: '20px', width: '100%'}}
        />

        <div style={{fontWeight: 'bold', marginBottom: '10px'}}>내용</div>
        <TextField
          fullWidth
          variant='outlined'
          multiline
          rows={10}
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          style={{backgroundColor: 'white', borderRadius: '10px', marginBottom: '30px', width: '100%'}}
        />

        <div style={{ display:'flex', justifyContent:'space-between'}}>
          <div style={{ width: '30%'}}>
            {imageUrl1 ? (
              <div>
                <div>
                  <div alt="첨부이미지1" style={{backgroundImage: `url(${imageUrl1})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '0', paddingBottom: '100%', objectFit: 'cover', border: '1px solid white', borderRadius: '10px', marginBottom: '20px'}}/>
                </div>
                <div style={{ textAlign: 'center'}}>
                  <Button variant='outlined' color='secondary' onClick={() => setImageUrl1('')} style={{ width: '80px'}}>삭제</Button>
                </div>
              </div>
            ) : (
              <PostFileUploadComponent onUploadSuccess={(url) => setImageUrl1(url)} />
            )}
          </div>

          <div style={{ width: '30%'}}>
            {imageUrl2 ? (
              <div>
                <div>
                  <div alt="첨부이미지2" style={{backgroundImage: `url(${imageUrl2})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '0', paddingBottom: '100%', objectFit: 'cover', border: '1px solid white', borderRadius: '10px', marginBottom: '20px'}}/>
                </div>
                <div style={{ textAlign: 'center'}}>
                  <Button variant='outlined' color='secondary' onClick={() => setImageUrl2('')} style={{ width: '80px'}}>삭제</Button>
                </div>
              </div>
            ) : (
              <PostFileUploadComponent onUploadSuccess={(url) => setImageUrl2(url)} />
            )}
          </div>

          <div style={{ width: '30%'}}>
            {imageUrl3 ? (
              <div>
                <div>
                  <div alt="첨부이미지3" style={{backgroundImage: `url(${imageUrl3})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '0', paddingBottom: '100%', objectFit: 'cover', border: '1px solid white', borderRadius: '10px', marginBottom: '20px'}}/>
                </div>
                <div style={{ textAlign: 'center'}}>
                  <Button variant='outlined' color='secondary' onClick={() => setImageUrl3('')} style={{ width: '80px'}}>삭제</Button>
                </div>
              </div>
            ) : (
              <PostFileUploadComponent onUploadSuccess={(url) => setImageUrl3(url)} />
            )}
          </div>

        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
          <Button variant='contained' color='primary' type='submit' style={{marginTop:'20px', width: '120px', height: '40px'}}>
            수정하기
          </Button>
        </div>
      </form>
    </div>  
  );
};

export default PostUpdate;
