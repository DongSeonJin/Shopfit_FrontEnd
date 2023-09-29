import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authApi } from "../../lib/api/authApi";

import HeaderSubMyPage from "../../components/common/HeaderSubMypage";


// import styles from "../../styles/mypage/MyPosts.module.css";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const userId = useSelector(state => state.authUser.userId);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await authApi.get(`/post/myPage/myCommunity/${userId}`);
        setPosts(response.data);
      } catch (error) {
        console.error("실패", error);
      }
    };

    fetchPosts(); // useEffect 내부에서 호출되어야 합니다.
  }, [userId]);

  return (
    <div style={{ maxWidth: '1420px', width: '100%', margin: '0 auto 150px'}}>
      <HeaderSubMyPage />
      <div style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '50px', width: '100%' }}>내가 쓴 글</div>

      <div style={{ borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray', minHeight: '240px', padding: '20px'}}>   
        {posts.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '240px' }}>
            <div style={{ textAlign: 'center', fontSize: '24px' }}>작성한 글이 없습니다.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'left' }}>
            {posts.map((post) => (
            
              <div style={{ width: 'calc(25% - 10px)', marginBottom: '30px' }} key={post.id}>
                <Link to={`/community/post/${post.postId}`} style={{ textDecoration: "none", color: "inherit" }} key={post.id}>
                  <div alt={post.title} style={{backgroundSize: 'cover', backgroundPosition: 'top center', backgroundImage: `url(${post.imageUrl1})`, width: '100%', paddingBottom: '100%',maxHeight: '384px', border: '1px solid white', borderRadius: '10px', marginBottom: '5px'}} />
                </Link>
                <div style={{padding: '0 3px'}}>
                  <div style={{fontSize: '1vw', lineHeight:'1.2vw', height: '2.4vw', overflow: 'hidden'}}>{post.title}</div>
                  <div style={{fontSize: '0.8vw', textAlign: 'right'}}>{`${post.nickname}`}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
    </div>
  );
};

export default MyPosts;
