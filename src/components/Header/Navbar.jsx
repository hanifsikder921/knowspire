import React, { useContext, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import ThemesController from '../Themes/ThemesController';
import { useEffect } from 'react';
import profileicon from "../../assets/profile.png"
import Loading from '../Loading/Loading';


const Navbar = () => {
    const { user, logoutUser, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);


    const handleLogout = () => {
        logoutUser()
            .then(() => {
                localStorage.removeItem('token');
                Swal.fire("Success", "Logout successfully", "success");
                navigate("/auth/login");
            })
            .catch((error) => {
                Swal.fire("Error", error.message, "error");
            });
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const menu = (
        <div className="flex flex-col md:flex-row md:gap-10 gap-3 md:items-center">
            {[
                { path: "/", label: "Home" },
                { path: "/allArticles", label: "All Articles" },
                { path: "/about", label: "About" },
                { path: "/support", label: "Contact Us" },
            ].map(({ path, label }) => (
                <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                        `font-semibold transition-colors duration-300 text-base-content relative z-10 ${isActive
                            ? 'px-4 py-2 rounded-md bg-gradient-to-r from-[#2b2bff] to-[#ff00cc] text-white'
                            : ' hover:text-blue-500'
                        }`
                    }
                >
                    {label}
                </NavLink>
            ))}
            {
                user ? (
                    <button className="block md:hidden px-4 py-2 text-white rounded-md hover:bg-orange-600 transition">
                        <Link onClick={handleLogout} to="/auth/login" className="btn">Logout</Link>
                    </button>
                ) : (
                    <button className="block md:hidden px-4 py-2 text-white rounded-md hover:bg-orange-600 transition">
                        <Link to="/auth/login" className="btn">Login</Link>
                    </button>
                )
            }
        </div>
    );

    return loading ? (
        <Loading/>
    ) : (
        <div className="navbar w-11/12 mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow ">
                        {menu}
                    </ul>
                </div>
                <Link to='/' className=" text-2xl font-semibold  hidden md:flex">Know<span className="text-orange-600">S</span>pire</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                {menu}
            </div>
            <div className="navbar-end">
                <section className="flex items-center space-x-3 relative" ref={dropdownRef}>
                    {user ? (
                        <>
                            <div className="tooltip tooltip-bottom" data-tip={user.displayName || 'User'}>
                                <div className="avatar avatar-online cursor-pointer" onClick={toggleDropdown}>
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
                            {dropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 bg-violet-500  p-3 rounded-md shadow-lg z-50 space-y-2 w-48">
                                    <Link
                                        to={`/my-added-article/${user?.email}`}
                                        onClick={() => setDropdownOpen(false)}
                                        className="block hover:text-blue-400"
                                    >
                                        My Article
                                    </Link>
                                    <Link
                                        to="/postArticles"
                                        onClick={() => setDropdownOpen(false)}
                                        className="block hover:text-blue-400"
                                    >
                                        Post Article
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            handleLogout();
                                        }}
                                        className="block text-left w-full hover:text-red-500"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}

                        </>
                    ) : (
                        <>
                            <Link to="/auth/login" className="btn bg-blue-600 text-white hover:bg-blue-800 hidden md:flex">Login</Link>
                            <Link to="/auth/register" className="btn bg-purple-600 text-white hover:bg-purple-800 hidden md:flex">Signup</Link>
                        </>
                    )}
                    <ThemesController />
                </section>
            </div>
        </div>
    );
};

export default Navbar;
