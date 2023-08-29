import React, { Component } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import PostCreate from '../components/community/PostCreate';
import PostDetail from '../components/community/PostDetail';
import PostList from '../components/community/PostList';
import PostUpdate from '../components/community/PostUpdate';

const Community = () => {

    return (
        <div>
                      
          <Routes>
              
                <Route path="/post/list/:categoryId" element={<PostList />} />
                <Route path="/post/:postId" element={<PostDetail />} />
                <Route path='/post/create' element={<PostCreate />} />
                <Route path='/post/update/:postId' element={<PostUpdate />} />
                
            </Routes>
          
        </div>
    );
}

export default Community;