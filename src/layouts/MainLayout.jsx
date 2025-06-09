import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Header/Navbar';

const MainLayout = () => {
    return (
        <div >

            <header className='border-b border-gray-300'>
                <Navbar />
            </header>

            <div className='md:w-11/12 mx-auto'>
                <main className=" mt-8">
                    <section>
                        <Outlet />
                    </section>
                </main>
            </div>

        </div>
    );
};

export default MainLayout;
