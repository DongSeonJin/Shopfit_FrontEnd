import React from "react";
import PropTypes from "prop-types";

const SearchResultArticle = ({ data }) => {
  const handleClick = () => {
    window.open(data.newsUrl, "_blank");
  };

  return (
    <div style={{padding: '10px'}}>
      <div alt={data.title} style={{backgroundImage: `url(${data.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '100%', width: '100%', height: '0', objectFit: 'cover', border: '1px solid white', borderRadius: '10px', marginBottom: '10px', cursor: "pointer",}} onClick={handleClick} />
      <div style={{display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.8vw', height: '1.8vw', lineHeight: '0.9vw', marginBottom: '2px'}}>{data.title}</div>
      <div style={{display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.8vw', height: '1vw', lineHeight: '1vw', textAlign: 'right', paddingRight: '5px'}}>{data.createdAt}</div>
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
