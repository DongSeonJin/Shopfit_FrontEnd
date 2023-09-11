import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
    <div style={{margin: '5% 20%'}}>
      <div>최신 뉴스</div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {latestNews.map(news => (
          <div style={{width: '240px'}}>
            <a href={news.newsUrl} target="_blank" rel="noopener noreferrer">
              <div style={{ backgroundImage: `url(${news.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '240px', height: '150px', cursor: 'pointer', position: 'relative'}} />
            </a>
            <div style={{display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold'}}>{news.title}</div>
            <div style={{display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis'}}>{news.content}</div>
          </div>
        ))}
      </div>
    </div>
  );   
};

export default HomeNews;