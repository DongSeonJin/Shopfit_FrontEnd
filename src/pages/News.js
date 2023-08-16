import React from "react";

import Header from "../components/Header";
import NewsList from "../components/NewsList";

import styles from "../styles/News.module.css";

const News = () => {

  return (
    <div className={styles.newsContainer}>
      <Header />
      <div className={styles.newsListContainer}>
        <NewsList />
        </div>        
    </div>
  );
};

export default News;
