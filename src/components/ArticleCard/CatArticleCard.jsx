import React from 'react';
import { Link } from 'react-router';

const CatArticleCard = ({ article }) => {
    return (
      <div className="rounded overflow-hidden shadow-lg hover:shadow-xl bg-white transition-shadow duration-300 flex flex-col md:flex-row p-5 gap-4">
        {/* Thumbnail Image Container with hover effect */}
        {article.thumbnail && (
          <div className="w-full md:w-3/12 h-48 md:h-auto overflow-hidden rounded cursor-pointer">
            <img
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              src={article.thumbnail}
              alt={article.title}
            />
          </div>
        )}

        <div className="flex-1 px-2 md:px-6 py-2 md:py-4">
          {/* Date */}
          <div className="text-gray-500 text-sm mb-2">
            {new Date(article.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>

          {/* Title */}
          <h3 className="font-bold text-xl mb-2 text-gray-800 line-clamp-2">{article.title}</h3>
          <p className="text-emerald-500 text-sm bg-emerald-50 border border-emerald-500 rounded-2xl px-3  w-fit">
            {article.category}
          </p>

          {/* Content preview with different lengths for mobile and desktop */}
          <p className="text-gray-600 text-base mb-4 md:hidden">
            {article.content.length > 50 ? `${article.content.slice(0, 50)}...` : article.content}
          </p>

          <p className="text-gray-600 text-base mb-4 hidden md:block">
            {article.content.length > 250 ? `${article.content.slice(0, 250)}...` : article.content}
          </p>

          <p className="text-gray-600 mb-4">
            Athor: <span className="font-semibold">{article?.authorName}</span>
          </p>

          {/* Read More button */}
          <Link
            to={`/details/${article?._id}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-[#2b2bff] to-[#ff00cc] text-white hover:font-semibold duration-200"
          >
            READ MORE
          </Link>
        </div>
      </div>
    );
};

export default CatArticleCard;