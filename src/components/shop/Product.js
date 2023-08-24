import React from "react";
import PropTypes from "prop-types";
// import DeleteNews from "../news/DeleteNews";

import styles from "../../styles/shop/Product.module.css";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 가져옴

const Product = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const url = "/shopping/products/" + data.productId;
    navigate(url); // 해당 URL로 페이지 이동
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.articleRow} ${styles.productWrapper} ${styles.gridContainer}`}
    >
      <div className={styles.img_item} style={imageStyle}></div>
      <div className={styles.table_content}>
        <div>{data.productName}</div>
        <div>{data.price} 원</div>
      </div>
    </div>
  );
};

Product.propTypes = {
  data: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    stockQuantity: PropTypes.number.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    categoryId: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;
