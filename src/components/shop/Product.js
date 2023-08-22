import React from "react";
import PropTypes from "prop-types";
// import DeleteNews from "../news/DeleteNews";

import styles from "../../styles/shop/Product.module.css"

const Product = ({ data }) => {
  const handleClick = () => {
    window.open("/shopping/products/"+data.productId, "_blank");
  };

  const imageStyle = {
    width: "180px",
    height: "120px",
    backgroundImage: `url(${data.thumbnailUrl})`,
    backgroundSize: "cover",
  };

  return (
    <div onClick={handleClick} className={`${styles.articleRow} ${styles.productWrapper} ${styles.gridContainer}`}>
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
