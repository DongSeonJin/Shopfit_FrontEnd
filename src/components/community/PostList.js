import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostList1 = () => {
    const [posts, setPosts] = useState([]);
    const { categoryId } = useParams(); // 현재 URL에서 categoryId 파라미터 값을 가져옵니다.

    useEffect(() => {
        // 컴포넌트가 마운트되면 HTTP 요청을 보내서 데이터를 가져옴
        axios.get('/post/list/${categoryId}')
            .then(response => {
                // 서버에서 받은 데이터를 상태에 저장
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },  [categoryId]); // 의존성 배열에 categoryId를 추가하여 해당 값이 변경될 때마다 useEffect 내부의 코드가 실행되도록 만들기.


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
