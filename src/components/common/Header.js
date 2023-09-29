import React, { useState } from "react";
import { Link } from "react-router-dom";

import HeaderMain from "./HeaderMain";
import HeaderSubComm from "./HeaderSubComm";
import HeaderSubShop from "./HeaderSubShop";

import styles from "../../styles/common/Header.module.css";


const Header = () => {
  const [isCommunityHovered, setIsCommunityHovered] = useState(false);
  const [isShoppingHovered, setIsShoppingHovered] = useState(false);

  return (
    <div className={styles.headerContainer}> {/* 모듈 스타일 적용 */}
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logoLink}>
          <div>
            <img
              src="https://kr.object.ncloudstorage.com/post-bucket/imageslide/%23fit%20%281%29.gif"
              alt="slide_img"
              className={styles.logoImage}
            />
          </div>
        </Link>
      </div>
      <div className={styles.headerContent}>
        <div className={styles.headerMain}>
          <HeaderMain
            isCommunityHovered={setIsCommunityHovered}
            isShoppingHovered={setIsShoppingHovered}
          />
        </div>
        <div className={styles.headerSub}>
          {isCommunityHovered && <HeaderSubComm />}
          {isShoppingHovered && <HeaderSubShop />}
        </div>
      </div>
    </div>
  );
};

export default Header;
