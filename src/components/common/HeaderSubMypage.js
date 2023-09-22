import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "../../styles/common/HeaderSub.module.css";


const HeaderSubMyPage = () => {
  const userId = useSelector(state => state.authUser.userId);

  return (
    <div className={styles.linkContainer}>
      <Link to="/mypage/info" className={styles.link}>
        내 프로필
      </Link>
      <Link to={`/mypage/myposts/${userId}`} className={styles.link}>
        내가 쓴 글
      </Link>
      <Link to="/orderhistory" className={styles.link}>
        주문 내역
      </Link>
    </div>
  );
};

export default HeaderSubMyPage;
