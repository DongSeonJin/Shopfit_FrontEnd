import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const HomeImageSlide = () => {
    const imageUrls = [
        "https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20230907/IMG1694qCb059621087.gif", // 닭가슴살 순정마켓
        "https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20230831/IMG1693WJJ464777439.jpg", // 추석 기프트 위크
        "https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20230830/IMG1693stS355076138.jpg", // 소프트 닭가슴살
        "https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20230828/IMG1693zaY208907934.jpg"  // 랭킹닭컴 쿠폰
        
        

    ]
    return (
        <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
            {imageUrls.map((url, index) => (
                <div key={index}>
                    <img src={url} alt={`slide ${index + 1}`} />
                </div>
            ))}
        </Carousel>
    );
};

export default HomeImageSlide;