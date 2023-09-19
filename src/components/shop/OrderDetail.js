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
        <div style={{ maxWidth: '1420px', width: '100%', margin: '0 auto 150px'}}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '50px'}}>주문완료</div>
            <PurchasedProduct products={purchasedProducts} />

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{margin: '50px 0'}}>
                    <Link to="/" style={{ textAlign: 'center', textDecoration: 'none', color: 'inherit', fontSize: '24px'}}>
                        <div>총 주문 가격 : {totalPrice.toLocaleString()}원</div>
                        <div style={{margin: '8px'}}>상품 구매가 완료되었습니다.</div>
                        <div style={{fontSize: '16px'}}>클릭하면 홈으로 돌아갑니다.</div>
                    </Link> 
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
