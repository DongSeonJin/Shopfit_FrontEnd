/* eslint-disable eqeqeq */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import logout from "../../lib/api/Logout";

// import styles from "../../styles/common/HeaderMain.module.css";


const HeaderMain = ({ isCommunityHovered, isShoppingHovered }) => {
    const navigate = useNavigate();
    const [isHoveredCommunity, setIsHoveredCommunity] = useState(false);
    const [isHoveredShopping, setIsHoveredShopping] = useState(false);
    const [isHoveredNews, setIsHoveredNews] = useState(false);
    const [searchText, setSearchText] = useState("");

    const userId = useSelector(state => state.authUser.userId);

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
        <div style={{display: 'flex', height: '90px', alignItems: 'center', marginTop: '30px', justifyContent: 'space-between', width: `calc(100% - 200px)`}}>
            <div style={{display: 'flex', fontWeight: 'bold', fontSize: '24px'}}>
                <div
                    style={{display: 'inline-block', width: '96px', textAlign: 'center', margin: '0 36px',
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
                    <Link to="/community/post/list/1" style={{ textDecoration: 'none', color: 'inherit' }}>커뮤니티</Link>
                </div>
                <div
                    style={{display: 'inline-block', width: '48px', textAlign: 'center', margin: '0 36px',
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
                    style={{display: 'inline-block', width: '48px', textAlign: 'center', margin: '0 36px',
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


            <div style={{display: 'flex', height: '40px', maxWidth: '600px', width: '40%'}}>
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchTextChange}
                    placeholder="검색어를 입력하세요"
                    style={{width: '80%', padding: '0 10px', marginRight: '5px', borderRadius: '10px', border: 'none'}}
                />
                <button style={{width: '100px', backgroundColor: 'white', borderRadius: '10px', fontSize: '20px', fontWeight: 'bold', border: 'none'}} onClick={() => performSearch(searchText)}>검색</button>
            </div>


            <div style={{display: 'flex', fontWeight: 'bold', justifyContent: 'right', fontSize: '20px'}}>

                <div style={{display: 'inline-block', width: '80px', textAlign: 'center', margin: '0 30px'}}>
                    {userId !== null ? 
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit'}} onClick={logout}>로그아웃</Link> :
                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit'}}>로그인</Link>
                    }                    
                </div>

                <div style={{display: 'inline-block', width: '100px', textAlign: 'center', margin: '0 30px',}}>
                    {userId !== null ?
                        <Link to="/mypage/info" style={{ textDecoration: 'none', color: 'inherit'}}>마이페이지</Link> :
                        <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit'}}>회원가입</Link>
                    }
                </div>

            </div>


        </div>
    );
};

export default HeaderMain;
