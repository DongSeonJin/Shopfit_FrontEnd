import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Product from '../../components/shop/Product';
import Page from '../../components/common/Page';
import Search from '../../components/common/Search';

// import styles from '../../styles/shop/ProductList.module.css';
import { Button } from "@mui/material";
import { fetchData } from "../../components/shop/FetchProductData";

const ProductList = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSort, setSelectedSort] = useState("");

  const activeStyle = {
    color: "red",
    fontWeight: "bold",
  };

  // 클릭된 요소에 대한 스타일링을 반환하는 함수
  const getSortButtonStyle = (sortType) => {
    return selectedSort === sortType ? activeStyle : {};
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      handleFetchData(`/shopping/${currentPage}`);
    } else {
      handleFetchData(`/shopping/search/${searchTerm}/${currentPage}`);
    }
    // eslint-disable-next-line
  }, [currentPage, searchTerm]);

  const handleFetchData = (url) => {
    fetchData(url, searchTerm, setDataList, setSearchResults, setTotalPages);
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

  const handleSortBy = (sortType) => {
    setSelectedSort(sortType);
    const newUrl = (sortType !== "") ? `/shopping/sort/${sortType}/${currentPage}` : `/shopping/${currentPage}`;
    handleFetchData(newUrl);
    navigate(newUrl);
  };

  const sortItems = [
    { id: "1", label: "낮은 가격순"},
    { id: "2", label: "높은 가격순"},
    { id: "", label: "신상품순"},
    { id: "3", label: "오래된순"},
    { id: "4", label: "리뷰 많은순"},
  ];

  return (
    <div>
      <div style={{display: 'flex'}}>
        <div style={{flex: '1', fontWeight: 'bold', fontSize: '24px', paddingLeft: '3%'}}>
          쇼핑리스트
        </div>

        <div style={{flex: '1', paddingRight: '3%'}}>
          <div style={{ textAlign: 'right', margin: '1% 2%'}}>
            <Link to="/shopping/create">
              <Button variant="outlined">상품 등록</Button>
            </Link>
          </div>

          <div style={{display: 'flex', justifyContent: 'right', margin: '2% 2%'}}>
            {sortItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <div
                  role="button"
                  onClick={() => handleSortBy(item.id)}
                  style={getSortButtonStyle(item.id)}
                >
                  {item.label}
                </div>
                {index !== sortItems.length - 1 && <div>|</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1%', margin: '0 0 5% 0 ' }}>
        {(searchResults.length > 0 ? searchResults : dataList).map((data) => (
          <div key={data.productId} style={{width: '100%'}}>
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
