
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core'

import LikeButton from './../../components/community/LikeButton';

import styles from '../../styles/community/PostList.module.css'

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumb, setPageNumb] = useState(1);
  const { categoryId = 1 } = useParams();
  const loader = useRef(null);
  const [prevCategoryId, setPrevCategoryId] = useState(categoryId);
  const [isObserverActive, setIsObserverActive] = useState(false);
  

  // categoryId 변화 감지하여 prevCategoryId 업데이트
  useEffect(() => {
    setPosts([]); // 게시글 목록 초기화
    setPageNumb(1); // 페이지 번호 초기화
    setIsObserverActive(false);
  }, [categoryId]);



  // loader(ref) 가 화면에 나타났다 사라졌다 할 때 호출되는 함수입니다.
  const handleObserver = useCallback((entities) => {
    const target = entities[0];

    if (target.isIntersecting) {
      if (prevCategoryId === categoryId) {
        setPageNumb((prevPageNumber) => prevPageNumber + 1)
      } else {
        setPrevCategoryId(categoryId);
        setPageNumb((prevPageNumber) => prevPageNumber + 1)
      }
    }
  }, [prevCategoryId, categoryId]); // prevCategoryId와 categoryId에 따라 함수 재생성



  useEffect(() => {
    axios.get(`/post/list/${categoryId}/${pageNumb}`)
      .then(response => {
        setPosts(prevPosts => [...prevPosts, ...response.data.content]); 
        setIsObserverActive(true); // 데이터 로드 후 observer 활성화
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, [categoryId, pageNumb]);






  useEffect(() => {
    if (!isObserverActive) return; // isObserverActive가 false일 경우 observer 생성하지 않음

    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };

    // Intersection Observer를 생성하고 시작합니다.
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current)
    }


    // cleanup function을 추가하여 이전의 observer를 해제합니다.
    return () => observer.disconnect();
  }, [handleObserver, isObserverActive]); // handleObserver의 변경에 따라 새로운 observer 생성




  return (

    <div className='container'>

      <div style={{ marginRight: "auto", marginLeft: "0" }}>
        <Button component={Link} to="/community/post/create" variant="contained" color="primary" className={styles['write-button']}>
          글 작성
        </Button>
      </div>

      <div className={styles['post-list']}>

        {posts.map((post) => (


          <div className={styles['post-card']} key={post.id}>
            <Link to={`/community/post/${post.postId}`}>
              <img src={post.imageUrl1} alt={post.title} className={styles['post-image']} />
            </Link>
            <LikeButton postId={post.postId} /> {/*좋아요 버튼 component 분리, prop으로 postId 전달*/}
            <span>{`조회수: ${post.viewCount}, `}</span>
            <span>{`댓글수: ${post.replyCnt}`}</span>
            <div className={styles['post-content']}>
              <h2 className={styles['post-title']}>{post.title}</h2>
              <p className={styles['post-author']}>{`작성자: ${post.nickname}`}</p>
              {/* 추가적인 내용들... */}
            </div>

          </div>

        ))}
        <div ref={loader} className={styles['loading-indicator']}>
          {/* 로딩 인디케이터 (예: 스피너) */}
          Loading...
        </div>
      </div>
    </div>
  );
};

export default PostList;



