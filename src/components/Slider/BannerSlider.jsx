import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Typewriter from 'typewriter-effect';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router';

// Import all images
import health from "../../assets/health.jpeg";
import business from "../../assets/businesss.jpeg";
import education from "../../assets/education.jpeg";
import technology from "../../assets/technology.jpeg";

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
            img: technology,
            title: "Explore Technology Articles",
            desc: "Discover the latest trends and innovations in technology world.",
            category: "Technology",
            route: "/cat/technology"
        },
        {
            img: education,
            title: "Educational Resources",
            desc: "Find valuable learning materials and educational insights.",
            category: "Education",
            route: "/cat/education"
        },
        {
            img: health,
            title: "Health & Wellness Guides",
            desc: "Get expert advice on health, fitness and mental wellbeing.",
            category: "Health",
            route: "/cat/health"
        },
        {
            img: business,
            title: "Business Strategies",
            desc: "Learn about entrepreneurship, management and market trends.",
            category: "Business",
            route: "/cat/business"
        }
    ];

    return (
        <div className="relative mx-auto overflow-hidden rounded-lg p-2 md:p-0">
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
                                        <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 ">
                                            <Typewriter
                                                options={{
                                                    strings: [`${slide.title}`],
                                                    autoStart: true,
                                                    loop: true,
                                                }}
                                            />
                                        </h2>
                                        <p className="text-lg">{slide.desc}</p>



                                        <Link to={slide.route} className="inline-flex items-center justify-center my-5 w-fit px-3 md:px-8 py-1 md:py-4 text-base font-bold leading-6 text-white bg-indigo-600 rounded-2xl hover:bg-indigo-700">
                                            Explore {slide.category}
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