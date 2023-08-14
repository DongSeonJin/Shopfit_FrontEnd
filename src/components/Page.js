import styles from "../styles/Page.module.css";

const Page = () => {
  return (
    <div className={styles.divfloatCenter}>
      <div className={styles.list}>
        <div className={styles.itemLink}>
          <div className={styles.div}>1</div>
        </div>
        <div className={styles.item}>
          <div className={styles.link2}>2</div>
        </div>
        <div className={styles.item}>
          <div className={styles.link2}>3</div>
        </div>
        <div className={styles.item}>
          <div className={styles.link2}>4</div>
        </div>
        <div className={styles.item}>
          <div className={styles.link2}>5</div>
        </div>
        <div className={styles.item}>
          <div className={styles.link2}>6</div>
        </div>
        <div className={styles.item}>
          <div className={styles.link2}>7</div>
        </div>
        <div className={styles.item}>
          <div className={styles.link2}>8</div>
        </div>
        <div className={styles.item}>
          <div className={styles.link2}>9</div>
        </div>
      </div>
      <div className={styles.link} />
    </div>
  );
};

export default Page;

// 하단 페이지 표시; 이름 생각 중