import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Button } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HeaderSubMyPage from "../../components/common/HeaderSubMypage";

const UserInfo = () => {
  const userId = 1; // 임시로 설정한 userId 변수 -> 추후 수정해야 함
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 서버로부터 사용자 데이터를 가져옵니다.
    axios
      .get(`/mypage/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleEditProfile = () => {
    // 버튼 클릭 시 페이지 이동
    navigate("/mypage/edit");
  };

  const handleChangePassword = () => {
    // 비밀번호 변경 페이지로 이동
    navigate("/mypage/edit/password");
  };

  return (
    <div>
      <HeaderSubMyPage />
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',  width:'100%', minHeight: `calc(100vh - 720px)`}}>
        

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid lightgray', margin: '20px 0', width: '300px'}}>
          <img src={user.imageUrl} alt="프로필사진" style={{width: '240px', height: '240px', border: '1px solid white', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px'}} />
          <div style={{ fontSize: '28px', fontWeight: 'bold', width: '240px', marginBottom: '20px', textAlign: 'center'}}>{user.nickname}</div>
          <Button onClick={handleEditProfile} variant="outlined" style={{width: '120px', height: '40px', textAlign: 'center', marginBottom: '20px', borderRadius: '10px', fontSize: '18px'}}>설정</Button>
        </div>

        <div>
          <div style={{textAlign: 'center', display: 'flex', marginBottom: '30px'}}>
            <div style={{flex: '1'}}>
              <Link to="/mypage/mycoupon" style={{textDecoration:'none'}}>보유쿠폰 {user.couponCount}</Link>
            </div>
            <div style={{flex: '1'}}>포인트 {user.point.toLocaleString()}</div>
          </div>

          <div style={{textAlign: 'center', display: 'flex', marginBottom: '30px'}}>
            <div>
              <Link to="/orderhistory">
                <StarIcon style={{ width: "60px", height: "60px", margin: "0 10px", color: 'white' }} />
              </Link>
              <div>
                주문내역
              </div>
            </div>
            
            <div>
              <Link to="/shopping/wishlist">
                <BookmarkIcon style={{ width: "60px", height: "60px", margin: "0 10px", color: 'white' }} />
              </Link>
              <div>
                찜목록
              </div>
            </div>

            <div>
              <Link to="/shopping/cart">
                <ShoppingCartIcon style={{ width: "60px", height: "60px", margin: "0 10px", color: 'white' }} />
              </Link>
              <div style={{textAlign: 'center'}}>
                장바구니
              </div>
            </div>
          </div> 
        </div>         

        <div style={{marginBottom: '20px'}}>
          <Button onClick={handleChangePassword}>비밀번호 변경하기</Button>
        </div>
        <div style={{marginBottom: '20px'}}>
          <Button color="error">탈퇴하기</Button>
        </div>

      </div>
    </div>
  );
};

export default UserInfo;
