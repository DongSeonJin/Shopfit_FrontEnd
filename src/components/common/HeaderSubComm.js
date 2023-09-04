import styles from "../../styles/common/HeaderSub.module.css";
import { Link } from 'react-router-dom';


const HeaderSubComm = () => { 
  return (
    <div className={styles.linkContainer}>
      <Link to="/community/post/list/1" className={styles.link}>오운완</Link>
      <Link to="/community/post/list/2" className={styles.link}>식단</Link> 
    </div>
  );
};

export default HeaderSubComm;