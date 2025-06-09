import React, { useEffect, useState } from 'react';

const TopContributors = () => {
    const [contributors, setContributors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContributors = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/articles`);
                const data = await response.json();

                // extract unique contributors
                const uniqueContributors = [];
                const seenEmails = new Set();

                data.forEach(article => {
                    const { authorName, authorEmail, authorAvatar } = article;
                    if (!seenEmails.has(authorEmail)) {
                        uniqueContributors.push({ authorName, authorEmail, authorAvatar });
                        seenEmails.add(authorEmail);
                    }
                });

                // shuffle and pick 6
                const shuffled = uniqueContributors.sort(() => 0.5 - Math.random());
                const top6 = shuffled.slice(0, 4);

                setContributors(top6);
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
            <h3 className="text-3xl font-bold text-center mb-6">Top Contributors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-6">
                {contributors.map((contributor) => {
                    console.log(contributor.authorAvatar);

                    return (
                        <div key={contributor.authorEmail} className="bg-white shadow-md p-4 rounded-lg text-center">
                            <img
                                src={contributor.authorAvatar}
                                alt={contributor.authorName}
                                className="w-16 h-16 rounded-full mx-auto mb-2"
                            />
                            <h4 className="text-lg text-gray-700 font-semibold">{contributor.authorName}</h4>
                            <p className="text-sm text-gray-500">{contributor.authorEmail}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TopContributors;
