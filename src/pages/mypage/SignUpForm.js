import React, { useEffect, useState } from "react";
import axios from "axios";
// import FileUploadComponent from "../../components/shop/FileUploadComponent";

import { TextField, Button } from "@mui/material";
// import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatching, setIsMatching] = useState("true");
  const [nickname, setNickname] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호, 확인비밀번호 일치하는지 확인.
    if (password !== confirmPassword) {
      setIsMatching(false);
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const formData = {
      email,
      password,
      confirmPassword,
      nickname,
      imageUrl,
    };

    try {
      const response = await axios.post("/signup", formData);
      console.log("회원가입 성공", response.data);
      if (window.confirm("회원가입이 완료되었습니다.")) {
        navigate("/login");
      }
    } catch (error) {
      console.error("회원가입 실패", error);
    }
  };

  // const handleUploadSuccess = (imageUrl) => {
  //   setImageUrl(imageUrl);
  // };

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
          setImageUrl(response.data);
        })
        .catch((error) => {
          console.error("파일 업로드 실패", error);
        });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "480px" }}>
        {/* <Typography variant="h4" component="h1">
          회원가입
        </Typography>{" "} */}
        <div style={{ fontSize: "36px", fontWeight: "bold", textAlign: "center", marginBottom: "50px" }}>회원가입</div>

        <form onSubmit={handleSubmit}>
          <div style={{ fontWeight: "bold", marginBottom: "5px" }}>이메일</div>
          <TextField
            id="email"
            label="이메일"
            type="email"
            value={email}
            style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px", width: "100%" }}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div style={{ fontWeight: "bold", marginBottom: "5px" }}>비밀번호</div>
          <div style={{ fontWeight: "bold", marginBottom: "5px", fontSize: "12px", color: "lightgray" }}>
            영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </div>
          <TextField
            id="password"
            label="비밀번호"
            type="password"
            value={password}
            style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px", width: "100%" }}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div style={{ fontWeight: "bold", marginBottom: "5px" }}>비밀번호 확인</div>
          <TextField
            id="confirmPassword"
            label="비밀번호 확인"
            type="password"
            value={confirmPassword}
            style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px", width: "100%" }}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!isMatching && confirmPassword}
            helperText={
              !confirmPassword ? "" : !isMatching ? "비밀번호가 일치하지 않습니다." : "비밀번호가 일치합니다."
            }
            required
          />
          <div style={{ fontWeight: "bold", marginBottom: "5px" }}>닉네임</div>
          <div style={{ fontWeight: "bold", marginBottom: "5px", fontSize: "12px", color: "lightgray" }}>
            다른 유저와 겹치지 않도록 입력해주세요.
          </div>
          <TextField
            id="nickname"
            label="닉네임:"
            type="text"
            value={nickname}
            style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px", width: "100%" }}
            onChange={(e) => setNickname(e.target.value)}
          />
          <div>
            {/* <Typography variant="body1">프로필 이미지 업로드</Typography> */}
            <div style={{ display: "flex", height: "30px" }}>
              <div style={{ flex: "1", fontWeight: "bold", lineHeight: "30px" }}>프로필 이미지</div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageUpload}
                style={{ flex: "3", lineHeight: "30px" }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ margin: "50px 0", display: "flex", justifyContent: "center" }}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Profile Preview"
                    style={{ width: "360px", height: "360px", border: "1px white solid", borderRadius: "50%" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "360px",
                      height: "360px",
                      backgroundColor: "gray",
                      border: "1px white solid",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: "100px" }}>
            <Button
              variant="outlined"
              type="submit"
              style={{
                width: "360px",
                height: "60px",
                textAlign: "center",
                borderRadius: "10px",
                fontSize: "24px",
                marginBottom: "20px",
              }}
            >
              회원가입하기
            </Button>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>이미 아이디가 있으신가요?</div>
              <Link
                to="http://localhost:3000/login"
                style={{ color: "white", fontWeight: "bold", paddingLeft: "20px" }}
              >
                {" "}
                로그인
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
