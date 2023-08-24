import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import styles from "../../styles/shop/ProductListCategory.module.css";
import Page from "../common/Page";
import Search from "../common/Search";
import Product from "../shop/Product";


const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
  
const ProductListCategory = () => {
  const { categoryId, pageNum } = useParams();
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    if(pageNum !== currentPage){
      setCurrentPage(1);
    }
    if (searchTerm.trim() === "") {
      fetchData(`/shopping/category/${categoryId}/${currentPage}`);
    } else {
      fetchData(`/shopping/category/${categoryId}/search/${searchTerm}/${currentPage}`);
    }
  // eslint-disable-next-line
  }, [categoryId, currentPage, searchTerm]);

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
      navigate(`/shopping/category/${categoryId}/1`);
    } else {
      navigate(`/shopping/category/${categoryId}/search/${searchTerm}/1`);
    }
  };
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (searchTerm.trim() === "") {
      navigate(`/shopping/category/${categoryId}/${newPage}`);
    } else {
      navigate(`/shopping/category/${categoryId}/search/${searchTerm}/${newPage}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>쇼핑리스트</div>
      <div className={styles.gridContainer}>
          {(searchResults.length > 0 ? searchResults : dataList).map((data) => (<div key={data.productId} className={styles.productItem}><Product data={data} /></div>))}
      </div>
      <Page currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
      <Search onSearch={handleSearch} />
    </div>
  );
};

export default ProductListCategory;
