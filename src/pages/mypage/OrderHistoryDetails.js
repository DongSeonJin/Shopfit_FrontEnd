/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { formatDateTime } from "../../components/common/DateUtils";
import ReviewModal from "./../../components/common/modal/ReviewModal";
import HeaderSubMyPage from "../../components/common/HeaderSubMypage";
import { Button } from "@mui/material";

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
          const productResponse = await fetch(`/shopping/detail/${orderProduct.productId}`);
          const productData = await productResponse.json();
          return { ...orderProduct, productInfo: productData };
        });

        // 모든 상품 정보를 가져온 후 상태를 업데이트합니다.
        const productsWithInfo = await Promise.all(productPromises);
        setOrderProducts(productsWithInfo);
      } catch (error) {
        console.error("주문 정보 또는 주문 상품 정보를 가져오는 중 오류가 발생했습니다.", error);
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
    console.log("Opening modal for productId:", productId);
    setIsReviewModalOpen(true);
    setSelectedProductId(productId);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  return (
    <div style={{ width: "1080px", margin: "0 auto 150px" }}>
      <HeaderSubMyPage />
      <div style={{ fontSize: "36px", fontWeight: "bold", textAlign: "center", marginBottom: "50px", width: "100%" }}>
        주문 상세 내역
      </div>

      <div
        style={{
          minHeight: "240px",
          borderTop: "1px solid lightgray",
          borderBottom: "1px solid lightgray",
          padding: "20px 20px 50px 20px",
          width: "90%",
          margin: "auto",
        }}
      >
        {order ? (
          <div>
            <div style={{ margin: "20px 0", padding: "10px", display: "flex" }}>
              <div style={{ flex: "1" }}>
                <div>주문 날짜: {formatDateTime(order.orderDate)}</div>
                <div>결제 합계: {order.totalPrice.toLocaleString()} 원</div>
              </div>
              <div style={{ flex: "1" }}>
                <div>주문 번호: {order.orderId}</div>
                <div>주문 상태: {order.orderStatus}</div>
              </div>
            </div>

            <div style={{ width: "100%" }}>
              <div style={{ paddingLeft: "10px", fontSize: "20px", fontWeight: "bold" }}>주문 상품 목록</div>
              {orderProducts.map((orderProduct, index) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ flex: "4" }}>
                    <Link to={`/shopping/products/${orderProduct.productInfo.productId}`}>
                      <img
                        style={{ width: "180px", height: "180px", border: "1px white solid", borderRadius: "10px" }}
                        src={orderProduct.productInfo.thumbnailUrl}
                        alt="상품 이미지"
                      />
                    </Link>
                  </div>
                  
                  <div style={{ flex: "8", textAlign: "left", padding: '0 20px' }}>
                    <div style={{fontSize: '20px', marginBottom: '20px'}}>{orderProduct.productInfo.productName}</div>
                    <div style={{textAlign: 'right'}}>{orderProduct.quantity} 개</div>
                  </div>
                  <div style={{ flex: "2" }}>{orderProduct.productInfo.price.toLocaleString()} 원</div>
                  <div style={{ flex: "2" }}>
                    {(orderProduct.productInfo.price * orderProduct.quantity).toLocaleString()} 원
                  </div>
                  <div style={{ flex: "2" }}>
                    <div style={{ height: "90px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {order.orderStatus}
                    </div>
                    <div style={{ height: "90px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {order.orderStatus != 5 ? (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => alert("구매확정 후 리뷰를 남겨주세요.")}
                          style={{ width: "100px", height: "40px" }}
                        >
                          리뷰 작성
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          onClick={() => openReviewModal(orderProduct.productInfo.productId)}
                          style={{ width: "100px", height: "40px" }}
                        >
                          리뷰 작성
                        </Button>
                      )}
                      {isReviewModalOpen && (
                        <ReviewModal onClose={closeReviewModal} productId={selectedProductId} userId={order.userId} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          "로딩 중..."
        )}
      </div>

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Link to="/orderhistory">목록으로</Link>
      </div>
    </div>
  );
};

export default OrderHistoryDetails;
