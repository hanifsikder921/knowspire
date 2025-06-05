import React, { Suspense, useState } from 'react';
import { useLoaderData } from 'react-router';
import ArticleCard from '../../components/ArticleCard/ArticleCard';

const AllArticlex = () => {


    const data = useLoaderData()

    const [articles, setArticles] = useState(data?.data || [])

    return (

        <div>

            <Suspense fallback={<p>Loading...</p>}>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>


                    {
                        articles.map(article => <ArticleCard key={article._id} article={article}> </ArticleCard>)

                    }
                </div>

            </Suspense>
        </div>
    );
};

export default AllArticlex;