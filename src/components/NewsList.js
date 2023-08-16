import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Article from "../components/Article";

import styles from "../styles/NewsList.module.css";

const NewsList = () => {
  const [dataList, setDataList] = useState([]);
  const { page } = useParams();
  const currentPage = page || 1;

  useEffect(() => {
    axios
      .get(`/news/list/${currentPage}`)
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
        console.error("Error fetching data:", error);
      });
  }, []);

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
          {dataList.map((data) => (
            <>
              <Article key={data.newsId} data={data} />
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 날짜 yyyy-mm-dd로 변경
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default NewsList;
