import React, { Component } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { RouteSharp } from '@mui/icons-material';

import PostList from './../pages/community/PostList';
import PostDetail from './../pages/community/PostDetail';
import PostCreate from './../pages/community/PostCreate';
import PostUpdate from './../pages/community/PostUpdate';

const Community = () => {

    return (
        <div>
                      
            <Routes>
                <Route path='/community' element={<PostList />} />
                <Route path="/community/post/list/" element={<PostList />} />
                <Route path="/community/post/list/:categoryId" element={<PostList />} />
                <Route path="/community/post/:postId" element={<PostDetail />} />
                <Route path='/community/post/create' element={<PostCreate />} />
                <Route path='/community/post/update/:postId' element={<PostUpdate />} />
                
            </Routes>
          
        </div>
    );
}

export default Community;