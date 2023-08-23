import React from 'react';
import { Link } from 'react-router-dom';
import PostCreate from '../components/community/PostCreate';

const Community = () => {
    return (
        <div>
          <p>커뮤니티 메인 페이지 (자유게시판 글 출력)</p>

          <Link to="/post/create">
            <button>글 작성</button>
          </Link>
          
        </div>
    );
}

export default Community;