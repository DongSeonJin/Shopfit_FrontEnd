import styles from "../../styles/common/HeaderSub.module.css";


const HeaderSubComm = ({onCategoryClick}) => {
  
  
  return (
    <div className={styles.divlayoutNavigationSecondar}>
      <div className={styles.divcss1pnwvys}>
        <div className={styles.divcss17fh4sh}>
          <div className={styles.nav}>
          <div className={styles.spancss1ecsbekmargin2} onClick={() => onCategoryClick(2)}>
              <div className={styles.link3d}>자유게시판</div>
            </div>
            <div className={styles.spancss1ecsbekmargin2} onClick={() => onCategoryClick(1)}>
              <div className={styles.link3d}>오운완</div>
            </div>
            <div className={styles.spancss1ecsbekmargin2} onClick={() => onCategoryClick(3)}>
              <div className={styles.link3d}>식단</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSubComm;