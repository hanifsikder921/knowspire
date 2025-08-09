import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';


const MainLayout = () => {
    return (

        <div className="min-h-screen flex flex-col">
            <header className='border-b border-base-300 sticky top-0 z-50 backdrop-blur-2xl'>
                <Navbar />
            </header>


            <main className=" w-11/12 mx-auto flex-grow md:my-8 my-2">
                <section>
                    <Outlet />
                </section>
            </main>


            <footer>
                <Footer />
            </footer>

        </div>

    );
};

export default MainLayout;
