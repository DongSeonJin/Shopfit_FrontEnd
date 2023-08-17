import React, {useState} from "react";

import HeaderMain from "./HeaderMain";
import HeaderSubComm from "./HeaderSubComm";
import HeaderSubShop from "./HeaderSubShop";

import styles from "../../styles/common/Header.module.css"

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
