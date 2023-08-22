import axios from 'axios';
import React, { useEffect, useState } from 'react';

import styles from "../../styles/common/HomeNews.module.css";

const HomeNews = () => {
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

  // 최신 4개의 기사만 추출하여 표시 -> 랜덤 추출로 바꿀까?
  const latestNews = dataList.slice(0, 4);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Latest News</div>
      <ul className={styles.newsList}>
        {latestNews.map(news => (
          <li key={news.newsId} className={styles.newsItem}>
              <div>
                <a href={news.newsUrl} target="_blank" rel="noopener noreferrer">
                  <img
                  src={news.imageUrl}
                  alt={news.title}
                  className={styles.newsImage}
                  />
                </a>
                <h3 className={styles.newsTitle}>
                  {news.title}
                </h3>
                <p className={styles.newsContent}>
                  {news.content}
                </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );   
};

export default HomeNews;