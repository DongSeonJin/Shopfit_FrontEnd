import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React from 'react';
import { url } from 'koa-router';

const HomeImageSlide = () => {

    const imageUrls = [
        "https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20230907/IMG1694qCb059621087.gif", // 닭가슴살 순정마켓
        "https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20230828/IMG1693zaY208907934.jpg", // 랭킹닭컴 쿠폰
        "https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20230830/IMG1693stS355076138.jpg", // 닭가슴살 사진
        "https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20230831/IMG1693WJJ464777439.jpg" // 추석 이벤트
    ];

    return (
        <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
            {imageUrls.map((url, index) => (
                <div key={index}>
                    <img src={url} alt={`slide $[index + 1]`} />
                </div>
            ))}

        </Carousel>
        
    );
};

export default HomeImageSlide;