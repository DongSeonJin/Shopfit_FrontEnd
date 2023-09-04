import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import styles from '../../styles/community/PostList.module.css'
import { Button } from '@material-ui/core'
import LikeIcon from '@material-ui/icons/Favorite';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumb, setPageNumb] = useState(1);
  const { categoryId = 1 } = useParams();
  const loader = useRef(null);
  const { postId } = useParams();
  const [likeCount, setLikeCount] = useState(0);

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
    setPosts([]); // 게시글 목록도 초기화합니다.
  }, [categoryId]);

  useEffect(() => {
    // 컴포넌트가 마운트되면 HTTP 요청을 보내서 데이터를 가져옵니다.
    axios.get(`/post/list/${categoryId}/${pageNumb}`)
      .then(response => {
        // 서버에서 받은 데이터를 상태에 저장
        setPosts(prevPosts => [...prevPosts, ...response.data.content]); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    
   }, [categoryId,pageNumb]);



   const handleLike = async () => {
    try {
      // 서버로 좋아요 요청 보내기
      await axios.post('/post/like', { postId, userId:1});
      alert('좋아요 누르기 성공');

      // 좋아요 성공 후 해당 포스트 정보 다시 가져오기
      const response = await axios.get(`/post/${postId}`); // 좋아요 갯수만 따로 요청받을 컨트롤러 만들까 고민중
                                                          //좋아요 갯수만 가져오면 되는데 resource낭비

      // 가져온 데이터를 통해 상태 갱신
      setPosts(response.data.content);
    } catch (error) {
      console.error('좋아요 실패:', error);
      alert('좋아요 실패');
    }
  };



   // loader(ref) 가 화면에 나타났다 사라졌다 할 때 호출되는 함수입니다.
   const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {   
      setPageNumb((prevPageNumber) => prevPageNumber + 1)
    }
  }

   return (
    <div className='container'>

      <div style={{ marginRight:"auto", marginLeft: "0" }}>
        <Button component={Link} to="/community/post/create" variant="contained" color="primary" className={styles['write-button']}>
          글 작성
        </Button>
      </div>

      <div className={styles['post-list']}>

        {posts.map((post) => (
        
          <div className={styles['post-card']} key={post.id}>

            <img src={post.imageUrl1} alt={post.title} className={styles['post-image']} />
            <LikeIcon onClick={handleLike} style={{color:'red', cursor: 'pointer'}} />
            <span>{likeCount}</span>
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

      
