import React from "react";
import PropTypes from "prop-types";
import DeleteNews from "../news/DeleteNews";
import styles from "../../styles/news/Article.module.css"; // CSS 모듈 파일을 가져옴

const Article = ({ data }) => {
  const handleClick = () => {
    window.open(data.newsUrl, "_blank");
  };

  return (
    <div
      key={data.newsId}
      className={styles.articleContainer} // CSS 모듈의 클래스를 적용
    >
      <div
        className={styles.image}
        onClick={handleClick}
        style={{ backgroundImage: `url(${data.imageUrl})` }}
      />
      <div className={styles.textContainer}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.content}>{data.content}</div>
      </div>
      <div className={styles.date}>{data.createdAt}</div>
      {/* 관리자 권한 */}
      <div className={styles.delButton}>
        <DeleteNews newsId={data.newsId} />
      </div>
    </div>
  );
};

Article.propTypes = {
  data: PropTypes.shape({
    newsId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    newsUrl: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Article;
