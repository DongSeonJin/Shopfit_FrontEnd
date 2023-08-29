import React from 'react';

import HomeMain from './HomeMain';
import HomeCommunity from './HomeCommunity';
import HomeNews from './HomeNews';
import HomeShopping from './HomeShopping';


const HomeContent = () => {
    return (
        <div>
            <HomeMain />
            <HomeCommunity />
            <HomeNews />
            <HomeShopping />
        </div>
    );
};

export default HomeContent;