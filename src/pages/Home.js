import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomeContent from '../components/common/HomeContent';
import Community from '../pages/Community';
import PostList1 from '../components/community/PostList1';
import PostList2 from '../components/community/PostList2';
import PostList3 from '../components/community/PostList3';
import Shopping from '../pages/Shopping';
import News from '../pages/News';
import Communityhan from './Communityhan';
import PostCreate from '../components/community/PostCreate';
import PostDetail from '../components/community/PostDetail';

const Home = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        
        {/* <Route path="/community/:categoryId" element={<Community />} /> */}

        <Route path="/community" element={<Community />} />
        <Route path="/post/list/1" element={<PostList1 />} />
        <Route path="/post/list/2" element={<PostList2 />} />
        <Route path="/post/list/3" element={<PostList3 />} />
        <Route path='/post/create' element={<PostCreate />} />
        <Route path='/post/{postId}' element={<PostDetail />} />

        <Route path="/shopping" element={<Shopping />} />
        <Route path="/shopping/:pageNum" element={<Shopping />} />
        <Route path="/shopping/search/:keyword" element={<Shopping />} />
        <Route path="/shopping/search/:keyword/:pageNum" element={<Shopping />} />

        <Route path="/news/list" element={<News />} />
        <Route path="/news/list/:pageNum" element={<News />} />
        <Route path="/news/list/search/:keyword" element={<News />} />
        <Route path="/news/list/search/:keyword/:pageNum" element={<News />} />
      </Routes>
    </div>
  );
};

export default Home;
