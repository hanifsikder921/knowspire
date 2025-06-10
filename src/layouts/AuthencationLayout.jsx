import React from 'react';
import { Link, Outlet } from 'react-router';
import { IoArrowBack } from "react-icons/io5";


const AuthencationLayout = () => {
    return (
        <div className="min-h-screen md:w-11/12 mx-auto ">
            <div className='mt-5 w-11/12 mx-auto md:w-full'>
                <Link to="/" className='flex items-center text-xl gap-2 hover:font-semibold duration-300  w-fit p-2'>
                <IoArrowBack size={25} /> Back to Home
                </Link>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthencationLayout;