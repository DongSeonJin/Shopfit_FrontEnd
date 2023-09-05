/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatDateTime } from '../common/DateUtils';

import ReviewModal from '../common/modal/ReviewModal';

const OrderHistoryDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [orderProducts, setOrderProducts] = useState([]);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const orderResponse = await fetch(`/orders/${orderId}`);
                const orderData = await orderResponse.json();
                setOrder(orderData);

                // 주문 상품 정보를 조회합니다.
                const orderProductsResponse = await fetch(`/order-products/order/${orderId}`);
                const orderProductsData = await orderProductsResponse.json();

                // 각 주문 상품에 대한 상품 정보를 조회합니다.
                const productPromises = orderProductsData.map(async (orderProduct) => {
                    const productResponse = await fetch(`/shopping/products/${orderProduct.productId}`);
                    const productData = await productResponse.json();
                    return { ...orderProduct, productInfo: productData };
                });

                // 모든 상품 정보를 가져온 후 상태를 업데이트합니다.
                const productsWithInfo = await Promise.all(productPromises);
                setOrderProducts(productsWithInfo);
            } catch (error) {
                console.error('주문 정보 또는 주문 상품 정보를 가져오는 중 오류가 발생했습니다.', error);
            }
        };

        fetchOrderDetails();
        if (order && order.orderStatus === 5) {
            setIsReviewModalOpen(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId]);

    // ReviewModal을 열고 닫는 함수
    const openReviewModal = (productId) => {
        console.log('Opening modal for productId:', productId);
        setIsReviewModalOpen(true);
        setSelectedProductId(productId);
    };

    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
    };

    return (
        <div style={{margin: '0 20%'}}>
            {order ? (
                <div>
                    <div style={{margin: '50px 0'}}>
                        <div>주문 상세 정보</div>
                        <div>주문 번호: {order.orderId}</div>
                        <div>주문 날짜: {formatDateTime(order.orderDate)}</div>
                        <div>주문 상태: {order.orderStatus}</div>
                        <div>결제 합계: {order.totalPrice.toLocaleString()} 원</div>
                    </div>

                    <div style={{width: '100%'}}>
                        <div>주문 상품 목록</div>
                        {orderProducts.map((orderProduct, index) => (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', textAlign: 'center' }}>
                                <div style={{ flex: '4' }}>
                                    <Link to={`/shopping/products/${orderProduct.productInfo.productId}`}>
                                        <img style={{width: '180px', height: '180px' }} src={orderProduct.productInfo.thumbnailUrl} alt="상품 이미지" />
                                    </Link>
                                </div>
                                <div style={{ flex: '8', textAlign: 'left' }}>{orderProduct.productInfo.productName}</div>
                                <div style={{ flex: '1' }}>{orderProduct.quantity} 개</div>
                                <div style={{ flex: '2' }}>{orderProduct.productInfo.price.toLocaleString()} 원</div>
                                <div style={{ flex: '2' }}>{((orderProduct.productInfo.price)*(orderProduct.quantity)).toLocaleString()} 원</div>
                                <div style={{ flex: '2' }}>
                                    <div>{order.orderStatus}</div>
                                    {order.orderStatus != 5 ? (
                                        <button onClick={() => alert('구매확정 후 리뷰를 남겨주세요.')}>리뷰작성</button>
                                    ) : (
                                        <button onClick={() => openReviewModal(orderProduct.productInfo.productId)}>리뷰작성</button>
                                    )}
                                    {isReviewModalOpen && (
                                        <ReviewModal onClose={closeReviewModal} productId={selectedProductId} userId={order.userId} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <Link to='/orderhistory'>목록으로</Link>
                    </div>
                </div>
            ) : (
                '로딩 중...'
            )}
        </div>
    );
};

export default OrderHistoryDetails;
