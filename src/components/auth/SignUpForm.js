import React, { useState } from 'react';
import axios from 'axios';
import FileUploadComponent from '../shop/FileUploadComponent';
import { TextField, Button, Typography } from '@mui/material';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      nickname,
      imageUrl,
    };

    try {
      const response = await axios.post('/signup', formData); 
      console.log('회원가입 성공', response.data);

    } catch (error) {
      console.error('회원가입 실패', error);
    }
  };

  const handleUploadSuccess = (imageUrl) => {
    setImageUrl(imageUrl);
  }

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
           가입하기
         </Button>

       </form>
     </div>
     </div>
   );
}

export default SignupForm;
