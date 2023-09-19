/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { formatDateTime } from "../../components/common/DateUtils";
import { OrderStatusUpdater } from "../../components/shop/OrderStatusUpdater";

const OrderHistoryProducts = ({ orders }) => {
  const [productDetails, setProductDetails] = useState([]);
  const [numberOfProducts, setNumberOfProducts] = useState([]);

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
              const productResponse = await fetch(`/shopping/products/${productIds[0]}`);
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
            <div>주문날짜: {formatDateTime(order.orderDate)}</div>
            <div>주문번호: {order.orderId}</div>
            <div>{index}</div>

            {productDetails[index] ? (
              <div style={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                <div style={{ flex: "3", textAlign: "left" }}>
                  <Link to={`/orderhistory/${order.orderId}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <img
                      src={productDetails[index].thumbnailUrl}
                      alt="상품 이미지"
                      style={{ width: "180px", height: "180px" }}
                    />
                  </Link>
                </div>
                <div style={{ flex: "6", textAlign: "left" }}>
                  <Link to={`/orderhistory/${order.orderId}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {numberOfProducts[index] > 1 ? (
                      <div style={{ display: "flex" }}>
                        <div style={{ marginRight: "20px" }}>{productDetails[index].productName}</div>
                        <div>외 {numberOfProducts[index] - 1}건</div>
                      </div>
                    ) : (
                      <div>{productDetails[index].productName}</div>
                    )}
                  </Link>
                </div>
                <div style={{ flex: "2" }}>{order.totalPrice.toLocaleString()} 원</div>
                <div style={{ flex: "1" }}>
                  <div>
                    주문상태
                    <br />
                    {order.orderStatus}
                  </div>
                  {order.orderStatus == 2 ? (
                    <button
                      onClick={() => {
                        OrderStatusUpdater(order.orderId, 5);
                        window.location.reload();
                      }}
                    >
                      구매확정
                    </button>
                  ) : (
                    <button disabled>구매확정</button>
                  )}
                </div>
              </div>
            ) : (
              "로딩 중..."
            )}
          </div>
        ))
      ) : (
        <div style={{ height: '200px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>주문 내역이 없습니다.</div>
      )}
    </div>
  );
};

export default OrderHistoryProducts;