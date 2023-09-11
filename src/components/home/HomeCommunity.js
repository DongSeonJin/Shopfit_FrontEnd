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
        <div style={{margin: '5% 20%'}}>
            <div>
                인기 게시글
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                {top4Posts.map(post => (
                    <div>
                        <Link to={`/community/post/${post.postId}`}>
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                style={{ width: '240px', height: '240px', objectFit: 'cover' }}
                            />
                        </Link>
                        <div style={{display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold'}}>{post.title}</div>
                        <div style={{display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis'}}>{post.content}</div>
                    </div>

                ))}
            </div>
        </div>
    );
    
    
    
};

export default HomeCommunity;