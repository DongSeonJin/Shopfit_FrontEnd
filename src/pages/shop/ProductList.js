import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import Product from '../../components/shop/Product';
import Page from '../../components/common/Page';
import Search from '../../components/common/Search';

import styles from '../../styles/shop/ProductList.module.css';
import { Button } from "@mui/material";
import { formatDate } from './../../components/common/DateUtils';

const ProductList = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSort, setSelectedSort] = useState("");

  const activeStyle = {
    color: "black",
    fontWeight: "bold",
  };

  // 클릭된 요소에 대한 스타일링을 반환하는 함수
  const getSortButtonStyle = (sortType) => {
    return selectedSort === sortType ? activeStyle : {};
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchData(`/shopping/${currentPage}`);
    } else {
      fetchData(`/shopping/search/${searchTerm}/${currentPage}`);
    }
    // eslint-disable-next-line
  }, [currentPage, searchTerm]);

  const fetchData = (url) => {
    axios
      .get(url)
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
        console.error("데이터를 불러오는 중 에러 발생:", error);
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

  const handleSortByPriceLow = () => {
    setSelectedSort("priceLow");
    const newUrl = `/shopping/sort/1/${currentPage}`;
    fetchData(newUrl);
    navigate(newUrl);
  };

  const handleSortByPriceHigh = () => {
    setSelectedSort("priceHigh");
    const newUrl = `/shopping/sort/2/${currentPage}`;
    fetchData(newUrl);
    navigate(newUrl);
  };

  const handleSortByNewest = () => {
    setSelectedSort("newest");
    const newUrl = `/shopping/${currentPage}`;
    fetchData(newUrl);
    navigate(newUrl);
  };

  const handleSortByOldest = () => {
    setSelectedSort("oldest");
    const newUrl = `/shopping/sort/3/${currentPage}`;
    fetchData(newUrl);
    navigate(newUrl);
  };

  const handleSortByMostReviews = () => {
    setSelectedSort("mostReviews");
    const newUrl = `/shopping/sort/4/${currentPage}`;
    fetchData(newUrl);
    navigate(newUrl);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>
        쇼핑리스트
        <div style={{ marginLeft: "auto" }}>
          <Link to="/shopping/create">
            <Button variant="outlined">상품 등록</Button>
          </Link>
        </div>
      </div>
      <div className={styles.sort}>
        <div
          role="button"
          onClick={handleSortByPriceLow}
          className={styles.sortButton}
          style={getSortButtonStyle("priceLow")}
        >
          낮은 가격순
        </div>
        <div className={styles.sortButton}>|</div>
        <div
          role="button"
          onClick={handleSortByPriceHigh}
          className={styles.sortButton}
          style={getSortButtonStyle("priceHigh")}
        >
          높은 가격순
        </div>
        <div className={styles.sortButton}>|</div>
        <div
          role="button"
          onClick={handleSortByNewest}
          className={styles.sortButton}
          style={getSortButtonStyle("newest")}
        >
          신상품순
        </div>
        <div className={styles.sortButton}>|</div>
        <div
          role="button"
          onClick={handleSortByOldest}
          className={styles.sortButton}
          style={getSortButtonStyle("oldest")}
        >
          오래된순
        </div>
        <div className={styles.sortButton}>|</div>
        <div
          role="button"
          onClick={handleSortByMostReviews}
          className={styles.sortButton}
          style={getSortButtonStyle("mostReviews")}
        >
          리뷰 많은순
        </div>
      </div>
      <div className={styles.gridContainer}>
        {(searchResults.length > 0 ? searchResults : dataList).map((data) => (
          <div key={data.productId} className={styles.productItem}>
            <Product data={data} />
          </div>
        ))}
      </div>
      <Page currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
      <Search onSearch={handleSearch} />
    </div>
  );
};

export default ProductList;
