import React from 'react';
import { Outlet } from 'react-router';


const AuthencationLayout = () => {
    return (
        <div className="min-h-screen ">
            <Outlet></Outlet>
        </div>
    );
};

export default AuthencationLayout;