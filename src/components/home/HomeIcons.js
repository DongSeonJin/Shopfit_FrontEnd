import React from 'react';
import { Link } from 'react-router-dom';

import StarIcon from '@mui/icons-material/Star';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const HomeIcons = () => {
  
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: '60px 0 0', textAlign: 'center'}}>

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
        <div>
          장바구니
        </div>
      </div>

      <div>
        <Link to="/mypage/info">
          <AccountCircleIcon style={{ width: "60px", height: "60px", margin: "0 10px", color: 'white' }} />
        </Link>
        <div>
          내정보
        </div>
      </div>
    </div>
  );
};

export default HomeIcons;
