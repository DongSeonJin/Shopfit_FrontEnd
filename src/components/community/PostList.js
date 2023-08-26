import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from '../../styles/community/PostList.module.css'

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumb, setPageNumb] = useState(1);
  const { categoryId } = useParams();
  const loader = useRef(null);

  useEffect(() => {
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

  }, []);

  useEffect(() => {
    // categoryId가 변경될 때마다 pageNumb를 1로 초기화
    setPageNumb(1);
  }, [categoryId]);

  useEffect(() => {
    // 컴포넌트가 마운트되면 HTTP 요청을 보내서 데이터를 가져옵니다.
    axios.get(`/post/list/${categoryId}/${pageNumb}`)
      .then(response => {
        // 서버에서 받은 데이터를 상태에 저장
        setPosts(prevPosts => [...prevPosts, ...response.data.content]); 
        setPageNumb(prevPageNumber => prevPageNumber + 1); // 페이지 번호 증가
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    
   }, [categoryId]);

   // loader(ref) 가 화면에 나타났다 사라졌다 할 때 호출되는 함수입니다.
   const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {   
      setPageNumb((prevPageNumber) => prevPageNumber + 1)
    }
  }

   return (
     <div className={styles['post-list']}>
       {posts.map((post) => (
         <div className={styles['post-card']} key={post.id}>
           <img src={post.imageUrl} alt={post.title} className={styles['post-image']} />
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
    );
};

export default PostList;

      
