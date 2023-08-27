import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PurchasedProduct = ({ products }) => {

    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const promises = products.map(product =>
                    axios.get("/shopping/products/" + product.productId)
                );
                const responses = await Promise.all(promises);
                const fetchedProductData = responses.map(response => response.data);
                setProductData(fetchedProductData);
            } catch (error) {
                console.error("Error fetching product data:", error);
                setProductData([]); // Error occurred, set data to empty array
            }
        };

        fetchProductData();
    }, [products]);

    return (
        <div>
            <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {productData.map((product, index) => (
                    <li key={product.productId} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                        <img src={product.thumbnailUrl} alt={product.productName} style={{ width: '100px', height: '100px'}} />
                        <div style={{ width: '1px', height: '80px', backgroundColor: '#ccc', margin: '0 5px' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: '5px 0' }}>
                            <p style={{ width: '300px', marginRight: '5px' }}>상품명: {product.productName}</p>
                            <div style={{ width: '1px', height: '80px', backgroundColor: '#ccc', margin: '0 5px' }}></div>
                            <p style={{ width: '150px', marginRight: '5px' }}>수량: {products[index].quantity}</p>
                            <div style={{ width: '1px', height: '80px', backgroundColor: '#ccc', margin: '0 5px' }}></div>
                            <p style={{ width: '150px' }}>가격: {(products[index].quantity * product.price).toLocaleString()}원</p>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PurchasedProduct;
