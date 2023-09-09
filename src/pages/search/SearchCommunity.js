import React from 'react';
import { useParams } from 'react-router-dom';

const SearchCommunity = () => {
    const { text } = useParams();
    return (
        <div style={{margin: '50px 0'}}>
            community 검색결과 : {text}
        </div>
    );
};

export default SearchCommunity;