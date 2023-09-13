import React, { useEffect, useState } from "react";
import HeaderSubMyPage from "../../components/common/HeaderSubMypage";

const MyCoupons = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    // userId 추후 수정하기
    const userId = 1;

    fetch(`/coupon/${userId}`)
      .then((response) => response.json())
      .then((data) => setCoupons(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <HeaderSubMyPage />
      <div>
        {coupons.map((coupon) => (
          <div key={coupon.couponId}>
            <hr />
            <div>{coupon.description}</div>
            <div>{coupon.discountValue}원</div>
            <div>{new Date(coupon.validTo).toLocaleDateString()}까지</div>
            <hr />
            <br />
          </div>
        ))}
      </div>
      <div>유효기간이 지난 쿠폰은 자동 삭제됩니다.</div>
    </div>
  );
};

export default MyCoupons;
