import React, { useState, useEffect } from "react";
import axios from "axios";

import Article from "../components/Article";
import Search from "../components/Search";
import Footer from "../components/Footer";

import styles from "../styles/NewsList.module.css";


// 날짜 yyyy-mm-dd로 변경
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


const NewsList = () => {
  const [dataList, setDataList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`/news/list/${currentPage}`)
      .then((response) => {
        const contentArray = response.data.content;
        const extractedData = contentArray.map((item) => ({
          newsId: item.newsId,
          title: item.title,
          content: item.content,
          imageUrl: item.imageUrl,
          newsUrl: item.newsUrl,
          createdAt: formatDate(item.createdAt),
        }));
        setDataList(extractedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm); // 검색어 설정

    if (searchTerm.trim() === "") {
      // 검색어가 없을 때 전체 데이터로 초기화
      setSearchResults([]);
    } else {
      axios.get(`/news/search/${searchTerm}`)
        .then((response) => {
          const searchResultsData = response.data.content;
          const filteredNews = searchResultsData.filter((result) =>
            result.title.includes(searchTerm)
          );
          setSearchResults(filteredNews);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={styles.base}>
      <div className={styles.page_title}>뉴스리스트</div>
      <table>
        <thead>
          <tr>
            <th>사진</th>
            <th>제목</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {(searchResults.length > 0 ? searchResults : dataList).map((data) => (
            <Article key={data.newsId} data={data} />
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(currentPage - 1)}>&lt; 이전</button>
        <span>{currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)}>다음 &gt;</button>
      </div>
      <Search onSearch={handleSearch} />
      <Footer />
    </div>
  );
};

export default NewsList;