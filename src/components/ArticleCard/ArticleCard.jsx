import { Link } from 'react-router';


const ArticleCard = ({ article }) => {
    const {
        _id,
        title,
        content,
        authorName,
        date,
        thumbnail,
        category,
        authorAvatar
    } = article;

    return (
        <div>
            <div className=" w-full mx-auto">

                <div className="grid gap-6">

                    <div className="group relative block rounded-xl focus:outline-hidden hover:shadow-md  cursor-pointer duration-300" >
                        <div className="shrink-0 relative rounded-xl overflow-hidden w-full h-87.5 before:absolute before:inset-x-0 before:z-1 before:size-full before:bg-linear-to-t before:from-gray-900/80">
                            <img className="size-full absolute top-0 start-0 object-cover transition-transform duration-500 group-hover:scale-105" src={thumbnail} alt="Blog Image" />
                        </div>


                        <div className="absolute top-0 inset-x-0 z-10">
                            <div className="p-4 flex flex-col h-full sm:p-6">
                                {/* Avatar */}
                                <div className="flex items-center">
                                    <div className="shrink-0">
                                        <img className="size-11 border-2 border-white rounded-full" src={authorAvatar} alt="Avatar" />
                                    </div>
                                    <div className="ms-2.5 sm:ms-4">
                                        <h4 className="font-semibold text-white bg-gray-500 px-2 rounded-2xl">
                                            {authorName}
                                        </h4>
                                        <p className="text-xs text-white/80 px-2">
                                            {new Date(date).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                                {/* End Avatar */}
                            </div>
                        </div>

                        <div className="absolute bottom-0 inset-x-0 z-10">
                            <div className="flex flex-col h-full p-4 sm:p-6">
                                <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/80 group-focus:text-white/80 line-clamp-2">
                                    {title}
                                </h3>
                                <p className="mt-2 text-white/80">
                                    {content.slice(0, 80)}...
                                </p>
                                <Link to={`/details/${_id}`}   onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='btn btn-primary flex w-fit my-1'>See More</Link>
                            </div>
                        </div>
                        <div>
                            <p className='bg-gradient-to-r from-[#2b2bff] to-[#ff00cc] text-white absolute top-0 z-10 right-0 px-2 py-1 rounded-bl-xl rounded-tr-xl text-sm'>{category}</p>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    );
};

export default ArticleCard;