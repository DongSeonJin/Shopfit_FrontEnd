import styles from "../styles/Search.module.css";

const Search = () => {
  return (
    <div className={styles.divsrchBox}>
      <div className={styles.divsrchInputArea}>
        <div className={styles.input}>
          <div className={styles.div}>검색어를 입력하세요.</div>
        </div>
      </div>
      <div className={styles.button}>
        <div className={styles.div1}>검 색</div>
      </div>
    </div>
  );
};

export default Search;

// 카데고리 내 검색 창; 생각 중
