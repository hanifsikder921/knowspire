import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { motion } from 'framer-motion';

const LatestArticles = () => {
    const [latestArticles, setLatestArticles] = useState([]);

    useEffect(() => {
        const getArticles = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/articles`);
                const allArticles = res.data;

                const lastFour = allArticles.slice(-4).reverse(); 
                setLatestArticles(lastFour);
            } catch (error) {
                // console.error("Error fetching latest articles:", error);
            }
        };

        getArticles();
    }, []);

    return (
        <div className="my-10">
    
            <motion.div
                className="divider divider-primary w-11/12 md:text-3xl font-semibold text-center mb-6 text-white md:w-6/12 mx-auto md:mt-25"
                animate={{
                    color: ["#8e44ad", "#60a5fa", "#facc15", "#f472b6", "#8e44ad"]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                Latest Articles
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 shadow shadow-amber-100 md:p-18 p-2 rounded-2xl">
                {latestArticles.map((article) => (
                    <div
                        key={article._id}
                        className="bg-white  p-4 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-md hover:shadow-amber-200"
                    >
                        <Link to={`/details/${article._id}`}>
                            <div>
                                <img
                                    src={article.thumbnail}
                                    alt={article.title}
                                    className="w-full h-40 object-cover rounded-md mb-2"
                                />
                                <h3 className="text-lg font-semibold text-gray-800">{article.title}</h3>
                                <p className="text-sm text-gray-500 mb-1">
                                    By {article.authorName}
                                </p>
                                <p className="text-sm text-gray-400">
                                    {new Date(article.date).toDateString()}
                                </p>
                            </div>
                        </Link>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default LatestArticles;
