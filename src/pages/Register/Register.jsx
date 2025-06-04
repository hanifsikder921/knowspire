import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { AuthContext } from '../../provider/AuthProvider';
// import { Helmet } from 'react-helmet-async';
const Register = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, updateDetails, setUser,googleSignin } = useContext(AuthContext)


    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photo.value;
        const password = form.password.value;

        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;

        if (!uppercase.test(password)) {
            return Swal.fire("Error", "Password must contain at least one uppercase letter", "error");
        }
        if (!lowercase.test(password)) {
            return Swal.fire("Error", "Password must contain at least one lowercase letter", "error");
        }
        if (password.length < 6) {
            return Swal.fire("Error", "Password must be at least 6 characters", "error");
        }

        createUser(email, password)
            .then((result) => {
               
                const currentUser = result.user;
                return updateDetails(currentUser, {
                    displayName: name,
                    photoURL: photoURL
                });


            })
            .then(() => {
                Swal.fire("Success", "Account created successfully", "success");
                navigate("/");
            })
            .catch((error) => {
                Swal.fire("Error", error.message, "error");
            });


    };


     const handleGoogleSignin = () => {
            googleSignin()
                .then((result) => {
                    const loggedInUser = result.user;
    
    
                    const updatedUser = {
                        displayName: loggedInUser.displayName || '',
                        photoURL: loggedInUser.photoURL || '',
                        email: loggedInUser.email
                    };
    
                    setUser(updatedUser);
                    Swal.fire("Success", "Successfully Logged In With Google", "success");
                    navigate("/");
                })
                .catch((error) => {
                    Swal.fire("Error", error.message, "error");
                });
        };
    





    return (
        <div className="py-10  flex items-center justify-center px-4">
            {/* <Helmet><title>Register - SubNest</title></Helmet> */}
            <div className="w-full max-w-md p-8 space-y-4 rounded-lg shadow shadow-gray-200">
                <h2 className="text-2xl font-bold text-center text-orange-400">Register Account</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="w-full px-4 py-2 rounded-md border border-gray-600   placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 rounded-md border border-gray-600  placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        required
                    />
                    <input
                        type="text"
                        name="photo"
                        placeholder="Photo URL"
                        className="w-full px-4 py-2 rounded-md border border-gray-600  placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        required
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded-md border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            required
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-sm cursor-pointer text-orange-400 z-10"
                        >
                            {showPassword ? <IoIosEye size={20} /> : <IoIosEyeOff size={20} />}
                        </span>
                    </div>

                    <button type="submit" className="w-full py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 transition duration-200">
                        Register
                    </button>
                </form>

                <div className="text-center text-sm text-gray-300">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="text-orange-400 font-semibold hover:underline">
                        Login
                    </Link>

                    <p> or</p>

                    
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
        </div>

    );
};

export default Register;