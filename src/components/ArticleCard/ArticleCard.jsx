import { Link } from 'react-router';

const ArticleCard = ({ article }) => {
    const { _id, title, authorName, date, thumbnail } = article;

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col">
            {/* Thumbnail Image */}
            {thumbnail && (
                <img
                    src={thumbnail}
                    alt={title}
                    className="h-48 w-full object-cover"
                />
            )}

            {/* Content */}
            <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h3>
                    <p className="text-sm text-gray-500 mb-1">
                        By <span className="font-medium">{authorName}</span>
                    </p>
                    <p className="text-sm text-gray-400 mb-4">
                        {new Date(date).toLocaleDateString()}
                    </p>
                </div>

                <Link
                    to={`/articles/${_id}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition mt-auto"
                >
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default ArticleCard;

