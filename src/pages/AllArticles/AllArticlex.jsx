import React, { Suspense, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import Loading from '../../components/Loading/Loading';
import { Helmet } from 'react-helmet-async';
import PageWrapper from './../../components/TransitionWrapper/PageWrapper';
import fileLoading from '../../assets/loading.json'
import Lottie from 'lottie-react';



const AllArticles = () => {
    const data = useLoaderData();
    const [articles, setArticles] = useState(data?.data || []);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/articles`)
            .then(res => res.json())
            .then(data => {
                setArticles(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error loading posts:", error);
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (category) => {
        setFilterCategory(category === filterCategory ? '' : category);
    };

    const handleClearFilter = () => {
        setFilterCategory('');
        setSearchTerm('');
    };

    const filteredArticles = articles.filter(article => {
        const matchesCategory = filterCategory ? article.category === filterCategory : true;
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.authorName.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

     if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className='w-[100px] h-[100px]'>
                    <Lottie animationData={fileLoading} />
                </div>
            </div>
        );
    }

    return (
        <PageWrapper>
            <div>
                <Helmet title='All Article - Knowspire'></Helmet>
                
                    <div className='my-2 flex flex-col md:flex-row items-center justify-between md:w-full w-11/12 mx-auto'>
                        <div className='flex flex-col md:flex-row items-center'>
                            <div className='text-xl font-semibold my-2'>
                                Filter Articles :
                            </div>

                            <div className="flex gap-2 flex-wrap items-center mx-2">
                                <button
                                    onClick={() => handleFilterChange('Technology')}
                                    className={`btn ${filterCategory === 'Technology' ? 'bg-blue-500 text-white' : ''}`}
                                >
                                    Technology
                                </button>
                                <button
                                    onClick={() => handleFilterChange('Education')}
                                    className={`btn ${filterCategory === 'Education' ? 'bg-blue-500 text-white' : ''}`}
                                >
                                    Education
                                </button>
                                <button
                                    onClick={() => handleFilterChange('Health')}
                                    className={`btn ${filterCategory === 'Health' ? 'bg-blue-500 text-white' : ''}`}
                                >
                                    Health
                                </button>
                                <button
                                    onClick={() => handleFilterChange('Business')}
                                    className={`btn ${filterCategory === 'Business' ? 'bg-blue-500 text-white' : ''}`}
                                >
                                    Business
                                </button>

                                {(filterCategory || searchTerm) && (
                                    <button onClick={handleClearFilter} className="btn btn-sm btn-error text-white">
                                        Clear Filter
                                    </button>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="input focus-within:ring-1 focus-within:outline-none focus-within:border-none md:min-w-xl my-2">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.3-4.3"></path>
                                    </g>
                                </svg>
                                <input
                                    type="search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    placeholder="Search by title or author"
                                    className="focus:outline-none focus:ring-0 focus:border-transparent border-none"
                                />
                            </label>
                        </div>
                    </div>

                    <div className='my-2 mx-2 md:mx-0'>
                        <p className='font-semibold'>
                            Total <span className='font-bold text-blue-500'>{filteredArticles.length}</span> Articles Found
                            {filterCategory && ` in "${filterCategory}" category`}
                        </p>
                    </div>

                    {filteredArticles.length === 0 ? (
                        <p className="text-center text-red-500 text-lg mt-10">
                            No articles found {filterCategory && `for "${filterCategory}"`}
                        </p>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-2 md:mx-0 '>
                            {filteredArticles.map(article => (
                                < ArticleCard key={article._id} article={article} />
                            ))}
                        </div>
                    )}
               
            </div>
        </PageWrapper>
    );
};

export default AllArticles;