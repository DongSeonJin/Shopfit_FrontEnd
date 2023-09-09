import React from 'react';
import { useParams } from 'react-router-dom';

const SearchNews = () => {
    const { text } = useParams();
    return (
        <div style={{margin: '50px 0'}}>
            news 검색결과 : {text}
        </div>
    );
};

export default SearchNews;