import { Link } from "react-router-dom";
import { useState } from "react";

import styles from "../styles/HeaderMain.module.css";

const HeaderMain = ({ isCommunityHovered, isShoppingHovered }) => {

    const [isHoveredCommunity, setIsHoveredCommunity] = useState(false);
    const [isHoveredShopping, setIsHoveredShopping] = useState(false);
    const [isHoveredServices, setIsHoveredServices] = useState(false);

    return (
        <div className={styles.divcssI7a8i3}>
            <div className={styles.divcss1pttzzz}>
                <div style={{fontSize: '24px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: 'deepskyblue'}}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        오늘의 운동
                    </Link>
            </div>
            <div className={styles.divcss1h0hlgo}>
            <b
                className={isHoveredCommunity ? `${styles.link} ${styles.linkHover}` : styles.link}
                onMouseEnter={() => {
                    setIsHoveredCommunity(true);
                    isCommunityHovered(true);
                    isShoppingHovered(false);
                }}
                onMouseLeave={() => {
                    setIsHoveredCommunity(false);  
                }}
            >
                <Link to="/community" style={{ textDecoration: 'none', color: 'inherit' }}>
                    커뮤니티
                </Link>
            </b>            <b
                className={isHoveredShopping ? `${styles.link1} ${styles.linkHover}` : styles.link1}
                onMouseEnter={() => {
                    setIsHoveredShopping(true);
                    isCommunityHovered(false);
                    isShoppingHovered(true);
                }}
                onMouseLeave={() => {
                    setIsHoveredShopping(false);  
                }}
            >
                <Link to="/shopping" style={{ textDecoration: 'none', color: 'inherit' }}>
                    쇼핑
                </Link>
            </b>
            <b
                className={isHoveredServices ? `${styles.link2} ${styles.linkHover}` : styles.link2}
                onMouseEnter={() => {
                    setIsHoveredServices(true);
                    isCommunityHovered(false);
                    isShoppingHovered(false);
                }}
                onMouseLeave={() => setIsHoveredServices(false)}
            >
                <Link to="/news/list" style={{ textDecoration: 'none', color: 'inherit' }}>
                    뉴스
                </Link>
            </b>
            </div>
            <div className={styles.divcss10vibjk}>
            <div className={styles.divcss1f624s9}>
                <div className={styles.divcss1kpxvh4}>
                <div className={styles.link3}>
                    <div className={styles.div}>
                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>로그인</Link>
                    </div>
                </div>
                <div className={styles.link4}>
                    <div className={styles.div}>
                        <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>회원가입</Link>
                    </div>
                </div>
                <div className={styles.link4}>
                    <div className={styles.div}>고객센터</div>
                </div>
                </div>
                <div className={styles.button}>
                <div className={styles.spancssCdruys}>
                    <div className={styles.div3}>글쓰기</div>
                </div>
                <div className={styles.pseudo}>
                    <div className={styles.icon}>
                    <img className={styles.vectorIcon} alt="" src="/vector.svg" />
                    </div>
                </div>
                </div>
            </div>
            <div className={styles.combobox}>
                <div className={styles.spanSearch24}>
                <div className={styles.icon1}>
                    <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
                </div>
                </div>
                <div className={styles.input}>
                <div className={styles.divplaceholder}>
                    <div className={styles.div4}>통합검색</div>
                </div>
                </div>
            </div>
            <div className={styles.link6}>
                <div className={styles.icon2}>
                <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default HeaderMain;
