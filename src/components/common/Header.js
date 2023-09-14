import React, {useState} from "react";

import HeaderMain from "./HeaderMain";
import HeaderSubComm from "./HeaderSubComm";
import HeaderSubShop from "./HeaderSubShop";
import { Link } from "react-router-dom";

// import styles from "../../styles/common/Header.module.css"

const Header = () => {
  const [isCommunityHovered, setIsCommunityHovered] = useState(false);
  const [isShoppingHovered, setIsShoppingHovered] = useState(false);

  return (
    <div style={{display: 'flex'}}>
      <div style={{width: '200px', height: '200px'}}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div>
                  <img src="https://kr.object.ncloudstorage.com/post-bucket/imageslide/%23fit%20%281%29.gif" alt="slide_img" style={{width:"200px", height:"200px"}}/>
              </div>
          </Link>
      </div>
      <div style={{width: '100%'}}>
        <div style={{height: '90px'}}>
          <HeaderMain isCommunityHovered={setIsCommunityHovered} isShoppingHovered={setIsShoppingHovered} />
        </div>
        <div style={{height: '80px'}}>
          {isCommunityHovered && <HeaderSubComm />}
          {isShoppingHovered && <HeaderSubShop />}
        </div>
      </div>
    </div>
  );
};

export default Header;
