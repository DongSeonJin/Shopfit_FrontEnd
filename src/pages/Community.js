import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Community = ({ categoryId }) => {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      const fetchPosts = async () => {
        const response = await axios.get(`/post/list/${categoryId}`);
        setPosts(response.data);
      };
  
      fetchPosts();
    }, [categoryId]);
  


  return (
    <div>
      <h1>Posts in Category: {categoryId}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );


};

export default Community;
