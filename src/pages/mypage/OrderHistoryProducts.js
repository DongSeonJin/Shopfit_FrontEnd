/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { formatDateTime } from "../../components/common/DateUtils";
import { OrderStatusUpdater } from "../../components/shop/OrderStatusUpdater";
import { Button } from "@mui/material";

const OrderHistoryProducts = ({ orders }) => {
  const [productDetails, setProductDetails] = useState([]);
  const [numberOfProducts, setNumberOfProducts] = useState([]);

  const orderStatusMapping = {
    1: "결제대기",
    2: "결제완료",
    3: "배송중",
    4: "배송완료",
    5: "구매확정",
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const details = await Promise.all(
          sortedOrders.map(async (order, index) => {
            const response = await fetch(`/order-products/order/${order.orderId}`);
            const data = await response.json();
            const productIds = data.map((item) => item.productId);

            setNumberOfProducts((prevNumberOfProducts) => [
              ...prevNumberOfProducts.slice(0, index),
              productIds.length,
              ...prevNumberOfProducts.slice(index + 1),
            ]);

            if (productIds.length > 0) {
              const productResponse = await fetch(`/shopping/detail/${productIds[0]}`);
              const productData = await productResponse.json();
              return productData;
            }
            return null;
          })
        );

        setProductDetails(details);
      } catch (error) {
        console.error("상품 정보를 가져오는 중 오류가 발생했습니다.", error);
      }
    };

    const sortedOrders = orders.slice().sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    fetchProductDetails();
  }, [orders]);

  // 주문을 orderDate를 기준으로 역순으로 정렬
  const sortedOrders = orders.slice().sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

  return (
    <div>
      {sortedOrders.length > 0 ? (
        sortedOrders.map((order, index) => (
          <div style={{ margin: "10px 0" }} key={order.orderId}>
            <div style={{ paddingLeft: "10px", marginTop: "30px" }}>주문날짜:</div>
            <div style={{ marginBottom: "15px", paddingLeft: "10px" }}>{formatDateTime(order.orderDate)}</div>

            {productDetails[index] ? (
              <div style={{ display: "flex", alignItems: "center", textAlign: "center", marginBottom: "50px" }}>
                <div style={{ textAlign: "left" }}>
                  <Link to={`/orderhistory/${order.orderId}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <img
                      src={productDetails[index].thumbnailUrl}
                      alt="상품 이미지"
                      style={{ width: "180px", height: "180px", border: "1px solid white", borderRadius: "10px" }}
                    />
                  </Link>
                </div>
                <div style={{ flex: "6", textAlign: "left" }}>
                  <Link to={`/orderhistory/${order.orderId}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {numberOfProducts[index] > 1 ? (
                      <div style={{ padding: "0 20px" }}>
                        <div style={{ fontSize: "20px", marginBottom: "20px" }}>
                          {productDetails[index].productName}
                        </div>
                        <div style={{ textAlign: "right" }}>외 {numberOfProducts[index] - 1}건</div>
                      </div>
                    ) : (
                      <div style={{padding: '0 20px', fontSize: '20px', marginBottom: '20px'}}>{productDetails[index].productName}</div>
                    )}
                  </Link>
                </div>
                <div style={{ flex: "2" }}>{order.totalPrice.toLocaleString()} 원</div>

                <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
                  <div style={{ height: "90px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    주문상태
                    <br />
                    {orderStatusMapping[order.orderStatus]}
                  </div>
                  <div style={{ height: "90px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {/* 결제완료 : 파란색(확정 가능) / 구매확정 : 흰색, 그 외 : 빨간색 */}
                    {order.orderStatus == "2" ? (
                      <Button
                        variant="outlined"
                        onClick={() => {
                          OrderStatusUpdater(order.orderId, 5);
                          window.location.reload();
                        }}
                        style={{ width: "100px", height: "40px" }}
                      >
                        구매확정
                      </Button>
                    ) : order.orderStatus == "5" ? (
                      <Button variant="outlined" color="inherit" disable style={{ width: "100px", height: "40px" }}>
                        구매확정
                      </Button>
                    ) : (
                      <Button variant="outlined" color="error" disable style={{ width: "100px", height: "40px" }}>
                        구매확정
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              "로딩 중..."
            )}
          </div>
        ))
      ) : (
        <div
          style={{
            height: "240px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
          }}
        >
          주문 내역이 없습니다.
        </div>
      )}
    </div>
  );
};

export default OrderHistoryProducts;
