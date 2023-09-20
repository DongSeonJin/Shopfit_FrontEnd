import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core'
import LikeButton from './../../components/community/LikeButton';
import UTurnRightRoundedIcon from '@mui/icons-material/UTurnRightRounded';

// import styles from '../../styles/community/PostList.module.css'


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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{maxWidth: '1420px', width: '100%', margin: 'auto'}}>
      <UTurnRightRoundedIcon onClick={scrollToTop} style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999', transform: 'rotate(180deg)', cursor: 'pointer'}} />

      <div>
        <div>
          {categoryId}
          {categoryId === 1 ? "오운완" : categoryId === 2 ? "식단" : ""}
        </div>
        <div style={{textAlign: 'right', marginBottom: '20px' }}>
          <Link to="/community/post/create">
              <Button variant="outlined" style={{color: 'white', width: '120px'}}>글작성</Button>
          </Link>
        </div>
      </div>
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', width: '100%' }}>
          {posts.map((post) => (
            <div key={post.id} style={{width: '100%', marginBottom: '20px'}}>
              <Link to={`/community/post/${post.postId}`}>
                <div alt={post.title} style={{backgroundImage: `url(${post.imageUrl1})`, backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '100%', width: '100%', height: '0', objectFit: 'cover', border: '1px solid white', borderRadius: '5%'}} />
              </Link>

              <div style={{margin: '10px 0', padding: '5px'}}>
                <div style={{display: 'flex', marginBottom: '10px'}}>
                  <div style={{flex: '2', fontSize: '1vw'}}>
                    <LikeButton postId={post.postId} />
                  </div>
                  <div style={{flex: '3', fontSize: '1vw'}}>{`조회수 : ${post.viewCount}`}</div>
                  <div style={{flex: '3', fontSize: '1vw'}}>{`댓글수 : ${post.replyCnt}`}</div>
                </div>
                <div style={{display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold', fontSize: '1vw', height: '2vw', lineHeight: '1vw', marginBottom: '2px'}}>{post.title}</div>
                <div style={{display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '1vw', height: '1vw', lineHeight: '1vw', textAlign: 'right', paddingRight: '5px'}}>{post.nickname}</div>
              </div>
            </div>
          ))}
        </div>
        <div ref={loader}>
          Loading...
        </div>
      </div>
    </div>
  );
};

export default PostList;