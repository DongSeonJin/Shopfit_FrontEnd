import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import HeaderSubMyPage from "../../components/common/HeaderSubMypage";

// import styles from "../../styles/mypage/MyPosts.module.css";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/post/myPage/myCommunity/${userId}`);
        setPosts(response.data);
      } catch (error) {
        console.error("실패", error);
      }
    };

    fetchPosts(); // useEffect 내부에서 호출되어야 합니다.
  }, [userId]);

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',  width:'100%', minHeight: `calc(100vh - 720px)`}}>
      <HeaderSubMyPage />
      <div style={{width: '80%', maxWidth: '1920px'}}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {posts.map((post) => (
            <div style={{ width: 'calc(25% - 10px)', marginBottom: '30px' }} key={post.id}>
              <Link to={`/community/post/${post.postId}`} style={{ textDecoration: "none", color: "inherit" }} key={post.id}>
                <div alt={post.title} style={{backgroundSize: 'cover', backgroundPosition: 'top center', backgroundImage: `url(${post.imageUrl1})`, width: '100%', paddingBottom: '100%',maxHeight: '384px', border: '1px solid white', borderRadius: '10px'}} />
              </Link>
              <div>
                <div style={{fontSize: '24px'}}>{post.title}</div>
                <div style={{fontSize: '20px'}}>작성자</div>
                <div style={{fontSize: '20px'}}>{`${post.nickname}`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
