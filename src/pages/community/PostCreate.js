import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import PostFileUploadComponent from "../../components/community/PostFileUploadComponent";
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import styles from '../../styles/community/PostCreate.module.css';
// import { useForm, Controller } from 'react-hook-form'

const PostCreate = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [nickname, setNickname] = useState('');
    const userId = 1;
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

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    }

    const handleUploadSuccess =(url) => {
        setImageUrl1(url);
        setImageUrl2(url);
        setImageUrl3(url);
    }

    const handleDeleteImage = (imageIndex) => {
        switch (imageIndex) {
          case 1:
            setImageUrl1(null);
            break;
          case 2:
            setImageUrl2(null);
            break;
          case 3:
            setImageUrl3(null);
            break;
          default:
            break;
        }
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
                setNickname('');
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2>글 작성 페이지</h2>
            <form onSubmit={handleSubmit} style={{ width: '80%', marginTop: 20 }}>


                <div style={{fontWeight: 'bold', marginBottom: '5px'}}>작성자</div>
                <TextField
                    label="작성자"
                    value={nickname}
                    onChange={handleNicknameChange}
                    fullWidth
                    variant='outlined'
                    style={{backgroundColor: 'white', borderRadius: '5px', marginBottom: '20px', width: '100%'}}
                />

                <div style={{fontWeight: 'bold', marginBottom: '5px'}}>카테고리</div>
                {/* <FormControl fullWidth style={{ marginTop: 20 }}> */}
                <Select
                    labelId="category-label"
                    value={category}
                    onChange={handleCategoryChange}
                    style={{backgroundColor: 'white', borderRadius: '5px', marginBottom: '20px', width: '100%'}}
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
                {/* </FormControl> */}

                {/* 제목 입력 필드 */}
                <div style={{fontWeight: 'bold', marginBottom: '5px'}}>제목</div>
                <TextField 
                  label="제목" 
                  value={title} 
                  onChange={handleTitleChange} 
                  fullWidth 
                  variant='outlined'
                  style={{backgroundColor: 'white', borderRadius: '5px', marginBottom: '20px', width: '100%'}} />

                {/* 내용 입력 필드 */}
                <div style={{fontWeight: 'bold', marginBottom: '5px'}}>내용</div>
                <TextField
                  label="내용"
                  multiline
                  rows={7}
                  value={content} 
                  onChange= {handleContentChange}  
                  fullWidth

                  variant='outlined'
                  style={{backgroundColor: 'white', borderRadius: '5px', marginBottom: '20px', width: '100%'}} />

               {/* 이미지 업로드*/}
               <div style={{ display:'flex', justifyContent:'space-between', marginTop: 20}}>
                   {[1,2,3].map((item) => (
                      
                       <>
                           <PostFileUploadComponent onUploadSuccess={(url) => handleUploadSuccess(url,item)} />
                           {/*<button onClick={() => handleDeleteImage(item)}>Delete Image{item}</button>*/}
                       </>
                   ))}
               </div>

               {/* 등록 버튼 */}
               <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                <Button variant="contained" color="primary" type='submit' style={{marginTop:'20px'}}>
                    등록
                </Button>
               </div>
            </form>
        </div>
    );

};

export default PostCreate;