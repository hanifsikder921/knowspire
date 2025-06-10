import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../../components/TransitionWrapper/PageWrapper';

const PostArticles = () => {
    const { user } = useContext(AuthContext);
    console.log(user);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        tags: '',
        thumbnail: '',
        date: new Date().toISOString().slice(0, 10),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formDataRaw = new FormData(form);
        const rawData = Object.fromEntries(formDataRaw.entries());

        const articleData = {
            ...rawData,
            tags: rawData.tags.split(',').map(tag => tag.trim()),
            authorEmail: user?.email,
            authorName: user?.displayName,
            authorAvatar: user?.photoURL,
            author_id: user?.uid
        };

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/add-articles`, articleData);
            console.log(res.data);

            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Article posted successfully!',
                    timer: 2000,
                    showConfirmButton: false,
                });

                // Reset the form
                form.reset();

            } else {
                throw new Error('Insertion failed');
            }

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to post article.',
            });
        }
    };

    return (
        <PageWrapper>
            <div className="max-w-3xl mx-auto px-4 py-10">
                <Helmet>
                    <title>
                        Post New Article - Knowspire
                    </title>
                </Helmet>
                <h2 className=" text-2xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#2b2bff] to-[#ff00cc] text-white py-3 rounded-md ">Post a New Article</h2>
                <form onSubmit={handleSubmit} className="space-y-5 bg-base-200 p-6 rounded-xl shadow-md">

                    <div>
                        <label className="block font-medium mb-1">Title</label>
                        <input name="title" className="input input-bordered w-full" required />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Content</label>
                        <textarea name="content" className="textarea textarea-bordered w-full" rows={6} required></textarea>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Category</label>
                        <select name="category" className="select select-bordered w-full" required>
                            <option value="">Select Category</option>
                            <option value="Technology">Technology</option>
                            <option value="Education">Education</option>
                            <option value="Health">Health</option>
                            <option value="Business">Business</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Tags (comma-separated)</label>
                        <input name="tags" className="input input-bordered w-full" placeholder="e.g. react, javascript, frontend" />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Thumbnail Image URL</label>
                        <input name="thumbnail" type="url" className="input input-bordered w-full" required />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Date</label>
                        <input name="date" type="date" defaultValue={formData.date} className="input input-bordered w-full" required />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Author Info</label>
                        <input
                            type="text"
                            value={`${user?.displayName} (${user?.email})`}
                            className="input input-bordered w-full bg-base-100"
                            disabled
                        />
                    </div>

                    <div className="text-center pt-4">
                        <button type="submit" className="btn bg-blue-600 hover:bg-blue-800 text-white">
                            Post Article
                        </button>
                    </div>
                </form>
            </div>
        </PageWrapper>
    );
};

export default PostArticles;
