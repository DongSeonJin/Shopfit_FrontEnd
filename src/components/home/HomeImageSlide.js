import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React from "react";
import { url } from "koa-router";
import { Link } from "react-router-dom";

const HomeImageSlide = () => {
  const imageUrls = [
    "https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20230907/IMG1694qCb059621087.gif", // 닭가슴살 순정마켓
    "https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20230828/IMG1693zaY208907934.jpg", // 랭킹닭컴 쿠폰
    "https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20230830/IMG1693stS355076138.jpg", // 닭가슴살 사진
    "https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20230831/IMG1693WJJ464777439.jpg", // 추석 이벤트
  ];

  return (
    <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
      {imageUrls.map((url, index) => (
        <div key={index}>
          {index === 1 ? (
            // 2번째 이미지(인덱스 1) 클릭 시 /coupon 경로로 이동
            <div style={{ cursor: "pointer" }}>
              <img src={url} alt={`slide ${index + 1}`} />
              <Link to="/coupon" style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }} />
            </div>
          ) : (
            // 나머지 이미지는 클릭 시 아무 동작 없음
            <img src={url} alt={`slide $[index + 1]`} />
          )}
        </div>
      ))}
    </Carousel>
  );
};

export default HomeImageSlide;
