import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "../../styles/mypage/MyPosts.module.css";
import { Link } from "react-router-dom";
import HeaderSubMyPage from "../../components/common/HeaderSubMypage";

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
    <div>
      <HeaderSubMyPage />
      <div className="container">
        <div className={styles["post-list"]}>
          {posts.map((post) => (
            <Link to={`/community/post/${post.postId}`} style={{ textDecoration: "none", color: "inherit" }} key={post.id}>
              <div className={styles["post-card"]}>
                <img src={post.imageUrl1} alt={post.title} className={styles["post-image"]} />
                <div className={styles["post-content"]}>
                  <h2 className={styles["post-title"]} style={{ width: "100%" }}>
                    {post.title}
                  </h2>
                  <p className={styles["post-author"]} style={{ width: "100%" }}>{`작성자: ${post.nickname}`}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
