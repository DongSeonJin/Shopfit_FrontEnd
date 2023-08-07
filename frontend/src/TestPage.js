import React, { useState } from 'react';
import axios from 'axios';

function TestPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('입력한 아이디:', email);
    console.log('입력한 비밀번호:', password);
    
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email: email,
        password: password
      });

      if (response.status === 200) {
        // 로그인 성공 처리
        console.log('로그인 성공');
      }
    } catch (error) {
      // 로그인 실패 처리
      setErrorMessage('로그인에 실패했습니다.');
      console.error('로그인 실패:', error);
    }
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">이메일:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">로그인</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default TestPage;