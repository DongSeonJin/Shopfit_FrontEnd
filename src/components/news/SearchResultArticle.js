import React from "react";
import PropTypes from "prop-types";

const SearchResultArticle = ({ data }) => {
  const handleClick = () => {
    window.open(data.newsUrl, "_blank");
  };

  return (
    <div>
      <div style={{width: '240px', height: '135px', overflow: 'hidden'}}>
        <img src={data.imageUrl} style={{width: '240px', cursor: 'pointer'}} onClick={handleClick}/>
      </div>
      <div style={{width: '240px'}}>{data.title}</div>
      <div style={{width: '240px'}}>{data.createdAt}</div>
    </div>
  );
};

SearchResultArticle.propTypes = {
  data: PropTypes.shape({
    newsId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    newsUrl: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchResultArticle;
