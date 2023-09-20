import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useProductDetail } from "../../context/ProductDetailContext";

import { addToWishlist, removeFromWishlist } from "../../components/shop/ActionWishlist";
import { handleDeleteProduct, handleProductUpdate } from "../../components/shop/HandleProduct";
import { formatDate } from "../../components/common/DateUtils";
import { addCart } from "./../../components/shop/AddCart";

import { Button, Rating } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import UTurnRightRoundedIcon from "@mui/icons-material/UTurnRightRounded";

// import styles from "../../styles/shop/ProductDetail.module.css";

const ProductDetail = () => {
  const userId = 1; // 임시로 설정한 userId 변수 -> 추후 수정해야 함

  const { productNum } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [count, setCount] = useState(1);
  const [data, setData] = useState(null);
  const { setTotalPrice } = useProductDetail();
  const { setQuantity } = useProductDetail();

  const [isFavorite, setIsFavorite] = useState();

  useEffect(() => {
    async function fetchUserWishlist() {
      try {
        const response = await fetch(`/wishlist/${userId}`);
        if (response.ok) {
          const wishlistItems = await response.json();
          // eslint-disable-next-line eqeqeq
          const isItemInWishlist = wishlistItems.some((item) => item.productId == productNum);
          setIsFavorite(isItemInWishlist);
        }
      } catch (error) {
        console.error("오류 발생", error);
      }
    }
    fetchUserWishlist();
  }, [userId, productNum]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromWishlist(userId, productNum);
    } else {
      addToWishlist(userId, productNum);
    }
    setIsFavorite((prevState) => !prevState); // 찜 상태 변경
  };

  useEffect(() => {
    axios
      .get(`/shopping/detail/${productNum}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setData(null); // 에러 발생 시 data를 null로 설정
      });
  }, [productNum]);

  const countUp = () => setCount((prevCount) => prevCount + 1);
  const countDown = () => setCount((prevCount) => prevCount - 1);
  // const value = (e) => setCount(Number(e.target.value));

  if (data === null) {
    return <div>Loading...</div>; // 로딩 메시지 표시
  }

  //formattedReviews 생성을 data가 로드된 이후에 수행
  const formattedReviews = data.reviews.map((item) => ({
    ...item,
    createdAt: formatDate(item.createdAt),
    updatedAt: formatDate(item.updatedAt),
  }));

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (e.target.value === "" || newValue < 1) {
      setCount(1);
    } else if (newValue > data.stockQuantity) {
      setCount(data.stockQuantity);
    } else {
      setCount(newValue);
    }
  };

  const handleBuyNow = () => {
    const selectedItems = [
      {
        userId: userId,
        productId: productNum,
        quantity: count,
        price: data.price,
      },
    ];

    setQuantity(count);
    setTotalPrice(data.price * count);

    dispatch({
      type: "SET_ORDER",
      payload: {
        userId: userId,
        totalPrice: data.price * count,
        deliveryDate: "",
        address: "",
        phoneNumber: "",
        orderDate: "",
        orderStatus: "",
        quantity: count,
      },
    });

    navigate(`/shopping/order`, { state: { selectedItems } });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ maxWidth: "1080px", width: "100%", margin: "auto" }}>
      <UTurnRightRoundedIcon
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "9999",
          transform: "rotate(180deg)",
          cursor: "pointer",
        }}
      />

      {/* 관리자 권한 */}
      <div style={{ textAlign: "right" }}>
        <Button
          variant="outlined"
          color="info"
          onClick={() => handleProductUpdate(data.productId, navigate)}
          style={{ margin: "0 10px" }}
        >
          상품 수정
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDeleteProduct(data.productId, data.thumbnailUrl, data.productImageUrls, navigate)}
          style={{ margin: "0 10px" }}
        >
          상품 삭제
        </Button>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>
          <div
            style={{
              filter: data.stockQuantity === 0 ? "grayscale(100%)" : "none",
              width: "90%",
              paddingTop: "90%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={data.thumbnailUrl}
              alt={data.productName}
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "auto",
                borderRadius: "5%",
                border: "1px white solid",
              }}
            />
          </div>
          <div
            onClick={toggleFavorite}
            style={{
              textAlign: "right",
              cursor: "pointer",
              color: isFavorite ? "yellow" : "lightgray",
              paddingRight: "10%",
              marginTop: "10px",
            }}
          >
            <BookmarkIcon style={{ width: "40px", height: "40px" }} />
          </div>
        </div>

        <div style={{ flex: "1", marginTop: "1%" }}>
          <a
            href={`/shopping/category/${data.categoryId}`}
            style={{ textDecoration: "none", color: "inherit", fontSize: "20px" }}
          >
            카테고리 : {data.categoryName}
          </a>
          <div style={{ fontSize: "36px", margin: "5% 0", fontWeight: "bold", height: "25%" }}>{data.productName}</div>
          <div style={{ fontSize: "24px" }}>{data.price.toLocaleString()}원</div>

          <div style={{ display: "flex", margin: "5% 0" }}>
            <div style={{ display: "flex", flex: "1" }}>
              <div>
                <button
                  onClick={countDown}
                  disabled={count < 2}
                  style={{
                    width: "60px",
                    height: "60px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    border: "none",
                    margin: "0 3px",
                    backgroundColor: "lightgray",
                    borderRadius: "5%",
                  }}
                >
                  -
                </button>
              </div>
              <div>
                <input
                  onChange={(e) => handleInputChange(e)}
                  value={count}
                  min="1"
                  max={data.stockQuantity}
                  style={{
                    width: "60px",
                    height: "60px",
                    textAlign: "center",
                    fontWeight: "bold",
                    border: "none",
                    margin: "0 3px",
                    borderRadius: "5%",
                  }}
                />
              </div>
              <div>
                <button
                  onClick={countUp}
                  disabled={count >= data.stockQuantity}
                  style={{
                    width: "60px",
                    height: "60px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    border: "none",
                    margin: "0 3px",
                    backgroundColor: "lightgray",
                    borderRadius: "5%",
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div
              style={{ flex: "1", fontSize: "24px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}
            >
              {(data.price * count).toLocaleString()}원
            </div>
          </div>

          <div style={{ margin: "5% 0" }}>
            {data.stockQuantity === 0 ? (
              <div>품절</div>
            ) : (
              <div>남은 수량 : {data.stockQuantity.toLocaleString()} 개</div>
            )}
          </div>

          <div style={{ display: "flex", height: "12%" }}>
            <div style={{ flex: "1" }}>
              <button
                onClick={() => (userId ? addCart(userId, productNum, count) : alert("로그인 후 이용해주세요"))}
                disabled={data.stockQuantity === 0}
                style={{
                  width: "99%",
                  marginRight: "1%",
                  height: "100%",
                  color: "white",
                  fontSize: "24px",
                  border: "1px white solid",
                  backgroundColor: "black",
                  fontWeight: "bold",
                  borderRadius: "5px",
                }}
              >
                장바구니
              </button>
            </div>
            <div style={{ flex: "1" }}>
              <button
                size="large"
                variant="contained"
                onClick={handleBuyNow}
                disabled={data.stockQuantity === 0}
                style={{
                  width: "99%",
                  marginLeft: "1%",
                  height: "100%",
                  color: "black",
                  fontSize: "24px",
                  border: "1px black solid",
                  backgroundColor: "white",
                  fontWeight: "bold",
                  borderRadius: "5px",
                }}
              >
                바로구매
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ margin: "0 50px", padding: "20px" }}>
        <div>
          <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>상세정보</div>
          <div style={{ minHeight: "200px", padding: "20px" }}>
            <div>
              {data.productImageUrls.map((imageUrl, index) => (
                <div>
                  <img key={index} src={imageUrl} alt={`Product ${index}`} style={{ width: "100%" }} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "150px" }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>구매후기</div>
            <div style={{ width: "100%", minHeight: "200px" }}>
              <div>
                {formattedReviews.map((review) => (
                  <div
                    key={review.reviewId}
                    style={{
                      margin: "3% 0",
                      display: "flex",
                      border: "1px solid white",
                      borderRadius: "5px",
                      height: "60px",
                      placeItems: "center",
                      padding: "1%",
                    }}
                  >
                    <div style={{ flex: "1" }}>
                      <Rating name="read-only" value={review.rating} readOnly size="small" />{" "}
                    </div>
                    <div style={{ flex: "2" }}>{review.nickname}</div>
                    <div style={{ flex: "4" }}>{review.comment}</div>
                    <div style={{ flex: "1" }}>{review.createdAt}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
