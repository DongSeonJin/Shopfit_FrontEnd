import React from 'react';
import PostList1 from '../components/community/PostList1';
import PostList2 from '../components/community/PostList2';
import PostList3 from '../components/community/PostList3';

import { Route, Routes } from 'react-router-dom';

const Communityhan = () => {
    return (
        <div>
            <Routes>
                <Route path="/post/list/1" element={<PostList1 />} />
                <Route path="/post/list/2" element={<PostList2 />} />
                <Route path="/post/list/3" element={<PostList3 />} />
            </Routes>
        </div>
    );
};

export default Communityhan;