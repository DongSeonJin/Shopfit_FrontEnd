import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PurchasedProduct from './PurchasedProduct';

const OrderDetail = () => {
    const location = useLocation();
    const { purchasedProducts } = location.state;

    // Calculate total price
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
    // Calculate the total price
    const totalPriceSum = purchasedProducts.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
    );
    setTotalPrice(totalPriceSum);
    }, [purchasedProducts]);


    return (
        <div style={{ textAlign: 'center', margin: '25px 0 100px 0'}}>
            <h2 style={{margin: '25px 0 25px 0'}}>주문완료</h2>
            <PurchasedProduct products={purchasedProducts} />
            <Link to="/" style={{ textAlign: 'center', marginTop: '20px', textDecoration: 'none', color: 'inherit'}}>
                <p>총 주문 가격: {totalPrice.toLocaleString()}원</p>
                <p>상품 구매가 완료되었습니다.</p>
            </Link>
        </div>
    );
};

export default OrderDetail;
