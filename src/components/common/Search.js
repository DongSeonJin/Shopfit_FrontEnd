import React, { useState } from 'react';

import styles from "../../styles/common/Search.module.css"

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className={styles.searchbox} onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button type="submit">검색</button>
    </form>
  );
};

export default Search;