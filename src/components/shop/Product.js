import React from "react";
import PropTypes from "prop-types";
// import DeleteNews from "../news/DeleteNews";

import styles from "../../styles/shop/Product.module.css"

const Product = ({ data }) => {
  const handleClick = () => {
    window.open("/shopping/products/"+data.productId, "_blank");
  };

  return (
    <div onClick={handleClick} className={styles.productContainer}>
      <div className={styles.productInfo}>
        <img src={data.thumbnailUrl} alt={data.productName} className={styles.productImage} />
        <div className={styles.productText}>
          <div className={styles.productName}>{data.productName}</div>
          <div className={styles.productPrice}>{data.price} 원</div>
        </div>
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
