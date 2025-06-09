import React from 'react';
import BannerSlider from '../../components/Slider/BannerSlider';
import PopularArticle from '../../components/Popular/PopularArticle';
import BrowsCategory from '../../components/ArticleCategory/BrowsCategory';
import TopContributors from '../../components/TopContributors/TopContrubutors';
import LatestArticles from '../../components/LatestArticles/LatestArticles';

const Home = () => {
    return (
        <div >

            <BannerSlider />
            <PopularArticle/>
            <BrowsCategory/>
            <TopContributors/>
            <LatestArticles/>

        </div>
    );
};

export default Home;