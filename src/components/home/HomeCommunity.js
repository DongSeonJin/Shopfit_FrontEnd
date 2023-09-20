import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const HomeCommunity = () => {
    const [top4Posts, setTop4Posts] = useState([]);
 
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
        <div style={{maxWidth: '1080px', width: '90%', margin: '0 auto 100px'}}>
            <div style={{fontWeight: 'bold', margin: '25px 0', fontSize: '24px'}}>인기 게시글</div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px'}}>
                {top4Posts.map(post => (
                    <div>
                        <Link to={`/community/post/${post.postId}`}>
                            <div style={{backgroundImage: `url(${post.imageUrl})`, backgroundSize: 'cover', width: '100%', height: '0', paddingBottom: '100%', objectFit: 'cover', border: '1px solid white', borderRadius: '10px', marginBottom: '10px'}}/>
                        </Link>
                        <div style={{display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold', padding: '5px', height: '24px', fontSize: '16px'}}>{post.title}</div>
                    </div>

                ))}
            </div>
        </div>
    );
    
    
    
};

export default HomeCommunity;