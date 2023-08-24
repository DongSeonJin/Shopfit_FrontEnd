import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Order = () => {
    const { productNum } = useParams();

    const [formData, setFormData] = useState({
        userId: '',
        totalPrice: '',
        deliveryDate: '',
        address: '',
        phoneNumber: '',
        orderDate: '',
        orderStatus: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 주문 생성 API 호출
            const response = await fetch('http://localhost:8080/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // 주문 생성 성공 시 처리
                console.log('주문이 성공적으로 생성되었습니다.');
            } else {
                // 주문 생성 실패 시 처리
                console.error('주문 생성 실패');
            }
        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div>
            <h1>주문 생성 페이지</h1>
            <p>상품 번호: {productNum}</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="userId" placeholder="사용자 ID" onChange={handleChange} />
                <input type="number" name="totalPrice" placeholder="총 가격" onChange={handleChange} />
                <input type="datetime-local" name="deliveryDate" onChange={handleChange} />
                <input type="text" name="address" placeholder="배송 주소" onChange={handleChange} />
                <input type="text" name="phoneNumber" placeholder="전화번호" onChange={handleChange} />
                <input type="datetime-local" name="orderDate" onChange={handleChange} />
                <input type="text" name="orderStatus" placeholder="주문 상태" onChange={handleChange} />
                <button type="submit">주문 생성</button>
            </form>
        </div>
    );
};

export default Order;
