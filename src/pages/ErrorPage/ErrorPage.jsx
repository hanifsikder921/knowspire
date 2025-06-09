import React from 'react';
import { Link } from 'react-router';
import errorAnimation from "../../assets/errorAnimation.json"
import Lottie from 'lottie-react';

const ErrorPage = () => {
    return (
        <div className='flex  items-center justify-center min-h-screen md:max-w-7xl mx-auto'>
            <div className='w-full mx-auto flex md:flex-row flex-col justify-between flex-col-reverse  items-center'>

                <section className='space-y-3'>
                    <p className='md:text-xl font-bold'>Error Code 404</p>
                    <h3 className='md:text-7xl font-semibold'>OOOPS!!</h3>
                    <p className='md:text-5xl'>This is not the page You <br /> are looking for</p>
                    <Link to='/' className='btn btn-warning my-3'>Go Back Home</Link>
                </section>

                <section>

                    <div>
                        <Lottie animationData={errorAnimation}> </Lottie>
                    </div>

                </section>

            </div>
        </div>
    );
};

export default ErrorPage;