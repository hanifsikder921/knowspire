import React, { useEffect, useState } from 'react';
import CatArticleCard from '../ArticleCard/CatArticleCard';
import { TbChartBarPopular } from "react-icons/tb";

const PopularArticle = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/articles`);
                const data = await response.json();
                const shuffled = [...data].sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 4);

                setArticles(selected);
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading articles...</p>;

    return (
        <div className='my-12 md:my-18'>
            <div>
                <h3 className='text-3xl my-2 md:my-5 flex items-center gap-2 font-semibold p-2 md:p-0'>Popular Articles <TbChartBarPopular className='text-yellow-600' /> </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-2 md:p-0">
                {articles.map(article => (
                    <CatArticleCard key={article._id} article={article} />
                ))}
            </div>
        </div>
    );
};

export default PopularArticle;
