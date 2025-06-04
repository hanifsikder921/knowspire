import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Header/Navbar';

const AuthencationLayout = () => {
    return (
        <div className="min-h-screen theme-gradient">
            <header className=' border-b-1 border-gray-300'>
                <Navbar />
            </header>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthencationLayout;