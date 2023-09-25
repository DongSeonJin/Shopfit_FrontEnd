import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import styles from '../../styles/shop/pages/Coupon.module.css';


const Coupon = () => {
  const userId = useSelector(state => state.authUser.userId);
  const couponCode = "10000COUPON";
  const navigate = useNavigate();

  const handleCouponClick = async () => {
    try {
      // 쿠폰 발급 요청
      let response = await fetch(`coupon/checkCoupon/${userId}/${couponCode}`);
      let data = await response.json();

      if (data === true) {
        // 이미 해당 유저에게 발급된 쿠폰일 때
        alert("이미 발급된 쿠폰입니다.");
      } else {
        // 쿠폰 발급 요청
        response = await fetch(`coupon/confirm/${userId}`, { method: "POST" });

        if (!response.ok) {
          // 쿠폰이 정해진 한도까지 모두 발급되었을 때
          // 서버에서 보낸 응답 본문을 JSON 형식으로 파싱
          data = await response.json();
          // 파싱한 JSON 데이터에서 메시지를 추출하여 새로운 JavaScript 에러 객체를 생성하고, 이 객체를 throw
          throw new Error(data.message);
        }

        // 쿠폰 발급 알림
        alert("쿠폰이 발급되었습니다.");

        // 메인 페이지로 리다이렉트
        navigate("/");
      }
    } catch (error) {
      // 위에서 throw한 message 속성을 alert로 보여주기
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>쿠폰 발급</div>
      <div className={styles.subtitle}>
        <img src="https://kr.object.ncloudstorage.com/projectbucket/1.jpg" alt="쿠폰발급포스터" className={styles.image} />
      </div>
      <div className={styles.clickable} onClick={handleCouponClick}>
        <img
          src="https://kr.object.ncloudstorage.com/projectbucket/2.jpg"
          alt="쿠폰다운로드"
          className={styles.image2}
        />
      </div>
      <div className={styles['link-container']}>
        <Link to='/' className={styles.link}>홈으로</Link>
      </div>
    </div>
  );
};

export default Coupon;
