import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <div>
                <h1> 메인페이지</h1>
            </div>
            <ul>
                <Link to="/login">로그인<br /></Link>
                <Link to="/register">회원가입<br /></Link>
            </ul>
        </div>
    );
};

export default Home;