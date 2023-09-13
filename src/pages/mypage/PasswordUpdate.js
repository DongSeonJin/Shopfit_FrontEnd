import React, { useState } from "react";
import HeaderSubMyPage from "../../components/common/HeaderSubMypage";

const PasswordUpdate = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleUpdatePassword = () => {
    // 비밀번호 업데이트 로직을 구현합니다.
  };

  return (
    <div>
      <HeaderSubMyPage />
      <h1>비밀번호 변경</h1>
      <div>
        <label>새로운 비밀번호</label>
        <input type="password" value={newPassword} onChange={handleNewPasswordChange} placeholder="새로운 비밀번호" />
      </div>
      <div>
        <label>새 비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="비밀번호 확인"
        />
      </div>
      <button onClick={handleUpdatePassword}>비밀번호 변경</button>
    </div>
  );
};

export default PasswordUpdate;
