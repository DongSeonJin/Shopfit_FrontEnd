import React, { useEffect, useState } from "react";
import axios from "axios";
import FileUploadComponent from "../../components/shop/FileUploadComponent";
import { TextField, Button, Typography } from "@mui/material";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router";
import { signUp } from "../../lib/api/authApi";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatching, setIsMatching] = useState(true);
  const [nickname, setNickname] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호, 확인비밀번호 일치하는지 확인.
    if (password != confirmPassword) {
      setIsMatching(false);
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const formData = {
      email,
      password,
      nickname,
      imageUrl,
      confirmPassword
    };

    //회원가입 api
    signUp(formData)
    .then((response) => {
      if (window.confirm("회원가입이 완료되었습니다.")) {
        navigate("/login");
      }
    }).catch((error) => {

       // 서버로부터의 에러 메시지를 받아 alert 띄우기
       if(error.response && error.response.data){
        alert(error.response.data.message); 
     } else{
        alert('회원가입 실패');
     }

    });
  };

  const handleUploadSuccess = (imageUrl) => {
    setImageUrl(imageUrl);
  };

  // 비밀번호 또는 확인 비밀번호가 변경 될 때마다 실행되는 useEffect
  useEffect(() => {
    if (password && confirmPassword) {
      setIsMatching(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  const handleProfileImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      // 파일 선택 시 POST 요청
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("/api/imageOptimizer/3", formData)
        .then((response) => {
          console.log("파일 업로드 성공", response.data);
          setProfileImage(response.data);
        })
        .catch((error) => {
          console.error("파일 업로드 실패", error);
        });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <Typography variant="h4" component="h1">
          회원가입
        </Typography>{" "}
        <br />
        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />{" "}
          <br />
          <TextField
            id="password"
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />{" "}
          <br />
          <TextField
            id="confirmPassword"
            label="비밀번호 확인"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!isMatching}
            helperText={!isMatching ? "비밀번호가 일치하지 않습니다." : "비밀번호가 일치합니다."}
            required
          />{" "}
          <br />
          <TextField
            id="nickname"
            label="닉네임:"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />{" "}
          <br />
          <div>
            <Typography variant="body1">프로필 이미지 업로드</Typography>
            <div>
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile Preview"
                  style={{ width: "200px", height: "200px", borderRadius: "50%" }}
                />
              ) : (
                <div
                  style={{ width: "200px", height: "200px", backgroundColor: "lightgray", borderRadius: "50%" }}
                ></div>
              )}
              <input type="file" accept="image/*" onChange={handleProfileImageUpload} />
            </div>
          </div>{" "}
          <br />
          <Button variant="contained" color="primary" type="submit">
            회원가입하기
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
