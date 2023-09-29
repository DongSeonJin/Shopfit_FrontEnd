import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

const SearchResultPost = ({ data }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/community/post/${data.postId}`);
    };

    return (
        <div style={{padding: '10px'}}>
            <div alt={data.title} style={{backgroundImage: `url(${data.imageUrl1})`, backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '100%', width: '100%', height: '0', objectFit: 'cover', border: '1px solid white', borderRadius: '10px', marginBottom: '10px', cursor: "pointer",}} onClick={handleClick} />
            <div style={{display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '1vw', height: '2.2vw', lineHeight: '1.1vw', marginBottom: '2px'}}>{data.title}</div>
            <div style={{display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.8vw', height: '1vw', lineHeight: '1vw', textAlign: 'right', paddingRight: '5px'}}>{data.nickname}</div>
        </div>
    );
};

SearchResultPost.propTypes = {
  data: PropTypes.shape({
    postId: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    viewCount: PropTypes.number.isRequired,
    imageUrl1: PropTypes.string.isRequired,
    likeCnt: PropTypes.number.isRequired,
    replyCnt: PropTypes.number.isRequired
  }).isRequired,
};

export default SearchResultPost;
