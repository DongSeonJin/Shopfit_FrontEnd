import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../../components/shop/FetchProductData";
import { useSelector } from "react-redux";

import Page from "../../components/common/Page";
import Search from "../../components/common/Search";
import Product from "../../components/shop/Product";
import { Button } from "@mui/material";


const ProductListPage = () => {
  const userAuthority = useSelector(state => state.authUser.authority);
  const { categoryId, pageNum } = useParams();
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSort, setSelectedSort] = useState("");

  const getSortButtonStyle = (sortType) => {
    return {
      margin: '0 10px',
      color: selectedSort === sortType ? "white" : "white",
      fontWeight: selectedSort === sortType ? "bold" : "normal",
    };
  };

  useEffect(() => {
    if (pageNum !== currentPage) {
      setCurrentPage(Number(pageNum));
    }
    if (searchTerm.trim() === "") {
      handleFetchData(`/shopping/${categoryId ? `category/${categoryId}/` : ''}${currentPage}`);
    } else {
      handleFetchData(`/shopping/${categoryId ? `category/${categoryId}/` : ''}search/${searchTerm}/${currentPage}`);
    }
    // eslint-disable-next-line
  }, [categoryId, currentPage, searchTerm]);

  const handleFetchData = (url) => {
    fetchData(url, searchTerm, setDataList, setSearchResults, setTotalPages);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      navigate(`/shopping/${categoryId ? `category/${categoryId}/` : ''}1`);
    } else {
      navigate(`/shopping/${categoryId ? `category/${categoryId}/` : ''}search/${searchTerm}/1`);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (searchTerm.trim() === "") {
      navigate(`/shopping/${categoryId ? `category/${categoryId}/` : ''}${newPage}`);
    } else {
      navigate(`/shopping/${categoryId ? `category/${categoryId}/` : ''}search/${searchTerm}/${newPage}`);
    }
  };

  const handleSortBy = (sortType) => {
    setSelectedSort(sortType);
    const newUrl = (sortType !== "") ?
      `/shopping/${categoryId ? `category/${categoryId}/` : ''}sort/${sortType}/${currentPage}` :
      `/shopping/${categoryId ? `category/${categoryId}/` : ''}${currentPage}`;
    handleFetchData(newUrl);
    navigate(newUrl);
  };

  const sortItems = [
    { id: "", label: "신상품순" },
    { id: "1", label: "낮은 가격순" },
    { id: "2", label: "높은 가격순" },
    { id: "3", label: "오래된순" },
    { id: "4", label: "리뷰 많은순" },
  ];

  return (
    <div style={{width: '100%', maxWidth: '1920px', margin: 'auto'}}>
      <div style={{ display: 'flex'}}>
        <div style={{ flex: '1', fontWeight: 'bold', fontSize: '24px', marginBottom: '25px', paddingLeft: '10px'}}>
          쇼핑리스트 - {categoryId === "1" ? "닭가슴살" : categoryId === "2" ? "음료/보충제" : categoryId === "3" ? "운동용품" : "전체"}
        </div>
        {/* 관리자 권한 */}
        <div style={{ flex: '1', textAlign: 'right', margin: '0 20px', height: '62px' }}>
          {userAuthority === 'ADMIN' ? 
            <Link to="/shopping/create">
              <Button variant="outlined" color="primary" style={{color: 'white', width: '160px', fontSize: '20px'}}>상품 등록</Button>
            </Link> : ''}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'right', margin: '10px' }}>
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
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1%', marginBottom: '100px' }}>
        {(searchResults.length > 0 ? searchResults : dataList).map((data) => (
          <div key={data.productId}>
            <Product data={data} />
          </div>
        ))}
      </div>

      <Page currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
      <Search onSearch={handleSearch} />
    </div>
  );
};

export default ProductListPage;
