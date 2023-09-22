import React, { useEffect, useState } from "react";
import HeaderSubMyPage from "../../components/common/HeaderSubMypage";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";


const MyCoupons = () => {
  const userId = useSelector(state => state.authUser.userId);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetch(`/coupon/${userId}`)
      .then((response) => response.json())
      .then((data) => setCoupons(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div style={{maxWidth: '720px', width: '100%', margin: 'auto', marginBottom: '150px'}}>
      <HeaderSubMyPage />
      <div style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '50px', width: '100%' }}>쿠폰함</div>

      <div style={{ borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray', minHeight: '240px', padding: '20px', marginBottom: '50px'}}>
        {coupons.length === 0 ? (
            <div style={{textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', height: '240px'}}>
              보유하신 쿠폰이 없습니다.
            </div>
          ) : (
          coupons.map((coupon) => (
            <div>
              <div key={coupon.couponId} style={{borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray', margin: '30px 0', padding: '20px'}}>
                <div style={{fontSize: '24px', fontWeight: 'bold'}}>{coupon.description}</div>
                <div style={{textAlign: "right"}}>{coupon.discountValue.toLocaleString()} 원</div>
                <div style={{textAlign: "right"}}>{new Date(coupon.validTo).toLocaleDateString()} 까지</div>
              </div>
              <div style={{ marginBottom: '5px'}}>유효기간이 지난 쿠폰은 자동 삭제됩니다.</div>
            </div>
        )))}
      </div>
      <div style={{ textAlign: 'right'}}>
        <Link to='/mypage/info' style={{textDecoration: 'none'}}>이전으로</Link>
      </div>
    </div>
  );
};

export default MyCoupons;
