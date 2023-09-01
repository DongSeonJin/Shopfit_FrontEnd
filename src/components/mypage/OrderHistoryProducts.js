import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios 라이브러리 import

const OrderList = ({ orders }) => {
    const [orderProducts, setOrderProducts] = useState([]);
    const [thumbnailUrls, setThumbnailUrls] = useState([]);

    useEffect(() => {
        const fetchOrderProducts = async () => {
            try {
                const orderProductsData = await Promise.all(
                    orders.map(async (order) => {
                        const response = await fetch(`/order-products/order/${order.orderId}`);
                        const data = await response.json();
                        return data[0];
                    })
                );
                setOrderProducts(orderProductsData);

                // 각 주문에 대한 첫 번째 productId를 가져와 썸네일 URL을 조회하기 위한 Promise 배열 생성
                const thumbnailPromises = orderProductsData.map((product) =>
                    getProductThumbnail(product.productId)
                );

                // 썸네일 URL을 병렬로 가져와 상태 업데이트
                const thumbnailUrlsData = await Promise.all(thumbnailPromises);
                setThumbnailUrls(thumbnailUrlsData);
            } catch (error) {
                console.error('주문상품을 불러오는 중 오류가 발생했습니다.', error);
            }
        };

        fetchOrderProducts();
    }, [orders]);

    const getProductThumbnail = async (productId) => {
        try {
            const response = await axios.get(`/shopping/products/${productId}`);
            const data = response.data;
            return data.thumbnailUrl;
        } catch (error) {
            console.error('상품 정보를 불러오는 중 오류가 발생했습니다.', error);
            return 'N/A';
        }
    };

    return (
        <div>
            {orders.length > 0 ? (
                orders.map((order, index) => (
                    <div key={index}>
                        <div>{order.orderId}</div>
                        <div>상품번호: {orderProducts[index] ? orderProducts[index].productId : 'N/A'}</div>
                        <div>
                            썸네일 URL: {thumbnailUrls[orderProducts[index]] ? thumbnailUrls[orderProducts[index]] : 'N/A'}
                        </div>
                        <div>{order.totalPrice.toLocaleString()} 원</div>
                    </div>
                ))
            ) : (
                <p>주문 내역이 없습니다.</p>
            )}
        </div>
    );
};

export default OrderList;
