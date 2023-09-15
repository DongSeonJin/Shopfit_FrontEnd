import React from 'react';

import HomeCommunity from '../../components/home/HomeCommunity';
import HomeNews from '../../components/home/HomeNews';
import HomeShopping from '../../components/home/HomeShopping';
import HomeIcons from '../../components/home/HomeIcons';
import HomeImageSlide from '../../components/home/HomeImageSlide';

const HomeContent = () => {
    return (
        <div>
            <HomeImageSlide />
            <div style={{margin: '0 20%'}}>
                <HomeIcons />
                <HomeCommunity />
                <HomeNews />
                <HomeShopping />
            </div>
        </div>
    );
};

export default HomeContent;