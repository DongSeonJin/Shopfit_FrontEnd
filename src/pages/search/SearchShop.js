import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../components/common/DateUtils';
import SearchResultProducts from '../../components/shop/SearchResultProducts';
import Page from '../../components/common/Page';

const SearchShop = () => {
  const { text } = useParams();
  const [shopPage, setShopPage] = useState(1);
  const [shopTotalPages, setShopTotalPages] = useState(1);
  const [dataList, setDataList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [numberOfSearch, setNumberOfSearch] = useState(0);

  useEffect(() => {
      fetchData(`/shopping/search/${text}/${shopPage}`);
      // eslint-disable-next-line
    }, [shopPage, text]);
  
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
          if (text.trim() === "") {
            setDataList(extractedData);
          } else {
            setSearchResults(extractedData);
          }

          setShopTotalPages(response.data.totalPages);
          setNumberOfSearch(response.data.totalElements)
        })
        .catch((error) => {
          console.error("데이터를 불러오는 중 에러 발생:", error);
        });
  };

  const handlePageChange = (newPage) => {
      setShopPage(newPage);
  };


  return (
    <div style={{maxWidth: '1420px', width: '100%', margin: '0 auto 100px'}}>

      <div style={{ fontSize: '24px', marginBottom: '30px'}}>
          쇼핑 '{text}' 검색결과 : {numberOfSearch} 개
      </div>
      
      {numberOfSearch === 0 ? <div style={{textAlign: 'center', height: '240px', fontSize: '2vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>검색 결과가 없습니다.</div> : ""}

      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', margin: '0 auto 50px'}}>
        {(searchResults.length > 0 ? searchResults : dataList).map((data) => (
          <div key={data.newsId} style={{ flexBasis: '20%', padding: '10px' }}>
            <SearchResultProducts data={data} />
          </div>
        ))}
      </div>
      <div>
          <Page currentPage={shopPage} onPageChange={handlePageChange} totalPages={shopTotalPages} />
      </div>
    </div>
  );
};

export default SearchShop;  