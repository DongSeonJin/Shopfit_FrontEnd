import React, { useEffect, useState } from 'react';
import axios from 'axios';
import addDays from 'date-fns/addDays';
import { useLocation, useNavigate } from 'react-router-dom';
import PurchasedProduct from './PurchasedProduct';
import SearchAddress from './SearchAddress';

const Order = () => {
  const now = new Date();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const location = useLocation();
  const selectedItems = location.state.selectedItems;

  const initialOrderData = {
    userId: selectedItems[0].userId, // You might want to replace this with the actual user ID
    totalPrice: selectedItems.reduce((total, item) => total + item.price * item.quantity, 0),
    deliveryDate: addDays(now, 3),
    address: '',
    phoneNumber: '',
    orderDate: now,
    orderStatus: '1',
    orderProducts: selectedItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
  };

  const [orderData, setOrderData] = useState(initialOrderData);

  useEffect(() => {
    // userId를 이용하여 장바구니 정보를 가져오고, 가져온 정보로 cart 상태를 업데이트
    const fetchUserCart = async () => {
      try {
        const response = await axios.get(`/cart/${orderData.userId}`);
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching user cart:', error);
      }
    };

    fetchUserCart();
  }, [orderData.userId]); // userId가 변경될 때마다 useEffect 실행

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  // 결제 누락정보 확인
  const isAddressValid = orderData.address.trim() !== '';
  const isPhoneNumberValid = orderData.phoneNumber.trim() !== '';
  const isPaymentAllowed = isAddressValid && isPhoneNumberValid;
  
  const handleCreateOrder = async () => {
    if (!isPaymentAllowed) {
      alert('주소와 연락처를 입력해주세요.');
      return;
    }  
    try {
      // 주문 생성 요청 보내고 주문 성공 시
      const response = await axios.post('/orders/create', orderData);
      console.log('Order created:', response.data);

      // 주문한 제품의 productId에 해당하는 row만 선택
      const updatedCart = cart.filter(item =>
        selectedItems.some(selected =>
          selected.productId === item.productId
        )
      );
      setCart(updatedCart); // setCart 함수로 카트를 업데이트
  
      // 주문이 성공적으로 생성되었으므로 주문 상세 페이지로 이동
      navigate(`/shopping/order/detail`, { state: { purchasedProducts: selectedItems } });

      // 주문한 상품들의 productId를 이용하여 장바구니에서 해당 상품들을 삭제
      selectedItems.forEach(async (selected) => {
        try {
          await axios.delete(`/cart/remove/${selected.cartId}`);
        } catch (error) {
          console.error('Error removing item from cart:', error);
        }
      });
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
    <div style={{ margin: '0 20%' }}>
      <h2>주문/결제</h2>
      <h4 style={{ marginTop: '50px' }}>배송정보</h4>
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '80px' }}>주소:</label>
            <input
              style={{marginRight: '10px'}}
              type="text"
              name="address"
              value={orderData.address}
              onChange={handleInputChange}
            />
            <SearchAddress />
          </div>
          <div style={{ marginTop: '50px' }}>
            <h4>주문상품</h4>
            <div>
              <PurchasedProduct products={orderData.orderProducts} />
            </div>
          </div>
          <div style={{ marginTop: '50px' }}>
            <h4>결제방식</h4>
          </div>
        </div>
        <div style={{ flex: 1, margin: '0 10%' }}>
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
