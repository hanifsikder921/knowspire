import React from 'react';
import BannerSlider from '../../components/Slider/BannerSlider';
import PopularArticle from '../../components/Popular/PopularArticle';
import BrowsCategory from '../../components/ArticleCategory/BrowsCategory';
import TopContributors from '../../components/TopContributors/TopContrubutors';

const Home = () => {
    return (
        <div >

            <BannerSlider />
            <PopularArticle/>
            <BrowsCategory/>
            <TopContributors/>

        </div>
    );
};

export default Home;