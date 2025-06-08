import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { Link } from 'react-router';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
// import { Helmet } from 'react-helmet-async';
import axios from 'axios';


const MyArticles = () => {
    const { user } = useContext(AuthContext);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (user?.email) {
            axios(`${import.meta.env.VITE_API_URL}/my-articles/${user.email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    setArticles(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user]);

    const handleDelete = async (_id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (confirm.isConfirmed) {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.delete(`${import.meta.env.VITE_API_URL}/articles/${_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Article has been deleted.", "success");
                    const remaining = articles.filter(article => article._id !== _id);
                    setArticles(remaining);
                }
            } catch (error) {
                Swal.fire("Error", "Failed to delete article", error);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner text-primary text-2xl"></span>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* <Helmet title='My Articles - Knowledge Share' /> */}
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">My Articles</h2>

            <Link to='/add-article'>
                <button className='btn btn-primary my-2'>Add New</button>
            </Link>

            {articles.length === 0 ? (
                <div className='flex items-center flex-col gap-3'>
                    <p className="text-center">You have not added any articles yet.</p>
                    <Link to='/add-article'>
                        <button className='btn btn-primary'>Add New Article</button>
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    {/* Desktop View */}
                    <div className="hidden md:block">
                        <table className="table w-full">
                            <thead className="bg-base-200 text-base font-semibold">
                                <tr>
                                    <th>SL.</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map((article, index) => (
                                    <tr key={article._id} className="hover:bg-base-300 transition">
                                        <td>{index + 1}</td>
                                        <td>
                                            <img className='w-15 h-12 rounded-md' src={article?.thumbnail} alt="No Image" />
                                        </td>
                                        <td>{article.title}</td>
                                        <td>{article.category}</td>
                                        <td>
                                            <span className={`badge ${article.status === 'Published' ? 'badge-success' : 'badge-error'}`}>
                                                {article.status || 'Published'}
                                            </span>
                                        </td>
                                        <td className="space-x-2 text-center">
                                            <Link to={`/edit-article/${article._id}`} className="btn btn-sm btn-warning">
                                                <FaEdit /> Edit
                                            </Link>
                                            <button onClick={() => handleDelete(article._id)} className="btn btn-sm btn-error">
                                                <FaTrash /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden space-y-4 mx-auto">
                        {articles.map((article, index) => (
                            <div key={article._id} className="p-4 rounded-lg bg-base-300 shadow-md">
                                <p className='font-semibold text-lg'><span className="font-bold">{index + 1}</span> - {article.title}</p>
                                <p><span className="font-semibold">Category:</span> {article.category}</p>
                                <p><span className="font-semibold">Status:</span> {article.status || 'Published'}</p>
                                <div className="flex justify-center mt-3 gap-2">
                                    <Link to={`/edit-article/${article._id}`} className="btn btn-sm btn-warning">
                                        <FaEdit /> Edit
                                    </Link>
                                    <button onClick={() => handleDelete(article._id)} className="btn btn-sm btn-error">
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyArticles;
