import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsList = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    axios.get("/api/fetch-data") // 백엔드 API 엔드포인트에 요청
      .then((response) => {
        setDataList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>뉴스리스트</h1>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>글</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((data) => (
            <tr key={data.number}>
              <td>{data.number}</td>
              <td>{data.title}</td>
              <td>{data.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsList;