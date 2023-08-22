import axios from 'axios';
import React, { useEffect, useState } from 'react';

import styles from "../../styles/common/HomeShopping.module.css";
import { Link } from 'react-router-dom';

const HomeShopping = () => {
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        fetchData(`/shopping`);
        }, []);
      
        const fetchData = (url) => {
          axios.get(url)
          .then((response) => {
            const contentArray = response.data.content;
            const extractedData = contentArray.map((item) => ({
                productId: item.productId,
                createdAt: item.createdAt,
                price: item.price,
                productName: item.productName,
                stockQuantity: item.stockQuantity,
                thumbnailUrl: item.thumbnailUrl,
                updatedAt: item.updatedAt,
                categoryId: item.categoryId,
                totalPages: item.totalPages,
            }));
            setDataList(extractedData);
            })
            .catch((error) => {
            console.error('데이터를 불러오는 중 에러 발생:', error);
          });
        };
      
        // 최신 3개의 제품만 추출하여 표시 -> 찜 된 수 기준으로 수정 필요
        const latestShopping = dataList.slice(0, 3);

    return (
        <div style={{ textAlign: 'center' }}>
            <div className={styles.title}>Best Shopping</div>
            <ul style={{ display: 'flex', listStyle: 'none', padding: 0, justifyContent: 'center' }}>
                {latestShopping.map(product => (
                <li key={product.productId} style={{ marginRight: '10px' }}>
                    <div className={styles.productContainer}>
                        <Link to={`/shopping/products/${product.productId}`}>
                            <img
                            src={product.thumbnailUrl}
                            alt={product.productName}
                            className={styles.productImage}
                            />
                        </Link>
                        <div className={styles.productInfo}>
                            <p className={styles.category}>
                            {product.categoryId === 1 ? 'Category 1' : 'Category 2'}
                            </p>
                            <h3 className={styles.productName}>
                            {product.productName}
                            </h3>
                            <p className={styles.price}>
                            {product.price.toLocaleString()} 원
                            </p>
                        </div>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default HomeShopping;