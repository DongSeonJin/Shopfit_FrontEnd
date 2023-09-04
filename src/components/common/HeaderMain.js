import { Link } from "react-router-dom";
import { useState } from "react";
// import { connect } from 'react-redux';

import styles from "../../styles/common/HeaderMain.module.css";

const HeaderMain = ({ isCommunityHovered, isShoppingHovered }) => {

    const [isHoveredCommunity, setIsHoveredCommunity] = useState(false);
    const [isHoveredShopping, setIsHoveredShopping] = useState(false);
    const [isHoveredServices, setIsHoveredServices] = useState(false);

    return (
        <div className={styles.divcssI7a8i3}>
            <div className={styles.divcss1pttzzz}>
                <div style={{fontSize: '24px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: 'deepskyblue'}}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        오늘의운동
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
                        <Link to="/community" style={{ textDecoration: 'none', color: 'inherit' }}>커뮤니티</Link>
                    </b>
                    <b
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
                        <Link to="/shopping" style={{ textDecoration: 'none', color: 'inherit' }}>쇼핑</Link>
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
                        <Link to="/news/list" style={{ textDecoration: 'none', color: 'inherit' }}>뉴스</Link>
                    </b>
                </div>
                <div>
                    {/* {isLoggedIn ? (
                        <>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', margin: '0 10px', width: '80px' }}>로그아웃</Link>
                            <Link to="/mypage" style={{ textDecoration: 'none', color: 'inherit', margin: '0 10px', width: '80px' }}>마이페이지</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', margin: '0 10px', width: '80px' }}>로그인</Link>
                            <Link to="/register" style={{ textDecoration: 'none', color: 'inherit', margin: '0 10px', width: '80px' }}>회원가입</Link>
                        </>
                    )} */}
                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', margin: '0 10px', width: '80px' }}>로그인</Link>
                    <Link to="/register" style={{ textDecoration: 'none', color: 'inherit', margin: '0 10px', width: '80px' }}>회원가입</Link>
                    <Link to="/customer-service" style={{ textDecoration: 'none', color: 'inherit', margin: '0 10px', width: '80px' }}>고객센터</Link>
                </div>
            </div>
        </div>
    );
};


export default HeaderMain;
