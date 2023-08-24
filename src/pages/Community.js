import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import PostCreate from '../components/community/PostCreate';
import PostList1 from '../components/community/PostList1';
import PostList2 from '../components/community/PostList2';
import PostList3 from '../components/community/PostList3';
import PostDetail from '../components/community/PostDetail';

const Community = () => {
    return (
        <div>
          <p>커뮤니티 메인 페이지 (자유게시판 글 출력)</p>

          <Link to="/post/create">
            <button>글 작성</button>
          </Link>
          
          <Routes>
                <Route path="/post/list/1" element={<PostList1 />} />
                <Route path="/post/list/2" element={<PostList2 />} />
                <Route path="/post/list/3" element={<PostList3 />} />
                <Route path='/post/{postId}' element={<PostDetail />} />
            </Routes>
          
        </div>
    );
}

export default Community;