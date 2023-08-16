import React from "react";
import PropTypes from "prop-types";

import styles from "../styles/Article.module.css";

const Article = ({ data }) => {

  const handleClick = () => {
    window.open(data.newsUrl, "_blank");
  };

  const imageStyle = {
    width: "180px",
    height: "120px",
    backgroundImage: `url(${data.imageUrl})`,
    backgroundSize: "cover",
  };

  return (
    <tr
    key={data.newsId}
    onClick={handleClick}
    className={`${styles.articleRow}`}
    >
      <td className={`${styles.img_item} ${styles.backgroundImage}`} style={imageStyle}></td>
      <td className={styles.table_content}>
        <td className="content_title">{data.title}</td>
        <br />
        <td className="content_detail">{data.content}</td>
      </td>
      <td className={styles.when_post}>{data.createdAt}</td>
    </tr>
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