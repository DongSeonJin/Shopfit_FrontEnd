import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../components/common/DateUtils';
import Product from '../../components/shop/Product';
import Page from '../../components/common/Page';

const SearchShop = () => {
    const { text } = useParams();
    const [shopPage, setShopPage] = useState(1);
    const [shopTotalPages, setShopTotalPages] = useState(1);
    const [dataList, setDataList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    

    useEffect(() => {
        if (text.trim() === "") {
          fetchData(`/shopping/${shopPage}`);
        } else {
          fetchData(`/shopping/search/${text}/${shopPage}`);
        }
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
            const calculatedTotalPages = response.data.totalPages;
            setShopTotalPages(calculatedTotalPages);
          })
          .catch((error) => {
            console.error("데이터를 불러오는 중 에러 발생:", error);
          });
    };

    const handlePageChange = (newPage) => {
        setShopPage(newPage);
    };


    return (
        <div style={{margin: '50px 0'}}>
            <div>
                shop 검색결과 : {text}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '80%', margin: '0 auto' }}>
                {(searchResults.length > 0 ? searchResults : dataList).map((data) => (
                    <div key={data.id} style={{ flexBasis: '20%', padding: '10px' }}>
                        <Product data={data} />
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