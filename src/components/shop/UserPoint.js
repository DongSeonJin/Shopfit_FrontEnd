import React, { useEffect, useState } from "react";

const UserPoint = ({ userPoint, totalPrice, onUpdateUserPoint, selectedCouponId }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (selectedCouponId) {
      setInputValue("0");
    }
  }, [selectedCouponId]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const updatePoint = () => {
    const enteredValue = parseInt(inputValue);
    // 입력 값이 NaN (숫자가 아닌 경우) 또는 음수인 경우 0으로 설정
    if (isNaN(enteredValue) || enteredValue < 0) {
      setInputValue("0");
    } else if (enteredValue > userPoint) {
      // 포인트 입력값이 현재 포인트(userPoint)보다 높은 경우
      alert(`최대 ${userPoint}포인트까지 사용 가능합니다.`);
      // 입력값을 현재 포인트로 설정
      setInputValue(`${userPoint}`);
    } else if (enteredValue > totalPrice) {
      // 포인트 입력값이 총 가격(totalPrice)보다 높은 경우
      alert(`최대 ${totalPrice}포인트까지 사용 가능합니다.`);
      // 입력값을 총 가격으로 설정
      setInputValue(`${totalPrice}`);
    } else {
      // 사용자가 입력한 포인트를 상위 컴포넌트(Order.js)로 전달
      onUpdateUserPoint(enteredValue);
    }
  };

  return (
    <div>
      <div>
        <input type="number" placeholder="포인트를 입력하세요" value={inputValue} onChange={handleInputChange} />
        <button onClick={updatePoint}>사용하기</button>
      </div>
      <div>
        <span>현재 포인트: {userPoint} P</span>
      </div>
    </div>
  );
};

export default UserPoint;
