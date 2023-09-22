import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";

import styles from "../../../styles/common/modal/ReviewModal.module.css";


const CouponSelectModal = ({ userId, onClose, onSelectCoupon, orderData }) => {
  const [coupons, setCoupons] = useState([]);
  const [, setSelectedCoupon] = useState(null); // 선택한 쿠폰

  useEffect(() => {
    fetch(`/coupon/${userId}`)
      .then((response) => response.json())
      .then((data) => setCoupons(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  // 쿠폰 선택 이벤트 핸들러
  const handleCouponSelect = (coupon) => {
    const totalPrice = orderData.totalPrice; // 총 가격
    const couponDiscount = coupon.discountValue; // 쿠폰 할인 값

    // 쿠폰 할인 값이 총 가격보다 크면 쿠폰 선택 불가
    if (couponDiscount > totalPrice) {
      alert("쿠폰 금액이 총 상품 금액을 초과합니다. 다른 쿠폰을 선택해주세요.");
      return;
    }

    setSelectedCoupon(coupon); // 선택한 쿠폰 상태 업데이트
    onSelectCoupon(coupon.discountValue, coupon.description, coupon.couponId); // 선택한 쿠폰 정보를 부모 컴포넌트로 전달
    onClose(); // 쿠폰 선택 후 모달 닫기
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.title}>사용 가능한 쿠폰</div>
        {coupons.map((coupon) => (
          <div key={coupon.couponId} onClick={() => handleCouponSelect(coupon)} style={{ cursor: "pointer", borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray', padding: '10px', margin: '20px 0' }}>
            <div>{coupon.description}</div>
            <div>{coupon.discountValue.toLocaleString()}원</div>
            <div>{new Date(coupon.validTo).toLocaleDateString()}까지</div>
          </div>
        ))}
        <div style={{textAlign: 'right'}}>
          <Button onClick={onClose} variant="outlined" color="error" style={{width: '120px', height: '40px', textAlign: 'center', borderRadius: '10px', fontSize: '16px'}}>닫기</Button>
        </div>
      </div>
    </div>
  );
};

export default CouponSelectModal;
