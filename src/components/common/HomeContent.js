import React from 'react';

import HomeMain from './HomeMain';
import HomeCommunity from './HomeCommunity';
import HomeNews from './HomeNews';
import HomeShopping from './HomeShopping';
import HomeIcons from './HomeIcons';


const HomeContent = () => {
    return (
        <div>
            <HomeMain />
            <HomeIcons />
            <HomeCommunity />
            <HomeNews />
            <HomeShopping />
        </div>
    );
};

export default HomeContent;