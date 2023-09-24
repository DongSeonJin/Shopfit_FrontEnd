import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useProductDetail } from "../../context/ProductDetailContext";

import { handleDeleteProduct, handleProductUpdate } from "../../components/shop/HandleProduct";
import { addToWishlist, removeFromWishlist } from "../../components/shop/ActionWishlist";
import { formatDate } from "../../components/common/DateUtils";
import { addCart } from "./../../components/shop/AddCart";
import { Button, Rating } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import UTurnRightRoundedIcon from "@mui/icons-material/UTurnRightRounded";

import styles from "../../styles/shop/pages/ProductDetail.module.css";


const ProductDetail = () => {
  const userId = useSelector(state => state.authUser.userId);
  const userAuthority = useSelector(state => state.authUser.authority);

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
    <div className={styles.container}>
      <UTurnRightRoundedIcon
        onClick={scrollToTop}
        className={styles.scrollButton}
      />

      <div className={styles.buttonContainer}>
        {userAuthority === 'ADMIN' ? 
        <div className={styles.buttonContainer2}>
          <div className={styles.buttonWrapper}>
            <Button variant="outlined" color='info' onClick={() => handleProductUpdate(data.productId, navigate)}>상품 수정</Button>
          </div>
          <div className={styles.buttonWrapper}>
            <Button variant="outlined" color="error" onClick={() => handleDeleteProduct(data.productId, data.thumbnailUrl, data.productImageUrls, navigate)} style={{margin: '0 10px'}}>상품 삭제</Button>
          </div>
        </div> : ''}
      </div>

      <div className={styles.productContainer}>
        <div className={styles.productImageWrapper}>
          <div className={data.stockQuantity == 0 ? styles.productImage : styles.productImage2}>
            <img src={data.thumbnailUrl} alt={data.productName} className={styles.thumbnailImage} />
          </div>
          <div className={styles.favoriteIcon} onClick={toggleFavorite} style={{ color: isFavorite ? "yellow" : "lightgray" }}>
            <BookmarkIcon style={{ width: "40px", height: "40px" }} />
          </div>
        </div>

        <div className={styles.productInfo}>
          <a href={`/shopping/category/${data.categoryId}`} className={styles.categoryLink}>
            카테고리 : {data.categoryName}
          </a>
          <div className={styles.productName}>{data.productName}</div>
          <div className={styles.price}>{data.price.toLocaleString()}원</div>

          <div className={styles.quantityContainer}>
            <div className={styles.quantityButtons}>
              <div>
                <button
                  onClick={countDown}
                  disabled={count < 2}
                  className={styles.quantityButton}
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
                  className={styles.quantityInput}
                />
              </div>
              <div>
                <button
                  onClick={countUp}
                  disabled={count >= data.stockQuantity}
                  className={styles.quantityButton}
                >
                  +
                </button>
              </div>
            </div>
            <div className={styles.totalPrice}>
              {(data.price * count).toLocaleString()}원
            </div>
          </div>

          <div className={styles.stockStatus}>
            {data.stockQuantity === 0 ? (
              <div>품절</div>
            ) : (
              <div>남은 수량 : {data.stockQuantity.toLocaleString()} 개</div>
            )}
          </div>

          <div className={styles.addToCartButton}>
            <div className={styles.buttonContainer}>
              <div className={styles.cartButton}
                onClick={() => (userId ? addCart(userId, productNum, count) : alert("로그인 후 이용해주세요"))}
                disabled={data.stockQuantity === 0}
              >
                장바구니
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <div onClick={handleBuyNow} disabled={data.stockQuantity === 0 || userId === 0} className={styles.buyButton}>
                바로구매
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container2}>
        <div>
          <div className={styles['detail-title']}>상세정보</div>
          <div className={styles['detail-content']}>
            <div>
              {data.productImageUrls.length === 0 ? (
                <div className={styles['no-detail']}>작성된 상세정보가 없습니다</div>
              ) : (
                data.productImageUrls.map((imageUrl, index) => (
                  <div key={index}>
                    <img src={imageUrl} alt={`Product ${index}`} className={styles['product-image']} />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className={styles['review-container']}>
            <div className={styles['review-title']}>구매후기</div>
            <div className={styles['review-list']}>
              <div>
                {formattedReviews.length === 0 ? (
                  <div className={styles['no-reviews']}>작성된 구매후기가 없습니다</div>
                ) : (
                  formattedReviews.map((review) => (
                    <div
                      key={review.reviewId}
                      className={styles['review-item']}
                    >
                      <div className={styles['rating']}>
                        <Rating name="read-only" value={review.rating} readOnly size="small" />{" "}
                      </div>
                      <div className={styles['nickname']}>{review.nickname}</div>
                      <div className={styles['comment']}>{review.comment}</div>
                      <div className={styles['createdAt']}>{review.createdAt}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
