import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";



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
        <div className=" flex items-center justify-center px-4 py-10 mt-8 transition-colors duration-300">
            <div className="w-full max-w-md p-8 space-y-4  rounded-lg shadow transition-colors duration-300  shadow-gray-200">
                <h2 className="text-2xl font-bold text-center text-orange-600 dark:text-orange-400">Log in</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 text-white rounded-md border border-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        required
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded-md border text-whited border-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            required
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-sm cursor-pointer text-orange-600 dark:text-orange-400 z-10"
                        >
                            {showPassword ? <IoIosEye size={20} /> : <IoIosEyeOff size={20} />}
                        </span>
                    </div>

                    <p onClick={handleForgotPassword} className="text-sm text-gray-600 dark:text-gray-400 hover:underline cursor-pointer">
                        Forgot password?
                    </p>

                    <button
                        type="submit"
                        className="cursor-pointer w-full py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                    Don’t have an account?{" "}
                    <Link to="/auth/register" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">
                        Signup
                    </Link>
                    <div className="divider text-orange-500">OR</div>
                </div>

                <button
                    onClick={handleGoogleSignin}
                    className="cursor-pointer w-full py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-medium border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
                >
                    <svg
                        aria-label="Google logo"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path fill="#0000" d="M0 0h512v512H0z" />
                        <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                        <path fill="#4285f4" d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                        <path fill="#fbbc02" d="M90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                        <path fill="#ea4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                    </svg>
                    Login with Google
                </button>

            </div>
        </div>

    );
};

export default Login;