import React, { Component } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import PostCreate from '../components/community/PostCreate';
import PostDetail from '../components/community/PostDetail';
import PostList from '../components/community/PostList';

const Community = () => {
  const location = useLocation();
  const showWriteButton = location.pathname !== "/post/create"; // useLocation 훅을 사용하여 /post/create 가 아닐 때에만 '글 작성' 버튼 보이도록 하기 
    return (
        <div>
          <p>커뮤니티 메인 페이지 (자유게시판 글 출력)</p>

          { showWriteButton &&
            <Link to="/post/create">
              <button>글 작성</button>
            </Link>
          }     
          
          <Routes>
              
                <Route path="/post/list/:categoryId" element={<PostList />} />
                <Route path="/post/:postId" element={<PostDetail />} />
                <Route path='/post/create' element={<PostCreate />} />
                
            </Routes>
          
        </div>
    );
}

export default Community;