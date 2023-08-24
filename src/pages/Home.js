import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomeContent from '../components/common/HomeContent';
import PostList from '../components/community/PostList';


import Shopping from '../pages/Shopping';
import News from '../pages/News';

const Home = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        
        {/* <Route path="/community/:categoryId" element={<Community />} /> */}

        <Route path="/post/list/:categoryId" element={<PostList />} />

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
