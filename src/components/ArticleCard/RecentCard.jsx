import React, { useEffect, useState } from 'react';

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
                articles.slice(-4).reverse().map((article) => (
                    <div key={article._id} className="p-4 border rounded-md shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold">{article.title}</h2>
                        <p className="text-sm text-gray-500">By {article.author}</p>
                        <p className="mt-2 text-gray-700">{article.content.slice(0, 100)}...</p>
                    </div>
                ))
            }
        </div>
    );
};

export default AllArticles;
