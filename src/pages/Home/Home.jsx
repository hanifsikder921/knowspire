import React from 'react';
import BannerSlider from '../../components/Slider/BannerSlider';
import PopularArticle from '../../components/Popular/PopularArticle';
import BrowsCategory from '../../components/ArticleCategory/BrowsCategory';
import TopContributors from '../../components/TopContributors/TopContrubutors';
import LatestArticles from '../../components/LatestArticles/LatestArticles';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../../components/TransitionWrapper/PageWrapper';

const Home = () => {
    return (
       <PageWrapper>
         <div >
            <Helmet priority="high"><title> Home - Knowspire</title></Helmet>

            <BannerSlider />
            <PopularArticle/>
            <BrowsCategory/>
            <TopContributors/>
            <LatestArticles/>

        </div>
       </PageWrapper>
    );
};

export default Home;