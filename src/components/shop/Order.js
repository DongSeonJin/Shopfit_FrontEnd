import React, { useState } from 'react';
import axios from 'axios';
import addDays from 'date-fns/addDays';
import { useParams } from 'react-router';
import { useProductDetail } from '../../context/ProductDetailContext';

const Order = () => {
  const { productNum } = useParams();
  const now = new Date(Date.now());
  const { totalPrice } = useProductDetail();
  const { quantity } = useProductDetail();

  const initialOrderData = {
    userId: 100,
    totalPrice: totalPrice,
    deliveryDate: addDays(now, 3),
    address: '',
    phoneNumber: '',
    orderDate: now,
    orderStatus: '1',       
    orderProducts: [
      {
        productId: productNum,
        quantity: quantity
      }
    ]
  };

  const [orderData, setOrderData] = useState(initialOrderData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderData({
      ...orderData,
      [name]: value
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

  return (
    <div>
      <h2>Create Order</h2>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={orderData.address} onChange={handleInputChange} />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={orderData.phoneNumber} onChange={handleInputChange} />
      </div>
      <div>
        <label>totalPrice : </label>
        <span>{orderData.totalPrice}</span>
      </div>
      <div>
        <label>productId : </label>
        <span>{orderData.orderProducts[0].productId}</span>
      </div>
      <div>
        <label>quantity : </label>
        <span>{orderData.orderProducts[0].quantity}</span>
      </div>
      <button onClick={handleCreateOrder}>Create Order</button>
    </div>
  );
};

export default Order;
