import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import BookmarkIcon from "@mui/icons-material/Bookmark";

const Product = ({ data }) => {
  const navigate = useNavigate();
const [isFavorite, setIsFavorite] = useState();

  const userId = 1; // 사용자 ID
  const productId = data.productId; // 상품 ID

  const handleClick = () => {
    const url = "/shopping/products/" + data.productId;
    navigate(url);
  };

  useEffect(() => {
    // 위시리스트 정보를 가져오는 API 요청을 수행
    async function fetchUserWishlist() {
      try {
        const response = await fetch(`/wishlist/${userId}`);
        if (response.ok) {
          const wishlistItems = await response.json();
          const isItemInWishlist = wishlistItems.some((item) => item.productId === productId);
          setIsFavorite(isItemInWishlist); // 위시리스트에 상품이 있는 경우 isFavorite 값을 true로 설정
        }
      } catch (error) {
        console.error("오류 발생", error);
      }
    }
    fetchUserWishlist(); // 컴포넌트가 마운트될 때 위시리스트 정보 가져오기
  }, [userId, productId]);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // 이벤트 버블링 중지
    if (isFavorite) {
      removeFromWishlist();
    } else {
      addToWishlist();
    }
    setIsFavorite((prevState) => !prevState); // 찜 상태 변경
  };

  const addToWishlist = async () => {
    try {
      const response = await fetch(`/wishlist/add?userId=${userId}&productId=${productId}`, {
        method: "POST",
      });

      if (response.ok) {
        console.log("상품이 위시리스트에 추가되었습니다.");
      } else {
        console.error("상품 추가 실패");
      }
    } catch (error) {
      console.error("오류 발생", error);
    }
  };

  const removeFromWishlist = async () => {
    try {
      const response = await fetch(`/wishlist/remove?userId=${userId}&productId=${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("상품이 위시리스트에서 삭제되었습니다.");
      } else {
        console.error("상품 삭제 실패");
      }
    } catch (error) {
      console.error("오류 발생", error);
    }
  };

  const imageStyle = {
    width: "180px",
    height: "180px",
    backgroundImage: `url(${data.thumbnailUrl})`,
    backgroundSize: "cover",
    cursor: "pointer",
    position: "relative",
    filter: data.stockQuantity === 0 ? "grayscale(100%)" : "none",
  };

  const styles = {
    articleRow: "cursor-pointer padding-10 margin-bottom-10",
    productWrapper: "display-flex align-items-center",
    gridContainer: "display-flex",
    img_item: "width-200 height-160 margin-bottom-10",
    table_content: "display-flex flex-direction-column align-items-center",
  };

  const soldOutTextStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontWeight: "bold",
    fontSize: "40px",
    color: "white",
    zIndex: 1,
  };

  const favoriteButtonStyle = {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: data.stockQuantity === 0 ? (isFavorite ? "lightgray" : "yellow") : isFavorite ? "yellow" : "lightgray",
  };

  return (
    <div className={`${styles.articleRow} ${styles.productWrapper} ${styles.gridContainer}`}>
      <div className={styles.img_item} style={imageStyle} onClick={handleClick}>
        {data.stockQuantity === 0 && <div style={soldOutTextStyle}>품절</div>}
        <button className="favorite-button" onClick={toggleFavorite} style={favoriteButtonStyle}>
          <BookmarkIcon />
        </button>
      </div>
      <div className={styles.table_content}>
        <div className="text-align-left">{data.productName}</div>
        <div style={{ textAlign: "right" }}>{data.price.toLocaleString()} 원</div>
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
