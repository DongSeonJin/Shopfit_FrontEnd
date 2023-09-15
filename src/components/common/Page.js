import React from "react";

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


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
      <KeyboardDoubleArrowLeftIcon onClick={() => onPageChange(1)} disabled={currentPage === 1 || totalPages === 0} style={{margin: '0 5px', cursor: 'pointer'}} />
      <NavigateBeforeIcon onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1 || totalPages === 0} style={{margin: '0 5px', cursor: 'pointer'}} />
      {renderPageButtons()}
      <NavigateNextIcon onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} style={{margin: '0 5px', cursor: 'pointer'}} />
      <KeyboardDoubleArrowRightIcon onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages || totalPages === 0} style={{margin: '0 5px', cursor: 'pointer'}} />
    </div>
  );
};

export default Page;