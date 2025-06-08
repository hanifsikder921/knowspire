import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Typewriter from 'typewriter-effect';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router';

// Import all images
import r1 from "../../assets/r1.jpg";
import r2 from "../../assets/r2.jpg";
import r3 from "../../assets/r3.jpg";
import r4 from "../../assets/r4.jpg";

// Custom Arrow Components
const NextArrow = ({ onClick }) => (
    <div
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75"
        onClick={onClick}
    >
        <FaArrowRight />
    </div>
);

const PrevArrow = ({ onClick }) => (
    <div
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75"
        onClick={onClick}
    >
        <FaArrowLeft />
    </div>
);

const BannerSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    const slides = [
        {
            img: r1,
            title: "Explore Technology Articles",
            desc: "Discover the latest trends and innovations in technology world.",
            category: "Technology",
            route: "/technology"
        },
        {
            img: r2,
            title: "Educational Resources",
            desc: "Find valuable learning materials and educational insights.",
            category: "Education",
            route: "/education"
        },
        {
            img: r3,
            title: "Health & Wellness Guides",
            desc: "Get expert advice on health, fitness and mental wellbeing.",
            category: "Health",
            route: "/health"
        },
        {
            img: r4,
            title: "Business Strategies",
            desc: "Learn about entrepreneurship, management and market trends.",
            category: "Business",
            route: "/business"
        }
    ];

    return (
        <div className="relative mx-auto overflow-hidden rounded-lg">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index}>
                        <div className="h-[250px] md:h-[500px] w-full overflow-hidden rounded-lg">
                            <div
                                className="h-full w-full bg-cover bg-center relative"
                                style={{ backgroundImage: `url(${slide.img})` }}
                            >
                                {/* Overlay Layer */}
                                <div className="absolute inset-0 bg-black/40 z-[1]"></div>

                                {/* Text Content */}
                                <div className="relative z-[2] h-full w-full flex items-center justify-center text-white text-center px-4">
                                    <div>
                                        <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow mb-2 inline-block">
                                            {slide.category}
                                        </span>
                                        <h2 className="text-3xl md:text-5xl font-bold mb-4 ">
                                            <Typewriter
                                                options={{
                                                    strings: [`${slide.title}`],
                                                    autoStart: true,
                                                    loop: true,
                                                }}
                                            />
                                        </h2>
                                        <p className="text-lg">{slide.desc}</p>

                                        <Link to={slide.route} className="relative inline-flex items-center justify-center p-4 px-6 py-2 my-5 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                            </span>
                                            <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">Explore {slide.category}</span>
                                            <span className="relative invisible">Explore {slide.category}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default BannerSlider;