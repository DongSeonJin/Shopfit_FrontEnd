import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';

const HomeCommunity = () => {
    const [top4Posts, setTop4Posts] = useState([]);

    const { postId } = useParams();
 
    useEffect(() => {
        fetchTop4Posts();
    }, []);

    const fetchTop4Posts = async () => {
        try {
            const response = await axios.get('/post/recent-top4'); // 백엔드 엔드포인트
            setTop4Posts(response.data);
        } catch (error) {
            console.error('Error fetching top 4 posts:', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
                <h2>인기 게시글</h2>
                <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                    {top4Posts.map(post => (
                        <li key={post.postId} style={{ margin: '0 16px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Link to={`/community/post/${post.postId}`}>
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        style={{ width: '180px', height: '160px', objectFit: 'cover' }}
                                    />
                                </Link>
                                
                                <h3 style={{ marginTop: '8px', display: '-webkit-box', WebkitLineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical' }}>
                                    {post.title}
                                </h3>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
    
    
    
};

export default HomeCommunity;
