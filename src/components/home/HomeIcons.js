import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import StarIcon from '@mui/icons-material/Star';
import RedeemIcon from '@mui/icons-material/Redeem';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from 'react-redux';


const HomeIcons = () => {

  const userId = useSelector(state => state.authUser.userId);
  const navigate = useNavigate();

  const buttonClick = (link) => {
    if (userId > 0) {
      navigate(link);
    }
    else {
      alert('로그인이 필요한 기능입니다.');
    }
  };

  
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: '60px 0', textAlign: 'center'}}>

      <div style={{margin: '0 2vw'}} onClick={() => buttonClick("/orderhistory")} >
          <StarIcon style={{ width: "60px", height: "60px", margin: "0 10px", color: 'white' }}/>
          <div>주문내역</div>
      </div>


      <div style={{margin: '0 2vw'}} onClick={() => buttonClick("/coupon")}>
          <RedeemIcon style={{ width: "60px", height: "60px", margin: "0 10px", color: 'white' }} />
        <div> 쿠폰 </div>
      </div>

      <div style={{margin: '0 2vw'}} onClick={() => buttonClick("/shopping/wishlist")}>
          <BookmarkIcon style={{ width: "60px", height: "60px", margin: "0 10px", color: 'white' }} />
        <div> 찜목록 </div>
      </div>

      <div style={{margin: '0 2vw'}} onClick={() => buttonClick("/shopping/cart")}>
          <ShoppingCartIcon style={{ width: "60px", height: "60px", margin: "0 10px", color: 'white' }} />
        <div> 장바구니 </div>
      </div>

      <div style={{margin: '0 2vw'}} onClick={() => buttonClick("/mypage/info")}>
          <AccountCircleIcon style={{ width: "60px", height: "60px", margin: "0 10px", color: 'white' }} />
        <div> 내정보 </div>
      </div>
    </div>
  );
};

export default HomeIcons;
