import React from 'react';
import { useLoaderData, useParams } from 'react-router';
import CatArticleCard from '../../components/ArticleCard/CatArticleCard';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../../components/TransitionWrapper/PageWrapper';
import Lottie from 'lottie-react';
import noData from '../../assets/nodata.json'


const UniversalCategory = () => {
    const { category } = useParams();
    const allArticles = useLoaderData().data;
    window.scrollTo({ top: 0, behavior: 'smooth' })


    const categoryArticles = allArticles.filter(article =>
        article.category.toLowerCase() === category.toLowerCase()
    );


    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);


    const categoryDescriptions = {
        technology: "Explore the latest technological advancements, innovations, and digital breakthroughs that are revolutionizing the modern world. From artificial intelligence to space exploration, dive deep into the future of technology and how it's reshaping every aspect of our lives.",

        education: "Discover a wide range of insightful educational resources, modern teaching techniques, and lifelong learning strategies. Whether you're a student, teacher, or lifelong learner, unlock the power of knowledge to achieve personal and professional growth.",

        health: "Find practical health tips, wellness advice, and scientific insights into nutrition, fitness, mental health, and disease prevention. Stay informed and empowered to lead a balanced, healthy, and fulfilling life through trusted health content.",

        business: "Stay ahead with up-to-date business news, financial strategies, market trends, and entrepreneurial insights. From startups to global enterprises, explore the dynamics of the business world and gain the knowledge to thrive in a competitive marketplace."
    };


    return (

        <PageWrapper>
            <div className="container mx-auto px-4 py-8">
                <Helmet title={`${category.toUpperCase()} - Knowspire`}></Helmet>
                {/* Enhanced Header Section */}
                <div className="text-center mb-12">
                    <div className="relative inline-block">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            {categoryName}
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                        </h1>
                    </div>

                    <p className="text-xl py-5 h-8">
                        {categoryDescriptions[category?.toLowerCase()] || "Discover amazing articles"}
                    </p>


                </div>

                {categoryArticles.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg">
                        <div className='md:flex justify-center items-center hidden md:w-4/12 mx-auto'>
                            <Lottie animationData={noData}></Lottie>
                        </div>

                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {categoryArticles.map(article => (
                            <CatArticleCard key={article._id} article={article} />
                        ))}
                    </div>
                )}
            </div>
        </PageWrapper>
    );
};

export default UniversalCategory;