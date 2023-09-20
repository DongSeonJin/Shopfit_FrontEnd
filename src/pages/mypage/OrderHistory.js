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
    <div style={{width: '1080px', margin: '0 auto 150px'}}>
      <HeaderSubMyPage />
      <div style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '50px', width: '100%' }}>주문 내역</div>

      <div style={{ minHeight: '240px', borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray', padding: '20px', width: '90%', margin: 'auto'}}>  
        <OrderHistoryProducts orders={orders} />
      </div>
    </div>
  );
};

export default OrderHistory;
