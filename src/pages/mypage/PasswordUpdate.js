import React, { useState } from "react";

import { Button } from "@mui/material";

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
    <div style={{maxWidth: '720px', width: '100%', margin: '0 auto 150px', minHeight: '480px'}}>
      <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '100px', marginBottom: '50px', textAlign: 'center'}}>비밀번호 변경</div>
      <div style={{ display: 'flex', marginBottom: '25px'}}>
        <label style={{flex: '1'}}>새로운 비밀번호</label>
        <input style={{flex: '1', padding: '0 5px', height: '30px'}} type="password" value={newPassword} onChange={handleNewPasswordChange} placeholder="새로운 비밀번호" />
      </div>
      <div style={{ display: 'flex', marginBottom: '50px'}}>
        <label style={{flex: '1'}}>새 비밀번호 확인</label>
        <input style={{flex: '1', padding: '0 5px', height: '30px'}} type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="비밀번호 확인" />
      </div>
      <div style={{textAlign: 'center', marginBottom: '150px'}}>
        <Button onClick={handleUpdatePassword} variant="outlined" style={{width: '360px', height: '60px', textAlign: 'center', margin: '20px 0', borderRadius: '10px', fontSize: '24px'}}>비밀번호 변경</Button>
      </div>
    </div>
  );
};

export default PasswordUpdate;
