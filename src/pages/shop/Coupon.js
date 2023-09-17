import React, { useState } from "react";
import { useNavigate } from "react-router";

const Coupon = () => {
  const userId = 1; // 추후 수정하기
  const couponCode = "10000COUPON";
  const navigate = useNavigate();

  const handleCouponClick = async () => {
    try {
      // 쿠폰 발급 요청
      const response = await fetch(`coupon/checkCoupon/${userId}/${couponCode}`);
      const data = await response.json();

      if (data === true) {
        // 이미 해당 유저에게 발급된 쿠폰일 때
        alert("이미 발급된 쿠폰입니다.");
      } else {
        // 쿠폰 발급 요청
        await fetch(`coupon/confirm/${userId}`, {
          method: "POST",
        });
        // 쿠폰 발급 알림
        alert("쿠폰이 발급되었습니다.");

        // 메인 페이지로 리다이렉트
        navigate("/");
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <button onClick={handleCouponClick}>쿠폰 발급</button>
    </div>
  );
};

export default Coupon;
