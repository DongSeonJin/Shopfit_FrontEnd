import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import BookmarkIcon from "@mui/icons-material/Bookmark";


const Product = ({ data }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState();

  const userId = useSelector(state => state.authUser.userId);
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

  return (
    <div style={{ marginBottom: "50px", alignItems: "center", width: '100%' }}>
      <div style={{ cursor: "pointer", width: "100%", height: '0', paddingBottom: '100%', marginBottom: "10px", border: '1px solid white', borderRadius: '10px',
      backgroundImage: `url(${data.thumbnailUrl})`, backgroundSize: "cover", position: "relative", 
      filter: data.stockQuantity === 0 ? "grayscale(100%)" : "none", }} onClick={handleClick}>

        {data.stockQuantity === 0 && (
          <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontWeight: "bold", fontSize: "40px", color: "white", zIndex: 1,}}>품절</div>
        )}

        <button
          onClick={userId == 0 ? null : toggleFavorite}
          disabled={userId == 0}
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
        }}>
          <BookmarkIcon style={{ filter: "none", color: isFavorite ? "yellow" : "lightgray" }} />
        </button>
      </div>
      <div style={{ textAlign: "left", height: "48px", overflow: "hidden" }}>
        {data.productName}
      </div>
      <div style={{ textAlign: "right", height: "24px" }}>
        {data.price.toLocaleString()} 원
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
