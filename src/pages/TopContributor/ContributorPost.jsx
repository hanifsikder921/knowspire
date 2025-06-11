import React from 'react';
import { useLoaderData, useParams } from 'react-router';
import CatArticleCard from '../../components/ArticleCard/CatArticleCard';
import { Helmet } from 'react-helmet-async';

const ContributorPost = () => {
    const { authorEmail } = useParams();
    const allArticles = useLoaderData().data;
    
   
    const contributorArticles = allArticles.filter(article => 
        article.authorEmail === decodeURIComponent(authorEmail)
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <Helmet>
                <title>
                    {`${contributorArticles[0]?.authorName || 'Contributor' } - Article || Knowspire`}
                </title>
            </Helmet>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    {contributorArticles[0]?.authorName || 'Contributor'}'s Articles
                </h1>
                <p >
                    Showing all articles by this contributor
                </p>
            </div>

            {contributorArticles.length === 0 ? (
                <div className="text-center text-gray-500 text-lg py-12">
                    <p>No articles found for this contributor.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {contributorArticles.map(article => (
                        <CatArticleCard key={article._id} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContributorPost;