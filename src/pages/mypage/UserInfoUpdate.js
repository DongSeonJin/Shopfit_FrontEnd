import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const UserInfoUpdate = () => {
  const [nickname, setNickname] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const userId = 1; // 임시로 설정한 userId 변수 -> 추후 수정해야 함
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // 서버로 보낼 데이터
  const userUpdateData = {
    userId: userId,
    nickname: nickname,
    password: currentPassword,
    imageUrl: profileImage ? profileImage : null,
  };

  useEffect(() => {
    // 서버로부터 사용자 데이터를 가져옵니다.
    axios
      .get(`/mypage/${userId}`)
      .then((response) => {
        setUser(response.data);
        setNickname(response.data.nickname);
        // 프로필 이미지 url이 있다면 이미지 로드
        if (response.data.imageUrl) {
          setProfileImage(response.data.imageUrl);
        }
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  }, [userId]);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // 현재 비밀번호가 맞는지 확인하는 로직 추가해야 함
  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  // 새로운 비밀번호가 비밀번호 규칙에 맞는지 확인하는 로직 추가해야 함
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  // 새로운 비밀번호 확인이 맞는지 확인하는 로직 추가해야 함
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

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

  // 서버로 patch 요청 보내기
  const handleUpdateProfile = () => {
    axios
      .patch(`/mypage`, userUpdateData)
      .then((response) => {
        console.log("프로필 업데이트 성공:", response.data);
        // 프로필 업데이트 성공 후 리다이렉트
        navigate("/mypage/info");
      })
      .catch((error) => {
        console.error("프로필 업데이트 실패:", error);
        // 프로필 업데이트 실패 시 오류 처리 또는 다른 작업 수행
      });
  };

  return (
    <div>
      <div>다른 유저와 겹치지 않도록 입력해 주세요 (2~15자)</div>
      <div>
        <label>닉네임</label>
        <input type="text" value={nickname} onChange={handleNicknameChange} placeholder="닉네임" />
      </div>
      <div>영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</div>
      <div>
        <label>현재 비밀번호</label>
        <input
          type="password"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          placeholder="현재 비밀번호"
        />
      </div>
      <div>
        <label>비밀번호 재설정</label>
        <input type="password" value={newPassword} onChange={handleNewPasswordChange} placeholder="새로운 비밀번호" />
      </div>
      <div>
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="비밀번호 확인"
        />
      </div>
      <div>
        <label>프로필이미지</label>
        <div>
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile Preview"
              style={{ width: "200px", height: "200px", borderRadius: "50%" }}
            />
          ) : (
            <div style={{ width: "200px", height: "200px", backgroundColor: "lightgray", borderRadius: "50%" }}></div>
          )}
          <input type="file" accept="image/*" onChange={handleProfileImageUpload} />
        </div>
      </div>
      <button onClick={handleUpdateProfile}>회원정보 수정</button>
    </div>
  );
};

export default UserInfoUpdate;
