import React from 'react';

import SearchShop from '../pages/search/SearchShop'
import SearchCommunity from '../pages/search/SearchCommunity';
import SearchNews from '../pages/search/SearchNews';
import { Route, Routes } from 'react-router-dom';

const SearchResult = () => {
    return (
        <Routes>
            <Route path="/searchresult" element={<><SearchCommunity /><SearchShop /><SearchNews /></>} />
            <Route path="/searchresult/:text" element={<><SearchCommunity /><SearchShop /><SearchNews /></>} />
        </Routes>
    );
};

export default SearchResult;