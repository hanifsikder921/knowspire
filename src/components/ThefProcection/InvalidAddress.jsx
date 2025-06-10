import React from 'react';
import { Link } from 'react-router';

const InvalidAddress = () => {
    return (
        <div className="mt-5 flex flex-col items-center justify-center px-4">
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Invalid Address</h2>
                <p className="text-gray-600 mb-6">Oops! The page you're looking for doesn't exist or the URL is incorrect.</p>
            </div>
        </div>
    );
};

export default InvalidAddress;
