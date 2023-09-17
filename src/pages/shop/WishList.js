import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const WishList = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [productDetails, setProductDetails] = useState({});

  const fetchWishlist = async () => {
    try {
      const userId = 1; // 하드코딩된 userId
      const response = await axios.get(`/wishlist/${userId}`);
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
          const response = await axios.get(`/shopping/products/${item.productId}`);
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
    <div style={{ display: 'flex', flexDirection: 'column', margin: '0 15%', marginBottom: '100px'}}>
      <div style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '5%', width: '100%' }}>찜 목 록</div>
      {wishlistItems.map((item) => (
        <div
          key={item.productId}
          style={{ display: "flex", justifyContent: "space-between", margin: "10px 0", alignItems: "center" }}
        >
          <Link to={`/shopping/products/${item.productId}`}>
            <img
              src={productDetails[item.productId]?.thumbnailUrl}
              alt={`Thumbnail for ${productDetails[item.productId]?.productName}`}
              style={{ width: "180px", height: "180px", cursor: "pointer", borderRadius: '5%', border: '1px solid white' }}
            />
          </Link>
          <div style={{ width: '96%', margin: '0 2%' }}>
            <div style={{ fontSize: '24px', display: 'block', flex: 1 }}>{productDetails[item.productId]?.productName}</div>
            <div style={{ textAlign: 'right', color: '#888', flex: 1, fontSize: '20px' }}>{productDetails[item.productId]?.price.toLocaleString()} 원</div>
          </div>
          <div style={{ width: "10%", textAlign: "center" }}>
            <Button variant="outlined" color="error" onClick={() => handleDelete(item.wishlistId)}>
              찜 해제
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishList;
