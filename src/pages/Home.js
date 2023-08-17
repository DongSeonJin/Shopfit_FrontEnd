import React from "react";

import Contents from "../components/mainhome/Contents";

import styles from "../styles/pages/Home.module.css";

const Home = () => {

  return (
    <div className={styles.Home}>
      <Contents />
    </div>
  );
};

export default Home;
