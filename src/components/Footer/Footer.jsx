import React from 'react';
import { Link } from 'react-router';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";


const Footer = () => {
    return (
        <div>

            <footer className="mt-auto w-full  py-10 px-4 sm:px-6 lg:px-8 mx-auto bg-base-200">
                {/* Grid */}
                <div className="text-center">
                    <div className='flex items-center justify-center'>
                        <Link
                            to="/"
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-2xl font-semibold  md:flex"
                        >
                            Know<span className="text-orange-600">S</span>pire
                        </Link>

                    </div>
                  

                    <div className="mt-3 flex justify-center items-center">
                        <div className='flex md:flex-row flex-col md:gap-8 gap-3'>
                            <Link to='/about' className='hover:underline duration-300 hover:font-semibold'>About us</Link>
                            <Link to='/support' className='hover:underline duration-300 hover:font-semibold'>Contact us</Link>
                            <Link to='/condition' className='hover:underline duration-300 hover:font-semibold'>Terms & Conditions</Link>
                        </div>
                    </div>

                    {/* Social Brands */}
                    <div className="mt-3 flex justify-center items-center">
                        <div className='flex gap-5 my-3'>
                            <a href="https://www.facebook.com/hanif.sikder.920" target="_blank" rel="noopener noreferrer" >
                                <FaFacebook className='hover:text-blue-500 hover:scale-125 duration-300' size={20} />
                            </a>
                            <a href="https://x.com/hanifsikder920" target="_blank" rel="noopener noreferrer" >
                                <FaTwitter className='hover:text-blue-500 hover:scale-125 duration-300' size={20} />
                            </a>
                            <a href="https://www.instagram.com/hanif.sikder.920/" target="_blank" rel="noopener noreferrer" >
                                <FaInstagram className='hover:text-blue-500 hover:scale-125 duration-300' size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/hanifsikder920/" target="_blank" rel="noopener noreferrer" >
                                <FaLinkedin className='hover:text-blue-500 hover:scale-125 duration-300' size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <p>© 2025 KnowSpire. All rights reserved.</p>
                    </div>
                </div>

            </footer>


        </div>
    );
};

export default Footer;