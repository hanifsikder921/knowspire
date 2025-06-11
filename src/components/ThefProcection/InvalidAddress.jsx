import React from 'react';
import { Link } from 'react-router';

const InvalidAddress = () => {
    return (
        <div className="mt-5 flex flex-col items-center justify-center px-4">
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-red-500 mb-2">Invalid Address</h2>
                <p className=" mb-6">Oops! The page you're looking for doesn't exist or the URL is incorrect.</p>
                <p className='font-bold text-xl text-orange-400'>কিরে ভাই এত জায়গা রাইখা এই চিপায় কি খুজতাছো ??</p>
            </div>
        </div>
    );
};

export default InvalidAddress;
