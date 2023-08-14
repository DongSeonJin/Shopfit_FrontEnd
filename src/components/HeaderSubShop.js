import styles from "../styles/HeaderSub.module.css";

const HeaderSubShop = () => {
  return (
    <div className={styles.divlayoutNavigationSecondar}>
      <div className={styles.divcss1pnwvys}>
        <div className={styles.divcss17fh4sh}>
          <div className={styles.nav}>
            <div className={styles.spancss1ecsbekmargin2}>
              <div className={styles.link3d}>닭가슴살</div>
            </div>
            <div className={styles.spancss1ecsbekmargin2}>
              <div className={styles.link3d}>음료/보충제</div>
            </div>
            <div className={styles.spancss1ecsbekmargin2}>
              <div className={styles.link3d}>운동용품</div>
            </div>
          </div>
        </div>
        <div className={styles.divcssYfr560}>
          <div className={styles.button}>
            <img className={styles.vectorIcon} alt="" src="/vector3.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSubShop;