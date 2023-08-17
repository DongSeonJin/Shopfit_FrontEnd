import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/common/HeaderMain.module.css";

const HeaderMain = ({ isCommunityHovered, isShoppingHovered }) => {

    const [isHoveredCommunity, setIsHoveredCommunity] = useState(false);
    const [isHoveredShopping, setIsHoveredShopping] = useState(false);
    const [isHoveredServices, setIsHoveredServices] = useState(false);
    const navigate = useNavigate();

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
                        <Link to="/community" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => {navigate("/community"); window.location.reload();}}>커뮤니티</Link>
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
                        <Link to="/shopping" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => {navigate("/shopping"); window.location.reload();}}>쇼핑</Link>
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
                        <Link to="/news/list" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => {navigate("/news/list"); window.location.reload();}}>뉴스</Link>
                    </b>
                </div>
                <div className={styles.divcss10vibjk}>
                    <div className={styles.divcss1f624s9}>
                        <div className={styles.divcss1kpxvh4}>
                            <div className={styles.link3}>
                                <div className={styles.div}>
                                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => {navigate("/login"); window.location.reload();}}>로그인</Link>
                                </div>
                            </div>
                            <div className={styles.link4}>
                                <div className={styles.div}>
                                    <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => {navigate("/register"); window.location.reload();}}>회원가입</Link>
                                </div>
                            </div>
                            <div className={styles.link4}>
                                <div className={styles.div}>고객센터</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderMain;
