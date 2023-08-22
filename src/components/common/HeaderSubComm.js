import styles from "../../styles/common/HeaderSub.module.css";
import { Link } from 'react-router-dom';


const HeaderSubComm = () => { 
  return (
    <div className={styles.linkContainer}>
      <Link to="/post/list/1" className={styles.link}>자유게시판</Link>
      <Link to="/post/list/2" className={styles.link}>오운완</Link>
      <Link to="/post/list/3" className={styles.link}>식단</Link> 
    </div>
  );
};

export default HeaderSubComm;