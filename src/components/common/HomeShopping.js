import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div>
            <h2>인기 상품</h2>
            <ul className="productContainer">
                {topProducts.map(product => (
                    <li key={product.productId}>
                        <div className="productInfo">
                            <h3 className="productName">상품 ID: {product.productId}</h3>
                            <img
                                className="productImage"
                                src={product.thumbnailUrl}
                                alt={`상품 ${product.productId}`}
                                style={{ width: '180px', height: '160px', objectFit: 'cover' }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default HomeShopping;
