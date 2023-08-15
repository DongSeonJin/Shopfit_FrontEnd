import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "../styles/NewsList.module.css";

const NewsList = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    axios.get("/news/list")                    // 백엔드 API 엔드포인트에 요청
      .then((response) => {
        const contentArray = response.data.content;

        const extractedData = contentArray.map((item) => ({
          newsId: item.newsId,
          title: item.title,
          content: item.content,
          imageUrl: item.imageUrl,
          createdAt: item.createdAt,
        }));

        setDataList(extractedData);

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1 style={{ color: 'black' }}>뉴스리스트</h1>
      <table>
        <colgroup>
          <col width="200px" />
          <col width="200px" />
          <col width="200px" />
          <col width="200px" />
          <col width="100px" />
        </colgroup>
        <thead>
          <tr style={{ color: 'black'}}>
            <th>번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>사진</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((data) => (
            <tr key={data.newsId}>
              <td>{data.newsId}</td>
              <td>{data.title}</td>
              <td>{data.content}</td>
              <td className={styles.img_item} style={{ backgroundImage: `url(${data.imageUrl})` }}></td>
              <td>{data.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsList;