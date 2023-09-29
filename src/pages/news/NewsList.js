import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Page from './../../components/common/Page';
import Search from './../../components/common/Search';
import Article from './../../components/news/Article';
import { formatDate } from './../../components/common/DateUtils';

const NewsList = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchData(`/news/list/${currentPage}`);
    } else {
      fetchData(`/news/search/${searchTerm}/${currentPage}`);
    }
  // eslint-disable-next-line
  }, [currentPage, searchTerm]);

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
          createdAt: formatDate(item.createdAt),
          totalPages: item.totalPages,
        }));
        if (searchTerm.trim() === "") {
          setDataList(extractedData);
        } else {
          setSearchResults(extractedData);
        }
        const calculatedTotalPages = response.data.totalPages;
        setTotalPages(calculatedTotalPages);
      })
      .catch((error) => {
        console.error('데이터를 불러오는 중 에러 발생:', error);
      });
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      navigate(`/news/list/1`);
    } else {
      navigate(`/news/search/${searchTerm}/1`);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (searchTerm.trim() === "") {
      navigate(`/news/list/${newPage}`);
    } else {
      navigate(`/news/search/${searchTerm}/${newPage}`);
    }
  };
  
  return (
    <div style={{maxWidth: '1240px', width: '100%', margin: 'auto'}}>
      <div style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '50px', width: '100%' }}>뉴스 리스트</div>
      {(searchResults.length > 0 ? searchResults : dataList).map((data) => (
        <div key={data.newsId}>
          <Article data={data} />
        </div>
      ))}
      <div style={{margin: '50px 0'}}>
        <Page currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
      </div>
      <div style={{margin: '50px 0'}}>
        <Search onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default NewsList;
