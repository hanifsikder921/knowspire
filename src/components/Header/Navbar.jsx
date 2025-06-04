import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import ThemesController from '../Themes/ThemesController';

const Navbar = () => {


    const { user, logoutUser, loading } = useContext(AuthContext)
    const navigate = useNavigate()



    if (loading) {
        return (
            // <Loading></Loading>
            <p>filed</p>
        );
    }


    const handleLogout = () => {
        logoutUser()
            .then(() => {
                Swal.fire("Success", "Logout successfully", "success");
                navigate("/auth/login");
            })
            .catch((error) => {
                Swal.fire("Error", error.message, "error");
            });
    }




    const menu = (
        <div className="flex flex-col md:flex-row md:gap-10 gap-3 md:items-center">
            {[
                { path: "/", label: "Home" },
                { path: "/allArticles", label: "All Articles" },
                { path: "/myArticles", label: "My Article" },
                { path: "/about", label: "About" },
                { path: "/support", label: "Support" },

            ].map(({ path, label }) => (
                <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                        `font-semibold transition-colors duration-300 text-base-content relative z-10 ${isActive
                            ? 'px-4 py-2 rounded-md bg-gradient-to-r from-[#2b2bff] to-[#ff00cc] text-white'
                            : 'text-white hover:text-blue-500'
                        }`
                    }
                >
                    {label}
                </NavLink>

            ))
            }







            {
                user ? (
                    <button className="block md:hidden px-4 py-2 text-white rounded-md hover:bg-orange-600 transition">
                        <Link
                            onClick={'handleLogout'}
                            to="/auth/login"
                            className="btn "
                        >
                            Logout
                        </Link>
                    </button>
                ) :
                    (
                        <button className="block md:hidden px-4 py-2 text-white rounded-md hover:bg-orange-600 transition">
                            <Link
                                to="/auth/login"
                                className="btn "
                            >
                                Login
                            </Link>
                        </button>
                    )
            }

        </div >
    );


    return (
        <div className="navbar w-11/12 mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content theme-gradient rounded-box z-1 mt-3 w-52 p-2 shadow text-white">
                        {menu}
                    </ul>
                </div>
                <Link to='/' className=" text-2xl font-semibold  hidden md:flex">Know<span className="text-orange-600">S</span>pire </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                {menu}
            </div>
            <div className="navbar-end">

                <section className="flex items-center space-x-3">
                    {user ? (
                        <>
                            <div className="tooltip tooltip-bottom" data-tip={user.displayName || 'User'}>
                                <div className="avatar avatar-online cursor-pointer">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                        <img
                                            src={user.photoURL || profileicon}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = profileicon;
                                            }}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                            <Link
                                onClick={handleLogout}
                                to="/auth/login"
                                className="btn bg-blue-600 text-white hover:bg-blue-800 hidden md:flex"
                            >
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/auth/login"
                                className="btn bg-blue-600 text-white hover:bg-blue-800 hidden md:flex"
                            >
                                Login
                            </Link>
                            <Link
                                to="/auth/register"
                                className="btn bg-purple-600 text-white hover:bg-purple-800 hidden md:flex"
                            >
                                Signup
                            </Link>
                        </>
                    )}

                    <ThemesController />
                </section>



            </div>
        </div>
    );
};

export default Navbar;