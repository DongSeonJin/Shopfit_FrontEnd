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
                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', margin: '0 10px', width: '80px' }} onClick={() => {navigate("/login"); window.location.reload();}}>로그인</Link>
                <Link to="/register" style={{ textDecoration: 'none', color: 'inherit', margin: '0 10px', width: '80px' }} onClick={() => {navigate("/register"); window.location.reload();}}>회원가입</Link>
                <Link to="/custom" style={{ textDecoration: 'none', color: 'inherit', margin: '0 10px', width: '80px' }} onClick={() => {navigate("/register"); window.location.reload();}}>고객센터</Link>
            </div>
        </div>
    );
};

export default HeaderMain;
