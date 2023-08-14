import React, {useState} from "react";

import HeaderMain from "../components/HeaderMain";
import NewsList from "../components/NewsList";
import Footer from "../components/Footer";
import HeaderSubComm from "../components/HeaderSubComm";
import HeaderSubShop from "../components/HeaderSubShop";

import styles from "../styles/News.module.css";

const News = () => {

  const [isCommunityHovered, setIsCommunityHovered] = useState(false);
  const [isShoppingHovered, setIsShoppingHovered] = useState(false);

  return (
    <div className={styles.div}>
      <HeaderMain isCommunityHovered={setIsCommunityHovered} isShoppingHovered={setIsShoppingHovered} />
      {isCommunityHovered && <HeaderSubComm />}
      {isShoppingHovered && <HeaderSubShop />}
      <NewsList />

      <Footer />
    </div>
  );
};

export default News;
