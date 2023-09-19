import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import HeaderSubMyPage from "../../components/common/HeaderSubMypage";
import { Button } from "@mui/material";

const UserInfoUpdate = () => {
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const userId = 1; // 임시로 설정한 userId 변수 -> 추후 수정해야 함
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(true); // 닉네임 중복 여부 상태

  // 서버로 보낼 데이터
  const userUpdateData = {
    userId: userId,
    nickname: nickname,
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
    const newNickname = e.target.value;
    setNickname(newNickname);
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

  // '회원정보 수정' 버튼 클릭 핸들러
  const handleUpdateProfile = () => {
    // 닉네임 중복 여부 확인
    axios
      .post(`/checkNickname`, { nickname: nickname }, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        if (response.data) {
          // 닉네임 사용 가능한 경우
          setIsNicknameAvailable(true);
          // 서버로 patch 요청 보내기
          axios
            .patch(`/mypage/${userId}`, userUpdateData)
            .then((response) => {
              console.log("프로필 업데이트 성공:", response.data);
              // 프로필 업데이트 성공 후 리다이렉트
              navigate("/mypage/info");
            })
            .catch((error) => {
              console.error("프로필 업데이트 실패:", error);
              // 프로필 업데이트 실패 시 오류 처리 또는 다른 작업 수행
            });
        } else {
          // 만약 닉네임이 현재 사용자의 닉네임과 동일하다면 중복으로 처리하지 않음
          if (nickname === user.nickname) {
            setIsNicknameAvailable(true); // 중복이 아니라고 설정
            axios
              .patch(`/mypage/${userId}`, userUpdateData)
              .then((response) => {
                console.log("프로필 업데이트 성공:", response.data);
                // 프로필 업데이트 성공 후 리다이렉트
                navigate("/mypage/info");
              })
              .catch((error) => {
                console.error("프로필 업데이트 실패:", error);
                // 프로필 업데이트 실패 시 오류 처리 또는 다른 작업 수행
              });
          } else {
            // 닉네임 중복인 경우
            setIsNicknameAvailable(false);
            alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.");
          }
        }
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',  width:'100%', minHeight: `calc(100vh - 720px)`}}>
      <HeaderSubMyPage />
      <div style={{width: '720px'}}>
        <div style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '20px'}}>회원정보 수정</div>
        <div>
          <div style={{color: "lightgray", marginBottom: '10px', marginLeft: '50%'}}>다른 유저와 겹치지 않도록 입력해 주세요.</div>
          <div style={{marginBottom: '20px'}}>
            <label style={{ width: '50%', fontSize: '20px', fontWeight: 'bold'}}>닉네임</label>
            <input type="text" value={nickname} onChange={handleNicknameChange} placeholder="닉네임" style={{ width: '50%', paddingLeft: '10px', fontSize: '20px'}} />
          </div>
          {!isNicknameAvailable && (
            <div style={{ color: "red" }}>이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.</div>
          )}
        </div>
        
        <div>
          <div style={{marginBottom: '20px'}}>
            <label style={{ width: '50%', fontSize: '20px', fontWeight: 'bold'}}>프로필이미지</label>
            <input type="file" accept="image/*" onChange={handleProfileImageUpload} style={{ width: '50%'}}/>
          </div>
          <div style={{margin: '50px 0', textAlign: 'center'}}>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile Preview"
                style={{ width: "240px", height: "240px", borderRadius: "50%", border: '1px white solid' }}
              />
            ) : (
              <div style={{ width: "200px", height: "200px", backgroundColor: "lightgray", borderRadius: "50%" }}></div>
            )}
          </div>
        </div>

        <div style={{textAlign: 'center'}}>
          <Button onClick={handleUpdateProfile} variant="outlined" style={{width: '360px', height: '60px', textAlign: 'center', margin: '20px 0', borderRadius: '10px', fontSize: '24px'}}>회원정보 수정</Button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoUpdate;
