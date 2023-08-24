import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList1 = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // 컴포넌트가 마운트되면 HTTP 요청을 보내서 데이터를 가져옴
        axios.get('/post/list/3')
            .then(response => {
                // 서버에서 받은 데이터를 상태에 저장
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // 빈 배열을 넘겨주면 컴포넌트가 처음 마운트될 때만 실행됨

    return (
        <div>
            <h1>Post List</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default PostList1;
