import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../../components/TransitionWrapper/PageWrapper';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const { loginUser, setUser, googleSignin } = useContext(AuthContext)
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const userCredential = await loginUser(email, password);
            const user = userCredential.user;
            setUser(user);

            Swal.fire("Success", "Login successfully", "success").then(() => {
                navigate(from, { replace: true });
            });
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    const handleGoogleSignin = () => {
        const from = location.state?.from?.pathname || "/";

        googleSignin()
            .then((result) => {
                const loggedInUser = result.user;

                const updatedUser = {
                    displayName: loggedInUser.displayName || '',
                    photoURL: loggedInUser.photoURL || '',
                    email: loggedInUser.email
                };

                setUser(updatedUser);

                Swal.fire("Success", "Successfully Logged In With Google", "success").then(() => {
                    navigate(from, { replace: true });
                });
            })
            .catch((error) => {
                Swal.fire("Error", error.message, "error");
            });
    };

    const handleForgotPassword = () => {
        navigate("/auth/forgot-password", { state: { email: document.querySelector('input[name="email"]').value } })
    }

    return (
        
            <div className="flex items-center justify-center px-4 py-10">
                <Helmet>
                    <title>
                        Login to Your Account - KnowSpire
                    </title>
                </Helmet>
                <div className="mt-7 rounded-xl shadow shadow-gray-200 w-full max-w-md">
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <h1 className="block text-2xl font-bold ">Sign in</h1>
                            <p className="mt-2 text-sm ">
                                Don't have an account yet?
                                <Link className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium ml-1" to="/auth/register">
                                    Sign up here
                                </Link>
                            </p>
                        </div>

                        <div className="mt-5">
                            <button
                                type="button"
                                onClick={handleGoogleSignin}
                                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                                    <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
                                    <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
                                    <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
                                    <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
                                </svg>
                                Sign in with Google
                            </button>

                            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">Or</div>

                            {/* Form */}
                            <form onSubmit={handleLogin}>
                                <div className="grid gap-y-4">
                                    {/* Email Input */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm mb-2 ">Email address</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="py-2.5 sm:py-3 px-4 block w-full border border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                required
                                                aria-describedby="email-error"
                                            />
                                        </div>
                                    </div>

                                    {/* Password Input */}
                                    <div>
                                        <div className="flex flex-wrap justify-between items-center gap-2 ">
                                            <label htmlFor="password" className="block text-sm mb-2">Password</label>
                                            <button
                                                type="button"
                                                onClick={handleForgotPassword}
                                                className="inline-flex items-center gap-x-1 text-sm text-blue-600  hover:underline focus:outline-hidden focus:underline font-medium"
                                            >
                                                Forgot password?
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                className="py-2.5  sm:py-3 px-4 block w-full border border-gray-300  rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500  disabled:pointer-events-none"
                                                required
                                                aria-describedby="password-error"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 end-0 pe-3 flex items-center "
                                            >
                                                {showPassword ? <IoIosEye size={20} /> : <IoIosEyeOff size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Remember Me Checkbox */}
                                    <div className="flex items-center ">
                                        <div className="flex">
                                            <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500" />
                                        </div>
                                        <div className="ms-3">
                                            <label htmlFor="remember-me" className="text-sm">Remember me</label>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        
    );
};

export default Login;