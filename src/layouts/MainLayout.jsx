import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Header/Navbar';

const MainLayout = () => {
    return (
        <div className="min-h-screen text-white theme-gradient">

            <header className='border-b border-gray-300'>
                <Navbar />
            </header>

            <div className='md:w-11/12 mx-auto'>
                <main className="min-h-screen bg-opacity-80">
                    <section>
                        <Outlet />
                    </section>
                </main>
            </div>

        </div>
    );
};

export default MainLayout;
