import React, { Component } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import PostCreate from '../components/community/PostCreate';
import PostDetail from '../components/community/PostDetail';
import PostList from '../components/community/PostList';
import PostUpdate from '../components/community/PostUpdate';
import { RouteSharp } from '@mui/icons-material';

const Community = () => {

    return (
        <div>
                      
            <Routes>
                <Route path='/community' element={<PostList />} />
                <Route path="/community/post/list/:categoryId" element={<PostList />} />
                <Route path="/community/post/:postId" element={<PostDetail />} />
                <Route path='/community/post/create' element={<PostCreate />} />
                <Route path='/community/post/update/:postId' element={<PostUpdate />} />
                
            </Routes>
          
        </div>
    );
}

export default Community;