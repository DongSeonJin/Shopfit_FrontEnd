import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Product = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const url = "/shopping/products/" + data.productId;
    navigate(url);
  };

  const imageStyle = {
    width: "180px",
    height: "180px",
    backgroundImage: `url(${data.thumbnailUrl})`,
    backgroundSize: "cover",
    cursor: "pointer"
  };

  const styles = {
    articleRow: "cursor-pointer padding-10 margin-bottom-10",
    productWrapper: "display-flex align-items-center",
    gridContainer: "display-flex",
    img_item: "width-200 height-160 margin-bottom-10",
    table_content: "display-flex flex-direction-column align-items-center",
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.articleRow} ${styles.productWrapper} ${styles.gridContainer}`}
    >
      <div className={styles.img_item} style={imageStyle}></div>
      <div className={styles.table_content}>
        <div className="text-align-left">{data.productName}</div>
        <div style={{ textAlign: "right" }}>
          {data.price} 원
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
