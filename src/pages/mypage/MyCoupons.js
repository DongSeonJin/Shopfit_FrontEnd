import React, { useEffect, useState } from "react";
import HeaderSubMyPage from "../../components/common/HeaderSubMypage";
import { Link } from 'react-router-dom';

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
    <div style={{maxWidth: '720px', width: '100%', margin: 'auto'}}>
      <HeaderSubMyPage />
      <div>
        {coupons.map((coupon) => (
          <div key={coupon.couponId} style={{borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray', margin: '30px 0', padding: '20px'}}>
            <div style={{fontSize: '24px', fontWeight: 'bold'}}>{coupon.description}</div>
            <div style={{textAlign: "right"}}>{coupon.discountValue.toLocaleString()} 원</div>
            <div style={{textAlign: "right"}}>{new Date(coupon.validTo).toLocaleDateString()} 까지</div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: '5px'}}>유효기간이 지난 쿠폰은 자동 삭제됩니다.</div>
      <div style={{ marginBottom: '150px', textAlign: 'right'}}>
        <Link to='http://localhost:3000/mypage/info' style={{textDecoration: 'none'}}>이전으로</Link>
      </div>
    </div>
  );
};

export default MyCoupons;
