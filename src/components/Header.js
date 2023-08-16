import React, {useState} from "react";

import HeaderMain from "../components/HeaderMain";
import HeaderSubComm from "../components/HeaderSubComm";
import HeaderSubShop from "../components/HeaderSubShop";

const Header = () => {
  const [isCommunityHovered, setIsCommunityHovered] = useState(false);
  const [isShoppingHovered, setIsShoppingHovered] = useState(false);

  return (
    <div>
      <HeaderMain isCommunityHovered={setIsCommunityHovered} isShoppingHovered={setIsShoppingHovered} />
      {isCommunityHovered && <HeaderSubComm />}
      {isShoppingHovered && <HeaderSubShop />}
    </div>
  );
};

export default Header;
