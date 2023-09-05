import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileUploadComponent from '../../components/shop/FileUploadComponent';
import { TextField, Button, Typography } from '@mui/material';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMatching, setIsMatching] = useState(true);
  const [nickname, setNickname] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 비밀번호, 확인비밀번호 일치하는지 확인.
    if (password != confirmPassword) {
      setIsMatching(false);
      alert("비밀번호가 일치하지 않습니다.")
      return; 
    }

    const formData = {
      email,
      password,
      nickname,
      imageUrl,
    };

    try {
      const response = await axios.post('/signup', formData); 
      console.log('회원가입 성공', response.data);
      if (window.confirm('회원가입이 완료되었습니다.')) {
        navigate ('/login');
      }

    } catch (error) {
      console.error('회원가입 실패', error);

    }
  };

  const handleUploadSuccess = (imageUrl) => {
    setImageUrl(imageUrl);
  }

  // 비밀번호 또는 확인 비밀번호가 변경 될 때마다 실행되는 useEffect
  useEffect (() => {
    if (password && confirmPassword) {
      setIsMatching (password === confirmPassword);
    }
  }, [password, confirmPassword]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>

    <div>
      <Typography variant="h4" component="h1">회원가입</Typography> <br />
      
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /> <br />
        
        <TextField
          id="password"
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /> <br />

        <TextField
            id="confirmPassword"
            label="비밀번호 확인"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!isMatching}
            helperText={!isMatching? "비밀번호가 일치하지 않습니다.":"비밀번호가 일치합니다."}
            required
          /> <br />

        <TextField
            id="nickname"
            label="닉네임:"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
        /> <br />

        <div>
           <Typography variant='body1'>프로필 이미지 업로드</Typography>
           <FileUploadComponent onUploadSuccess={handleUploadSuccess} />
         </div> <br />

         <Button variant='contained' color='primary' type='submit'>
           회원가입하기
         </Button>



       </form>
     </div>
     </div>
   );
}

export default SignupForm;
