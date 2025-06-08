import React from 'react';
import BannerSlider from '../../components/Slider/BannerSlider';
import PopularArticle from '../../components/Popular/PopularArticle';
import BrowsCategory from '../../components/ArticleCategory/BrowsCategory';

const Home = () => {
    return (
        <div >

            <BannerSlider />
            <PopularArticle/>
            <BrowsCategory/>

        </div>
    );
};

export default Home;