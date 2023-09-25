import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import HeaderSubMyPage from "../../components/common/HeaderSubMypage";
import { Button } from "@mui/material";
import { authApi } from "../../lib/api/authApi";

import styles from "../../styles/shop/pages/WishList.module.css";


const WishList = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const userId = useSelector(state => state.authUser.userId);

  const fetchWishlist = async () => {
    try {
      const response = await authApi.get(`/wishlist/${userId}`);
      setWishlistItems(response.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const details = {};

      for (const item of wishlistItems) {
        try {
          const response = await axios.get(`/shopping/detail/${item.productId}`);
          details[item.productId] = response.data;
        } catch (error) {
          console.error(`Error fetching product detail for productId ${item.productId}:`, error);
        }
      }

      setProductDetails(details);
    };

    fetchProductDetails();
  }, [wishlistItems]);

  const handleDelete = async (wishListId) => {
    try {
      // 삭제 요청을 보내서 Wishlist 항목을 제거합니다.
      await axios.delete(`/wishlist/${wishListId}`);

      // 삭제 후에 찜 목록을 다시 불러와서 업데이트합니다.
      fetchWishlist();
    } catch (error) {
      console.error("삭제 요청 에러", error);
    }
  };
  
  return (
    <div className={styles.wishlistContainer}>
      <HeaderSubMyPage />
      <div className={styles.headerText}>찜 목 록</div>
      <div className={styles.wishlistItemContainer}>
        {wishlistItems.length == 0 ? (
          <div className={styles.emptyWishlistContainer}>
            <div className={styles.emptyWishlistText}>찜 한 제품이 없습니다.</div>
          </div>
          ) : (
          wishlistItems.map((item) => (
            <div
              key={item.productId}
              className={styles.wishlistItem}
            >              
              <div>
                <Link to={`/shopping/products/${item.productId}`}>
                  <img
                    src={productDetails[item.productId]?.thumbnailUrl}
                    alt={`Thumbnail for ${productDetails[item.productId]?.productName}`}
                    className={styles.wishlistItemImage}  
                  />
                </Link>
              </div>
              <div className={styles.wishlistItemInfo}>
                <div className={styles.wishlistItemInfoText}>{productDetails[item.productId]?.productName}</div>
                <div className={styles.wishlistItemPrice}>{productDetails[item.productId]?.price.toLocaleString()} 원</div>
              </div>

              <div className={styles.wishlistButtonContainer}>
                <Button variant="outlined" color="error" onClick={() => handleDelete(item.wishlistId)}>
                  찜 해제
                </Button>
              </div>
            </div>
        )))}
      </div>
    </div>
  );
};

export default WishList;
