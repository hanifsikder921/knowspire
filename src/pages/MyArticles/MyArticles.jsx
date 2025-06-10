import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { Link } from 'react-router';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { LuEye } from 'react-icons/lu';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import PageWrapper from './../../components/TransitionWrapper/PageWrapper';

const MyArticles = () => {
    const { user } = useContext(AuthContext);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        tags: '',
        thumbnail: '',
        date: '',
    });


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
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirm.isConfirmed) {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.delete(`${import.meta.env.VITE_API_URL}/articles/${_id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data.deletedCount > 0) {
                    Swal.fire('Deleted!', 'Article has been deleted.', 'success');
                    const remaining = articles.filter(article => article._id !== _id);
                    setArticles(remaining);
                }
            } catch (error) {
                Swal.fire('Error', 'Failed to delete article', 'error');
            }
        }
    };

    const handleEditClick = (article) => {
        setSelectedArticle(article);
        setFormData({
            title: article.title,
            content: article.content,
            category: article.category,
            tags: article.tags?.join(', ') || '',
            thumbnail: article.thumbnail,
            date: article.date || ''
        });

        document.getElementById('updateModal').showModal();
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        fetch(`${import.meta.env.VITE_API_URL}/articles/${selectedArticle._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim())
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire('Updated!', 'Article has been updated.', 'success');
                    setArticles(prev =>
                        prev.map(article =>
                            article._id === selectedArticle._id ? { ...article, ...formData } : article
                        )
                    );
                    document.getElementById('updateModal').close();
                } else {
                    Swal.fire('No changes!', 'No data was changed.', 'info');
                }
            })
            .catch(err => {
                Swal.fire('Error', 'Update failed', 'error');
                console.error(err);
            });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner text-primary text-2xl"></span>
            </div>
        );
    }

    return (
        <PageWrapper>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <Helmet>
                    <title>My Article -KnowSpire</title>
                </Helmet>
                <h2 className="text-3xl font-bold mb-6 text-center text-primary">My Articles</h2>

                {articles?.length > 0 && (
                    <Link to="/postArticles">
                        <button className="btn btn-primary my-2">Add New</button>
                    </Link>
                )}

                {articles.length === 0 ? (
                    <div className="flex items-center flex-col gap-3">
                        <p className="text-center">You have not added any articles yet.</p>
                        <Link to="/postArticles">
                            <button className="btn btn-primary">Add New Article</button>
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
                                    {[...articles].reverse().map((article, index) => (
                                        <tr key={article._id} className="hover:bg-base-300 transition">
                                            <td>{index + 1}</td>
                                            <td>
                                                <img className="w-15 h-12 rounded-md" src={article.thumbnail} alt="No Image" />
                                            </td>
                                            <td>{article.title}</td>
                                            <td>{article.category}</td>
                                            <td>
                                                <span className={`badge ${article.status === 'Published' ? 'badge-success' : 'badge-error'}`}>
                                                    {article.status || 'Published'}
                                                </span>
                                            </td>
                                            <td className="space-x-2 text-center">
                                                <button className="btn btn-sm btn-warning" onClick={() => handleEditClick(article)}>
                                                    <FaEdit /> Edit
                                                </button>
                                                <button className="btn btn-sm btn-error" onClick={() => handleDelete(article._id)}>
                                                    <FaTrash /> Delete
                                                </button>
                                                <Link to={`/details/${article._id}`}>
                                                    <button className="btn btn-sm btn-success">
                                                        <LuEye /> View
                                                    </button>
                                                </Link>
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
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-lg">
                                                <span className="font-bold">{index + 1}</span> - {article.title}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Category:</span> {article.category}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Status:</span> {article.status || 'Published'}
                                            </p>
                                        </div>
                                        <div>
                                            <img className="w-15 h-12 rounded-lg" src={article.thumbnail} alt="" />
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-3 gap-2">
                                        <button className="btn btn-sm btn-warning" onClick={() => handleEditClick(article)}>
                                            <FaEdit /> Edit
                                        </button>
                                        <button className="btn btn-sm btn-error" onClick={() => handleDelete(article._id)}>
                                            <FaTrash /> Delete
                                        </button>
                                        <Link to={`/details/${article._id}`}>
                                            <button className="btn btn-sm btn-success">
                                                <LuEye /> View
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Update Modal */}
                <dialog id="updateModal" className="modal">
                    <div className="modal-box">

                        <div className="divider font-semibold text-lg">Update Article</div>
                        <form onSubmit={handleUpdate} className='space-y-2'>
                            <div>

                                <label className="block font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="input input-bordered w-full my-2"
                                    placeholder="Title"
                                    required
                                />
                            </div>


                            <div>


                                <label className="block font-medium mb-1">Content</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="textarea textarea-bordered w-full my-2"
                                    placeholder="Content"
                                    required
                                />
                            </div>


                            <div>
                                <label className="block font-medium mb-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="select select-bordered w-full"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Education">Education</option>
                                    <option value="Health">Health</option>
                                    <option value="Business">Business</option>
                                </select>
                            </div>

                            <div>

                                <label className="block font-medium mb-1">Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    className="input input-bordered w-full my-2"
                                    placeholder="Tags (comma separated)"
                                />
                            </div>

                            <div>


                                <label className="block font-medium mb-1">Thumbnail Image URL</label>
                                <input
                                    type="text"
                                    name="thumbnail"
                                    value={formData.thumbnail}
                                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                    className="input input-bordered w-full my-2"
                                    placeholder="Thumbnail Image URL"
                                />
                            </div>

                            <div>


                                <label className="block font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="input input-bordered w-full my-2"
                                />
                            </div>
                            <button className="btn btn-primary mt-2" type="submit">Update</button>
                        </form>

                        <form method="dialog">
                            <button className="btn mt-4">Close</button>
                        </form>
                    </div>
                </dialog>
            </div>
        </PageWrapper>
    );
};

export default MyArticles;
