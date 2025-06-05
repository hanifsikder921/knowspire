import React, { Suspense, useState } from 'react';
import { useLoaderData } from 'react-router';
import ArticleCard from '../../components/ArticleCard/ArticleCard';

const AllArticlex = () => {


    const data = useLoaderData()

    const [articles, setArticles] = useState(data?.data || [])

    return (

        <div>

            <Suspense fallback={<p>Loading...</p>}>

                {
                    articles.map(article => <ArticleCard key={article._id} article={article}> </ArticleCard>)
                }

            </Suspense>
        </div>
    );
};

export default AllArticlex;