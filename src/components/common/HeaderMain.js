import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import { connect } from 'react-redux';

// import styles from "../../styles/common/HeaderMain.module.css";

const HeaderMain = ({ isCommunityHovered, isShoppingHovered }) => {
    const navigate = useNavigate();
    const [isHoveredCommunity, setIsHoveredCommunity] = useState(false);
    const [isHoveredShopping, setIsHoveredShopping] = useState(false);
    const [isHoveredServices, setIsHoveredServices] = useState(false);
    const [searchText, setSearchText] = useState(""); // 1. searchText 상태 변수 추가

    const handleSearchTextChange = (e) => {
        // 2. 검색어 입력 필드의 변경 이벤트 처리 함수
        setSearchText(e.target.value);
    };

    const performSearch = (searchText) => {
        if(searchText == ""){
            alert('검색어를 입력해주세요.')
        }else {
            navigate(`/searchresult/${searchText}`);
            console.log("검색어:", searchText);
        }
    };


    return (
            <div style={{display: 'flex'}}>
                <div style={{flex: '1', fontSize: '24px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: 'deepskyblue'}}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        # Fit
                    </Link>
                </div>

                <div style={{flex: '1',display: 'flex'}}>
                    <div
                        style={{margin: '10px'}}
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
                    </div>
                    <div
                        style={{margin: '10px'}}
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
                    </div>
                    <div
                        style={{margin: '10px'}}
                        onMouseEnter={() => {
                            setIsHoveredServices(true);
                            isCommunityHovered(false);
                            isShoppingHovered(false);
                        }}
                        onMouseLeave={() => setIsHoveredServices(false)}
                    >
                        <Link to="/news/list" style={{ textDecoration: 'none', color: 'inherit' }}>뉴스</Link>
                    </div>
                </div>
                <div style={{flex: '1', display: 'flex'}}>
                    <input
                        type="text"
                        value={searchText}
                        onChange={handleSearchTextChange}
                        placeholder="검색어를 입력하세요"
                    />
                    <button onClick={() => performSearch(searchText)}>검색</button>
                </div>
                <div style={{flex: '1', display: 'flex'}}>
                    <div>
                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', margin: '10px' }}>로그인</Link>
                    </div>
                    <div>
                        <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit', margin: '10px' }}>회원가입</Link>
                    </div>
                    <div>
                        <Link to="/chatbot" style={{ textDecoration: 'none', color: 'inherit', margin: '10px' }}>챗봇</Link>
                    </div>
                </div>
            </div>
    );
};


export default HeaderMain;
