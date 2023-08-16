import React from "react";

import Header from "../components/Header";
import Contents from "../components/Contents";
// import Footer from "../components/Footer";

import styles from "../styles/Home.module.css";

const Home = () => {

  return (
    <div className={styles.Home}>
      <Header />
      <Contents />
    </div>
  );
};

export default Home;
