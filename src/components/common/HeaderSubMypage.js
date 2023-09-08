import styles from "../../styles/common/HeaderSub.module.css";
import { Link } from "react-router-dom";

// 임시로 설정한 userId
const userId = 1;

const HeaderSubMyPage = () => {
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
