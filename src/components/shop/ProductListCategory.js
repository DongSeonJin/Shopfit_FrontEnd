import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

import styles from "../../styles/shop/ProductListCategory.module.css";
import Page from "../common/Page";
import Search from "../common/Search";
import Product from "../shop/Product";
import { Button } from "@mui/material";

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
  const [selectedSort, setSelectedSort] = useState("");

  const activeStyle = {
    color: "black",
    fontWeight: "bold",
  };

  const getSortButtonStyle = (sortType) => {
    return selectedSort === sortType ? activeStyle : {};
  };

  useEffect(() => {
    if (pageNum !== currentPage) {
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

  const handleSortByPriceLow = () => {
    setSelectedSort("priceLow");
    const newUrl = `/shopping/category/${categoryId}/sort/1/${currentPage}`;
    fetchData(newUrl);
    navigate(newUrl);
  };

  const handleSortByPriceHigh = () => {
    setSelectedSort("priceHigh");
    const newUrl = `/shopping/category/${categoryId}/sort/2/${currentPage}`;
    fetchData(newUrl);
    navigate(newUrl);
  };

  const handleSortByNewest = () => {
    setSelectedSort("newest");
    const newUrl = `/shopping/category/${categoryId}/${currentPage}`;
    fetchData(newUrl);
    navigate(newUrl);
  };

  const handleSortByOldest = () => {
    setSelectedSort("oldest");
    const newUrl = `/shopping/category/${categoryId}/sort/3/${currentPage}`;
    fetchData(newUrl);
    navigate(newUrl);
  };

  const handleSortByMostReviews = () => {
    setSelectedSort("mostReviews");
    const newUrl = `/shopping/category/${categoryId}/sort/4/${currentPage}`;
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

export default ProductListCategory;
