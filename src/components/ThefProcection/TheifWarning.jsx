import React from 'react';
import { Link } from 'react-router';

const TheifWarning = () => {
    return (
        <div className=" mt-8 flex items-center justify-center  px-4">
            <div className="shadow-lg rounded-2xl p-8 max-w-md text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">
                    Unauthorized Access Detected!
                </h2>
                <p className=" mb-6">
                    You are trying to access another user's data.<br />Sorry broo!!
                </p>
                <Link to="/">
                    <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-300">
                        Back To Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TheifWarning;
