import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Rating } from "@mui/material";

import styles from "../../styles/shop/ProductDetail.module.css";

const ProductDetail = () => {
  const { productNum } = useParams(); // productNum을 useParams로 추출

  const [data, setData] = useState(null);

  // 날짜 yyyy-mm-dd로 변경
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    axios
      .get("/shopping/products/" + productNum)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setData(null); // 에러 발생 시 data를 null로 설정
      });
  }, [productNum]);

  const formattedReviews = data.reviews.map((item) => ({
    reviewId: item.reviewId,
    userId: item.userId,
    nickname: item.nickname,
    rating: item.rating,
    comment: item.comment,
    createdAt: formatDate(item.createdAt),
    updatedAt: formatDate(item.updatedAt),
  }));

  if (data === null) {
    return <div>Loading...</div>; // 로딩 메시지 표시
  }

  return (
    <div className={styles.contentWrap}>
      {/* 카테고리 시작 */}
      {/* <div className={styles.cateName}>
        <a
          className={styles.categoryLink}
          href={`/shopping/category/${data.categoryId}`}
        >
          {data.categoryName}
        </a>
      </div> */}
      {/* 카테고리 끝 */}
      {/* 썸네일, 제품명, 가격 시작 */}
      <div className={styles.productContainer}>
        <div className={styles.imgContainer}>
          <div className={styles.item}>
            <img
              className={styles.repImg}
              src={data.thumbnailUrl}
              alt={data.productName}
            />
          </div>
        </div>
        <div className={styles.item}>
          <h2 className={styles.prodName}>{data.productName}</h2>
          <div className={styles.priceName}>{data.price}원</div>

          {/* 수량 선택 */}

          {/* 장바구니 */}
          <Button></Button>
          {/* 바로구매 */}
          <Button></Button>

          {/* <p>Stock Quantity: {data.stockQuantity}</p>  재고수량*/}
        </div>
      </div>
      {/* 썸네일, 제품명, 가격 끝 */}
      {/* 상세이미지 시작 */}
      <h3>상세정보</h3>
      <div className={styles.detailContainer}>
        {data.productImageUrls.map((imageUrl, index) => (
          <img
            className={styles.detailImg}
            key={index}
            src={imageUrl}
            alt={`Product ${index}`}
          />
        ))}
      </div>

      {/* 상세이미지 끝 */}
      {/* 리뷰 시작 */}
      <h3>구매후기</h3>
      <div className={styles.reviewContainer}>
        <div>
          {formattedReviews.map((review) => (
            <div key={review.reviewId}>
              <span>
                <Rating
                  name="read-only"
                  value={review.rating}
                  readOnly
                  size="small"
                />{" "}
              </span>
              <div>
                <div>
                  <span className={styles.name}>{review.nickname}</span>
                </div>
                <div className={styles.date}>{review.createdAt}</div>
              </div>

              <p>{review.comment}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
      {/* 리뷰 끝 */}
    </div>
  );
};

export default ProductDetail;
