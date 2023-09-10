import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

const SearchResultPost = ({ data }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/community/post/${data.postId}`);
    };

    return (
        <div>
            <div style={{width: '240px', height: '240px', overflow: 'hidden'}}>
                <img src={data.imageUrl1} style={{width: '240px', cursor: 'pointer'}} onClick={handleClick}/>
            </div>
            <div style={{width: '240px'}}>{data.title}</div>
            <div style={{width: '240px'}}>{data.nickname}</div>
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
