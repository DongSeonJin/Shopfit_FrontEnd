import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import PostFileUploadComponent from "../../components/community/PostFileUploadComponent";
import { Button, TextField } from '@material-ui/core';

// import styles from '../../styles/community/PostCreate.module.css';


const PostCreate = () => {
    const userId = useSelector(state => state.authUser.userId);
    const nickname = useSelector(state => state.authUser.nickname);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl1, setImageUrl1] = useState('');
    const [imageUrl2, setImageUrl2] = useState('');
    const [imageUrl3, setImageUrl3] = useState('');

    
    const categories = [
        { id: 1, name: '오운완' },
        { id: 2, name: '식단' },
    ];

    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 서버로 보낼 데이터 구성
        const postData = {
            user: {userId: userId},
            title: title,
            content: content,
            nickname: nickname,
            postCategory: {categoryId: category},
            imageUrl1: imageUrl1,
            imageUrl2: imageUrl2,
            imageUrl3: imageUrl3
        };

        if (!title && !content) {
            alert("제목, 내용을 입력해주세요.");
        } else if (!title) {
            alert ("제목을 입력해주세요.");
        } else if (!content) {
            alert ("내용을 입력해주세요.");
        } else if (!imageUrl1) {
            alert("사진을 한 장 이상 등록해주세요.");
        } else {

            try {
                // '/post' 경로에 post 요청 보내기
                await axios.post('/post',postData, {
                    headers: {
                        'Content-Type': 'application/json' // 파일 업로드 시 Content-Type 설정
                    }
                });

                alert('게시글이 등록되었습니다.');

                // 입력 필드 초기화
                setTitle('');
                setContent('');
                setImageUrl1('');
                setImageUrl2('');
                setImageUrl3('');

                // 게시글 리스트로 이동
                navigate(`/community/post/list/${category}`);
            } catch (error) {
                console.error('게시글 등록 실패', error);
                alert('게시글 등록에 실패했습니다.');
            }
        }

    }; 

    return (
        <div style={{maxWidth: '1080px', width: '100%', margin: '0 auto 150px'}}>
            
            <div style={{textAlign: 'center', height: '54px', marginBottom: '50px', fontSize: '28px', fontWeight: 'bold'}}>게시글 작성</div>

            <form onSubmit={handleSubmit} style={{ width: '80%', minWidth: '720px', margin: '0 auto'}}>

                <div style={{display: 'flex'}}>
                    <div style={{flex: '1', paddingRight: '5px'}}>
                        <div style={{fontWeight: 'bold', marginBottom: '10px'}}>카테고리</div>
                        {/* <FormControl fullWidth style={{ marginTop: 20 }}> */}
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
                        {/* 작성자 닉네임 고정 */}
                        <TextField
                            value={nickname}
                            fullWidth
                            variant='outlined'
                            style={{backgroundColor: 'white', borderRadius: '5px', marginBottom: '20px', width: '100%'}}
                        />
                    </div>
                </div>
                {/* </FormControl> */}

                {/* 제목 입력 필드 */}
                <div style={{fontWeight: 'bold', marginBottom: '10px'}}>제목</div>
                <TextField 
                  value={title} 
                  onChange={handleTitleChange} 
                  fullWidth 
                  variant='outlined'
                  style={{backgroundColor: 'white', borderRadius: '5px', marginBottom: '20px', width: '100%'}} />

                {/* 내용 입력 필드 */}
                <div style={{fontWeight: 'bold', marginBottom: '10px'}}>내용</div>
                <TextField
                  multiline
                  rows={10}
                  value={content} 
                  onChange= {handleContentChange}  
                  fullWidth

                  variant='outlined'
                  style={{backgroundColor: 'white', borderRadius: '10px', marginBottom: '20px', width: '100%'}} />

               {/* 이미지 업로드*/}
               <div style={{ display:'flex', justifyContent:'space-between'}}>
                    <div style={{width: '30%'}}>
                        <PostFileUploadComponent onUploadSuccess={(url) => setImageUrl1(url)} />
                    </div>
                    <div style={{width: '30%'}}>
                        <PostFileUploadComponent onUploadSuccess={(url) => setImageUrl2(url)} />
                    </div>
                    <div style={{width: '30%'}}>
                        <PostFileUploadComponent onUploadSuccess={(url) => setImageUrl3(url)} />
                    </div>
               </div>

               {/* 등록 버튼 */}
               <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                <Button variant="contained" color="primary" type='submit' style={{marginTop:'20px', width: '120px', height: '40px'}}>
                    등록
                </Button>
               </div>
            </form>
        </div>
    );

};

export default PostCreate;