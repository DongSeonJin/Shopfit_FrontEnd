/* eslint-disable eqeqeq */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import { connect } from 'react-redux';

// import styles from "../../styles/common/HeaderMain.module.css";

const HeaderMain = ({ isCommunityHovered, isShoppingHovered }) => {
    const navigate = useNavigate();
    const [isHoveredCommunity, setIsHoveredCommunity] = useState(false);
    const [isHoveredShopping, setIsHoveredShopping] = useState(false);
    const [isHoveredNews, setIsHoveredNews] = useState(false);
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
        <div style={{display: 'flex', height: '90px', alignItems: 'center', marginTop: '30px'}}>

            
            <div style={{flex: '1',display: 'flex', fontWeight: 'bold', fontSize: '24px'}}>
                <div
                    style={{display: 'inline-block', width: 'auto', textAlign: 'center', margin: '0 10%',
                        color: isHoveredCommunity ? 'red' : 'white',
                    }}
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
                    style={{display: 'inline-block', width: 'auto', textAlign: 'center', margin: '0 5%',
                        color: isHoveredShopping ? 'red' : 'white',
                    }}
                    onMouseEnter={() => {
                        setIsHoveredShopping(true);
                        isCommunityHovered(false);
                        isShoppingHovered(true);
                    }}
                    onMouseLeave={() => {
                        setIsHoveredShopping(false);  
                    }}
                >
                    <Link to="/shopping/1" style={{ textDecoration: 'none', color: 'inherit' }}>쇼핑</Link>
                </div>
                <div
                    style={{display: 'inline-block', width: 'auto', textAlign: 'center', margin: '0 10%',
                        color: isHoveredNews ? 'red' : 'white',
                    }}
                    onMouseEnter={() => {
                        setIsHoveredNews(true);
                        isCommunityHovered(false);
                        isShoppingHovered(false);
                    }}
                    onMouseLeave={() => setIsHoveredNews(false)}
                >
                    <Link to="/news/list" style={{ textDecoration: 'none', color: 'inherit' }}>뉴스</Link>
                </div>
            </div>


            <div style={{flex: '1', display: 'flex', height: '40px'}}>
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchTextChange}
                    placeholder="검색어를 입력하세요"
                    style={{width: '80%'}}
                />
                <button style={{width: '100px', backgroundColor: 'white'}} onClick={() => performSearch(searchText)}>검색</button>
            </div>


            <div style={{flex: '1', display: 'flex', marginLeft: '10%', fontWeight: 'bold'}}>
                <div style={{textAlign: 'center',display: 'inline-block', width: 'auto', margin: '0 5%'}}>
                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit'}}>로그인</Link>
                </div>
                <div style={{textAlign: 'center',display: 'inline-block', width: 'auto', margin: '0 5%'}}>
                    <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit'}}>회원가입</Link>
                </div>
            </div>


        </div>
    );
};

export default HeaderMain;
