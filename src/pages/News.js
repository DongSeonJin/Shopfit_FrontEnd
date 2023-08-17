import React from "react";

import NewsList from "../components/news/NewsList";

import styles from "../styles/pages/News.module.css";

const News = () => {

  return (
    <div className={styles.newsContainer}>
      <div className={styles.newsListContainer}>
        <NewsList />
      </div> 
    </div>
  );
};

export default News;
