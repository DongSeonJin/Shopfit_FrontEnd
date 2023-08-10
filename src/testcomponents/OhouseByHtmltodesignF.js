import React from "react";
import HeaderMain from "./components/HeaderMain";
import HeaderSub from "./components/HeaderSub";
import styles from "./OhouseByHtmltodesignF.module.css";
import Contents from "./components/Contents";
import Footer from "./components/Footer";
import UpperBanner from "./components/UpperBanner";

const OhouseByHtmltodesignF = () => {
  const isRootPath = window.location.pathname === "/";

  return (
    <div className={styles.ohouseByHtmltodesignF}>
      <div className={styles.header}>
        <HeaderMain />
        <HeaderSub />
      </div>
      {isRootPath && (
        <>
          <Contents />
          <UpperBanner />
        </>
      )}
      <Footer />
    </div>
  );
};

export default OhouseByHtmltodesignF;
