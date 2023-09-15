import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PostList from './../pages/community/PostList';
import PostDetail from './../pages/community/PostDetail';
import PostCreate from './../pages/community/PostCreate';
import PostUpdate from './../pages/community/PostUpdate';

const Community = () => {

    return (
        <div style={{margin: '0 10%'}}>         
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