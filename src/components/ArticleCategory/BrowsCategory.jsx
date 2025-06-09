import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const BrowsCategory = () => {
    const categories = [
        {
            id: 1,
            name: "Business",
            route: "/cat/business"
        },
        {
            id: 2,
            name: "Health",
            route: "/cat/health"
        },
        {
            id: 3,
            name: "Education",
            route: "/cat/education"
        },
        {
            id: 4,
            name: "Technology",
            route: "/cat/technology"
        },
    ];

    return (
        <div >

            <motion.div
                className="divider divider-primary w-11/12 md:text-3xl font-semibold text-center mb-6 text-white md:w-6/12 mx-auto"
                animate={{
                    color: ["#8e44ad", "#60a5fa", "#facc15", "#f472b6", "#8e44ad"]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                Browse Categories
            </motion.div>
            <div className='shadow shadow-violet-500 my-8  rounded-lg md:p-25  w-11/12 md:w-full mx-auto p-2 '>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    {categories.map(category => (
                        <Link key={category.id} to={category.route}>
                            <div className="bg-gradient-to-br from-violet-100/30 to-amber-200/10 border border-violet-200 rounded-2xl p-5 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-amber-300 cursor-pointer text-center">
                                <h4 className="text-xl font-semibold ">{category.name}</h4>
                                <p className="text-sm  mt-2">Explore {category.name} articles</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrowsCategory;
