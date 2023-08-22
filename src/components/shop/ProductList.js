import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 추가

import Product from "../shop/Product"

import styles from "../../styles/shop/ProductList.module.css";
import Page from "../common/Page";
import Search from "../common/Search";

// 날짜 yyyy-mm-dd로 변경
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


const ProductList = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchData(`/shopping/${currentPage}`);
    } else {
      fetchData(`/shopping/search/${searchTerm}/${currentPage}`);
    }
  // eslint-disable-next-line
  }, [currentPage, searchTerm]);

  const fetchData = (url) => {
    axios.get(url)
      .then((response) => {
        const contentArray = response.data.content;
        const extractedData = contentArray.map((item) => ({
          productId: item.productId,
          createdAt: formatDate(item.createdAt),
          price: item.price,
          productName: item.productName,
          stockQuantity: item.stockQuantity,
          thumbnailUrl: item.thumbnailUrl,
          updatedAt: formatDate(item.updatedAt),
          categoryId: item.categoryId,
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
      navigate(`/shopping/1`);
    } else {
      navigate(`/shopping/search/${searchTerm}/1`);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    if (searchTerm.trim() === "") {
      navigate(`/shopping/${newPage}`);
    } else {
      navigate(`/shopping/search/${searchTerm}/${newPage}`);
    }
  };

  return (
    <div className={styles.base}>
      <div className={styles.page_title}>쇼핑리스트</div>
      <div className={styles.gridContainer}> {/* 그리드 컨테이너 추가 */}
        {(searchResults.length > 0 ? searchResults : dataList).map((data) => (
          <Product key={data.productId} data={data} /> // newsId를 productId로 변경
        ))}
      </div>
      <Page currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
      <Search onSearch={handleSearch} />
    </div>
  );
};

export default ProductList;