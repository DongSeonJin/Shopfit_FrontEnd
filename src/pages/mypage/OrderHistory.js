import React, { useState, useEffect } from "react";

import OrderHistoryProducts from "./OrderHistoryProducts";
import HeaderSubMyPage from "../../components/common/HeaderSubMypage";

const OrderHistory = () => {
  const userId = 1;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(`/orders/user/${userId}`);
        const data = await response.json();

        setOrders(data);
      } catch (error) {
        console.error("주문 내역을 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    // 주문 내역 데이터를 가져옵니다.
    fetchOrderHistory();
  }, []);

  return (
    <div>
      <HeaderSubMyPage />
      <div style={{ margin: "0 20% 200px 20%" }}>
        <h1 style={{ margin: "0 0 30px 0" }}>주문 내역</h1>
        <div>
          <OrderHistoryProducts orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
