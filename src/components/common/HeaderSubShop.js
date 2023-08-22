import styles from "../../styles/common/HeaderSub.module.css";
import { Link } from 'react-router-dom';

const HeaderSubShop = () => {
  return (
    <div className={styles.linkContainer}>
      <Link className={styles.link}>닭가슴살</Link>
      <Link className={styles.link}>음료/보충제</Link>
      <Link className={styles.link}>운동용품</Link>
    </div>
  );
};

export default HeaderSubShop;