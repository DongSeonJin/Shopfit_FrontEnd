import React, {useState} from "react";

import HeaderMain from "../components/HeaderMain";
import HeaderSubComm from "../components/HeaderSubComm";
import HeaderSubShop from "../components/HeaderSubShop";

import styles from "../styles/Header.module.css"

const Header = () => {
  const [isCommunityHovered, setIsCommunityHovered] = useState(false);
  const [isShoppingHovered, setIsShoppingHovered] = useState(false);

  return (
    <div>
      <HeaderMain isCommunityHovered={setIsCommunityHovered} isShoppingHovered={setIsShoppingHovered} />
      <div className={styles.gnb}>
        {isCommunityHovered && <HeaderSubComm />}
        {isShoppingHovered && <HeaderSubShop />}
      </div>
    </div>
  );
};

export default Header;
