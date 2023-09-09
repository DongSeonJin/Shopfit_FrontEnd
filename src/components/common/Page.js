import React from "react";

import styles from "../../styles/common/Page.module.css";

const Page = ({ currentPage, onPageChange, totalPages }) => {

  const renderPageButtons = () => {
    const pageButtons = [];
    const maxButtons = 5;

    let startPage = currentPage - Math.floor(maxButtons / 2);
    if (startPage <= 0) {
      startPage = 1;
    }

    let endPage = startPage + maxButtons - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxButtons + 1, 1); // 현재 페이지 주변에서 최대 5개의 버튼이 보이도록 조절
    }

    for (let page = startPage; page <= endPage; page++) {
      const buttonStyles = currentPage === page ? styles.currentPageButton : styles.pageButton;
      pageButtons.push(
        <button key={page} onClick={() => onPageChange(page)} className={buttonStyles}  disabled={currentPage === page}>{page}</button>
      );
    }
    return pageButtons;
  };

  return (
    <div className={styles.pagination}>
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1} >{"<<"}</button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>{"<"}</button>
      {renderPageButtons()}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>{">"}</button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>{">>"}</button>
    </div>
  );
};

export default Page;