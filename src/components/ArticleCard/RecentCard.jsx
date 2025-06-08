import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const AllArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/articles`);
                const data = await response.json();
                setArticles(data);
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
        <div className="w-11/12 mx-auto my-2 space-y-6">
            <h3 className='text-2xl font-bold mb-4'>Recent Articles</h3>
            {
                articles.slice(-3).reverse().map((article) => (
                    <div key={article._id} className="shadow shadow-amber-100 transition group overflow-hidden rounded-lg">

                        <div className='p-2'>
                            <div className="overflow-hidden rounded-md">
                                <img
                                    src={article.thumbnail}
                                    alt="No Image Found"
                                    className="transition-transform duration-300 group-hover:scale-105 w-full h-48 object-cover"
                                />
                            </div>
                            <h2 className='text-xl font-semibold mt-2'>{article.title}</h2>
                            <p>{article.content.slice(0, 50)}..</p>
                            <Link to={`/details/${article._id}`}>
                                <button className='btn btn-sm my-2'>See More</button>
                            </Link>
                        </div>

                    </div>

                ))
            }
        </div>
    );
};

export default AllArticles;
