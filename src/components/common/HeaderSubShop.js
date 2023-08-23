import styles from "../../styles/common/HeaderSub.module.css";
import { Link } from 'react-router-dom';

const HeaderSubShop = () => {
  return (
    <div className={styles.linkContainer}>
      <Link to="/shopping" className={styles.link}>모두보기</Link>
      <Link to="/shopping/category/1" className={styles.link}>닭가슴살</Link>
      <Link to="/shopping/category/2" className={styles.link}>음료/보충제</Link>
      <Link to="/shopping/category/3" className={styles.link}>운동용품</Link>
    </div>
  );
};

export default HeaderSubShop;