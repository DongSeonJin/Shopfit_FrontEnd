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

  const latestNews = dataList.slice(0, 4);

  return (
    <div style={{maxWidth: '1080px', width: '90%', margin: '0 auto 100px'}}>
      
      <div style={{fontWeight: 'bold', margin: '25px 0', fontSize: '24px'}}>최신 뉴스</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px'}}>
        {latestNews.map(news => (
          <div>
            <a href={news.newsUrl} target="_blank" rel="noopener noreferrer">
              <div style={{backgroundImage: `url(${news.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '0', paddingBottom: '75%', cursor: 'pointer', objectFit: 'cover', border: '1px solid white', borderRadius: '10px', marginBottom: '10px'}}/>
            </a>
            <div style={{display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold', fontSize: '16px', padding: '0 5px', height: '36px', lineHeight: '18px', marginBottom: '10px'}}>{news.title}</div>
            
            <div style={{display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '14px', padding: '0 5px', height: '32px', lineHeight: '16px'}}>{news.content}</div>
          </div>
        ))}
      </div>
    </div>
  );   
};

export default HomeNews;