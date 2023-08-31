import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from "../../styles/common/HomeShopping.module.css"
import { Link } from 'react-router-dom';

const HomeShopping = () => {
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        fetchTopProducts();
    }, []);

    const fetchTopProducts = async () => {
        try {
            const response = await axios.get('/api/wishlist/top3');
            setTopProducts(response.data);
        } catch (error) {
            console.error('상위 상품 가져오기 오류:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <h2 className={styles.title}>인기 상품</h2>
                <ul className={styles.productList}>
                    {topProducts.map(product => (
                        <li key={product.productId} className={styles.productItem}>
                            <div className={styles.productInfo}>
                                <div className={styles.imageContainer}>
                                    <Link to={`/shopping/products/${product.productId}`}>
                                        <img
                                        className={styles.productImage}
                                        src={product.thumbnailUrl}
                                        alt={`상품 ${product.productId}`}
                                        />
                                    </Link>
                                </div>
                                <div className={styles.infoContainer}>
                                    <p className={styles.productName}>{product.productName}</p>
                                    <p className={styles.productPrice}>{product.price.toLocaleString()}원</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
    
};

export default HomeShopping;
