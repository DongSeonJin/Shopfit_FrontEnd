import React, { useState } from 'react';
import axios from 'axios';
import  "../../styles/community/PostCreate.module.css";

const PostCreate = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const categories = [
        {id:1, name:'자유게시판'},
        {id:2, name:'오운완'},
    ];

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 서버로 보낼 데이터 구성
        const postData = {
            title: title,
            content: content,
            categoryName: category
        };
        
        try {
            // '/post/create' 경로에 post 요청 보내기
            await axios.post('/post/create', postData);
            
            alert('게시글이 저장되었습니다.');
            
            // 입력 필드 초기화
            setTitle('');
            setContent('');
            setCategory('');
            
        } catch (error) {
          console.error("There was an error!", error);
          alert('게시글 저장에 실패했습니다.');
      }
  };

  return (
      <div>
          <h2>글 작성 페이지</h2>
          <form onSubmit={handleSubmit}>
            <label> 
                카테고리:
                <select value={category} onChange={handleCategoryChange}>
                    {/* 각각의 option은 각각의 category를 나타냄 */}
                    {categories.map((category) =>
                        (<option key={category.id} value={category.id}>{category.name}</option>)
                    )}
                </select>
            </label>
            <br />
            
            <label>
                제목:
                <input type="text" value={title} onChange={handleTitleChange} />
            </label>
            <br />

            <label>
                내용:
                <textarea value={content} onChange={handleContentChange} />
            </label>
            <br />
            
            <br />
            <input type="submit" value="제출" />
          </form>
      </div>
  );
};

export default PostCreate;
