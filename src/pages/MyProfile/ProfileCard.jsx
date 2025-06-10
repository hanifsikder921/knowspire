import React, { useContext, useState, useEffect } from 'react';
import { FaUserLarge } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import profileicon from '../../assets/profile.png';
import Swal from 'sweetalert2';
import { getAuth } from 'firebase/auth';
import { AuthContext } from '../../provider/AuthProvider';
import { IoNewspaperOutline } from "react-icons/io5";
import MyArticles from '../MyArticles/MyArticles';

const auth = getAuth();

const ProfileCard = () => {
    const { user, updateDetails, setUser } = useContext(AuthContext);

    const [isEditing, setIsEditing] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [activeSection, setActiveSection] = useState('profile'); 

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setPhotoURL(user.photoURL || '');
        }
    }, [user]);

    const handleSave = async () => {
        if (!displayName.trim()) {
            Swal.fire("Empty Name", "Name field cannot be empty.", "error");
            return;
        }

        if (!photoURL.trim()) {
            Swal.fire("Empty Url", "Photo URL cannot be empty", "error");
            return;
        }

        try {
            await updateDetails(auth.currentUser, { displayName, photoURL });
            await auth.currentUser.reload();
            setUser(auth.currentUser);

            setIsEditing(false);
            Swal.fire("Success", "Updated", "success");
        } catch (error) {
            console.error('Update failed:', error);
            Swal.fire("Error", error.message, "error");
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0f0f1a] text-white">
                <p>Loading profile...</p>
            </div>
        );
    }

    return (
        <div className=" p-4 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 md:max-w-7xl mx-auto">
                <div className=" bg-base-300 rounded-xl w-full md:w-1/4 p-4">
                    <div className="flex flex-col items-center text-center">
                        <img
                            src={user?.photoURL || profileicon}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = profileicon;
                            }}
                            className="w-[120px] h-[120px] object-cover rounded-full"
                        />
                        <h2 className="text-xl font-semibold mt-4">{user?.displayName}</h2>
                        <p className="text-sm text-purple-300">Active</p>
                        <p className="text-sm truncate">{user?.email}</p>
                        <p className="text-sm text-gray-400">+8801700000001</p>
                        <div className="w-full bg-gray-700 h-1 rounded mt-4">
                            <div className="bg-purple-400 h-1 rounded" style={{ width: '70%' }}></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Complete your profile</p>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div 
                            className={`flex items-center gap-2 p-2 rounded cursor-pointer ${activeSection === 'profile' ? 'bg-purple-500 text-white' : 'bg-base-100'}`}
                            onClick={() => setActiveSection('profile')}
                        >
                            <span className="text-lg"><FaUserLarge /></span> My Profile 
                            {activeSection === 'profile' && <span className="ml-auto text-green-400">✔</span>}
                        </div>
                        <div 
                            className={`flex items-center gap-2 p-2 rounded cursor-pointer ${activeSection === 'article' ? 'bg-purple-500 text-white' : 'bg-base-100'}`}
                            onClick={() => setActiveSection('article')}
                        >
                            <span className="text-lg"><IoNewspaperOutline /> </span> My Article 
                            {activeSection === 'article' && <span className="ml-auto text-green-400">✔</span>}
                        </div>
                    </div>
                </div>

                {/* Dynamic Section */}
                <div className=" bg-base-300 rounded-xl w-full md:w-3/4 p-6">
                    {activeSection === 'profile' ? (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold text-purple-400">My Profile</h3>
                                <button
                                    className="text-purple-400 hover:text-purple-300 hover:cursor-pointer"
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    <FiEdit size={20} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-400 text-sm">Full Name</p>
                                    {isEditing ? (
                                        <input
                                            className="bg-gray-800 text-white p-2 rounded w-full"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                        />
                                    ) : (
                                        <p className="font-medium">{user?.displayName}</p>
                                    )}
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm">Email</p>
                                    <p className="font-medium">{user?.email}</p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm">Image Url</p>
                                    {isEditing ? (
                                        <input
                                            className="bg-gray-800 text-white p-2 rounded w-full"
                                            value={photoURL}
                                            onChange={(e) => setPhotoURL(e.target.value)}
                                        />
                                    ) : (
                                        <p className="font-medium line-clamp-1">{user?.photoURL}</p>
                                    )}
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm">Mobile Number</p>
                                    <p className="font-medium">+8801700000001</p>
                                </div>
                            </div>

                            {isEditing && (
                                <div className="mt-6">
                                    <button
                                        onClick={handleSave}
                                        className="bg-purple-500 hover:bg-purple-600 cursor-pointer text-white px-4 py-2 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                          
                            
                            <div>
                                <MyArticles/>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;