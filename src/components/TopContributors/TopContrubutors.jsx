import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const TopContributors = () => {
    const [contributors, setContributors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContributors = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/articles`);
                const data = await response.json();

                const uniqueContributors = [];
                const seenEmails = new Set();

                data.forEach(article => {
                    const { authorName, authorEmail, authorAvatar } = article;
                    if (!seenEmails.has(authorEmail)) {
                        uniqueContributors.push({ authorName, authorEmail, authorAvatar });
                        seenEmails.add(authorEmail);
                    }
                });

                const shuffled = uniqueContributors.sort(() => 0.5 - Math.random());
                const top4 = shuffled.slice(0, 4);

                setContributors(top4);
            } catch (error) {
                console.error("Error fetching contributors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContributors();
    }, []);

    if (loading) return <p className="text-center my-10">Loading contributors...</p>;

    return (
        <div className="my-10">
            <motion.div
                className="divider divider-primary w-11/12 md:text-3xl font-semibold text-center mb-6 text-white md:w-6/12 mx-auto md:mt-25"
                animate={{
                    color: ["#ffffff", "#60a5fa", "#facc15", "#f472b6", "#ffffff"]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                Top Contributors
            </motion.div>

            <section className='md:p-18 p-2 shadow shadow-emerald-300 rounded-xl'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {contributors.map((contributor, index) => (
                        <motion.div
                            key={contributor.authorEmail}
                            className="bg-white shadow-md p-4 rounded-lg text-center"
                            animate={{ y: [0, -10, 10, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.5,
                            }}
                        >
                            <img
                                src={contributor.authorAvatar}
                                alt={contributor.authorName}
                                className="w-16 h-16 rounded-full mx-auto mb-2"
                            />
                            <h4 className="text-lg text-gray-700 font-semibold">{contributor.authorName}</h4>
                            <p className="text-sm text-gray-500">{contributor.authorEmail}</p>
                            <Link 
                                to={`/contri/${encodeURIComponent(contributor.authorEmail)}`}
                                className="btn btn-primary my-2"
                            >
                                View Articles
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TopContributors;