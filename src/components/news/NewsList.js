import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 추가

import Article from "../news/Article";
import Search from "../common/Search";
import Page from "../common/Page";

import styles from "../../styles/news/NewsList.module.css";


// 날짜 yyyy-mm-dd로 변경
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


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
    <div className={styles.base}>
      <div className={styles.page_title}>뉴스리스트</div>
      <table>
        <tbody>
          {(searchResults.length > 0 ? searchResults : dataList).map((data) => (
            <Article key={data.newsId} data={data} />
          ))}
        </tbody>
      </table>
      <Page currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
      <Search onSearch={handleSearch} />
    </div>
  );
};

export default NewsList;