import React, { useState } from 'react';
import axios from 'axios';
import addDays from 'date-fns/addDays';
import { useParams } from 'react-router-dom';
import { useProductDetail } from '../../context/ProductDetailContext';

import PurchasedProduct from './PurchasedProduct';
import SearchAddress from './SearchAddress';

const Order = () => {
  const { productNum } = useParams();
  const now = new Date();
  const productDetail = useProductDetail();

  const initialOrderData = {
    userId: 100, // You might want to replace this with the actual user ID
    totalPrice: productDetail.totalPrice,
    deliveryDate: addDays(now, 3),
    address: '',
    phoneNumber: '',
    orderDate: now,
    orderStatus: '1',
    orderProducts: [
      {
        productId: productNum,
        quantity: productDetail.quantity,
      },
    ],
  };

  const [orderData, setOrderData] = useState(initialOrderData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const handleCreateOrder = async () => {
    try {
      const response = await axios.post('/orders/create', orderData);
      console.log('Order created:', response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleAddressSelected = (selectedAddress) => {
    setOrderData({
      ...orderData,
      address: selectedAddress,
    });
  };

  return (
    <div style={{margin: '0 20%'}}>
      <h2>주문/결제</h2>
      <h4 style={{marginTop: '50px'}}>배송정보</h4>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <div>
            <label style={{ width: '80px' }}>이름:</label>
            <input
              type="text"
              name="name"
              value={orderData.userId}
              readOnly
            />
          </div>
          <div>
            <label style={{ width: '80px' }}>이메일:</label>
            <input
              type="email"
              name="email"
              value={orderData.userId}
              readOnly
            />
          </div>
          <div>
            <label style={{ width: '80px' }}>연락처:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={orderData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label style={{ width: '80px' }}>주소:</label>
            <input
              type="text"
              name="address"
              value={orderData.address}
              onChange={handleInputChange}
            />
            <SearchAddress onAddressSelected={handleAddressSelected} />
          </div>
          <div style={{ marginTop: '50px' }}>
            <h4>주문상품</h4>
            <div>
              <PurchasedProduct products={orderData.orderProducts} />
            </div>
          </div>
          <div style={{marginTop: '50px'}}>
            <h4>결제방식</h4>
          </div>
        </div>
        <div style={{ flex: 1, margin: '0 10%'}}>
          <div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>총 상품 금액:</div>
                <div>{orderData.totalPrice.toLocaleString()}원</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>배송비:</div>
                <div>3,000원</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>최종 결제 금액:</div>
                <div>{(orderData.totalPrice + 3000).toLocaleString()}원</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              <button onClick={handleCreateOrder}>결제하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
