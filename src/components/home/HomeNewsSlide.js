import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import styles from "../../styles/common/HomeNewsSlide.module.css";

const HomeNewsSlide = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetchData(`/news/list`);
  }, []);

  const fetchData = (url) => {
    axios.get(url)
      .then((response) => {
        const contentArray = response.data.content;
        const extractedData = contentArray.map((item) => ({
          newsId: item.newsId,
          title: item.title,
          content: item.content,
          imageUrl: item.imageUrl,
          newsUrl: item.newsUrl,
          createdAt: item.createdAt,
          totalPages: item.totalPages,
        }));
        setDataList(extractedData);
      })
      .catch((error) => {
        console.error('데이터를 불러오는 중 에러 발생:', error);
      });
  };

  const latestNews = dataList.slice(0, 4);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.title}>Latest News</div>
      <Carousel showThumbs={false} infiniteLoop use autoPlay>
        {latestNews.map(news => (
            <div key={news.newsId} onClick={() => window.open(news.newsUrl, '_self')}>
              <a href={news.newsUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className={styles.newsImage}
                />
              </a>
              <p> </p>
            </div>   
         ))}
       </Carousel>

    </div>
    
   );   
};

export default HomeNewsSlide;
