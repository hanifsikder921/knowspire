import { Link } from 'react-router';


const ArticleCard = ({ article }) => {
    const {
        _id,
        title,
        authorName,
        date,
        thumbnail,
        category,
        authorAvatar // Optional: যদি প্রোফাইল পিকচার থাকে
    } = article;


  

    return (
        <div className="rounded-2xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col shadow-amber-300 bg-[#0000004f]">
            {/* Thumbnail with Category Badge */}
            <div className="relative">
                <img
                    src={thumbnail}
                    alt={title}
                    className="h-48 w-full object-cover"
                />
                {category && (
                    <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
                        {category}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col justify-between flex-grow">
                <h3 className="text-xl font-semibold  mb-2 line-clamp-2 text-white">{title}</h3>
                <p className="text-sm  mb-5 line-clamp-2 text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis...
                </p>

                <Link to={`/details/${_id}`}>
                    <button className='btn btn-primary my-2'>Read More</button>
                </Link>


                {/* Author Section */}
                <div className="flex items-center justify-between mt-auto pt-3">
                    <div className="flex items-center space-x-3 mt-2">
                        <img
                            src={authorAvatar || 'https://i.ibb.co/4pDNDk1/avatar.png'}
                            alt={authorName}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="text-sm  font-medium text-white">
                            {authorName}
                        </div>
                    </div>
                    <div className="text-xs text-white  mt-2">
                        {new Date(date).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
