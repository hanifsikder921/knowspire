import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import RecentCard from '../../components/ArticleCard/RecentCard';
import { FcLike } from "react-icons/fc";
import { GrFavorite } from "react-icons/gr";

const Details = () => {
    const article = useLoaderData();
    const { user } = useContext(AuthContext)
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState('');

    const {
        _id,
        title,
        content,
        category,
        tags,
        thumbnail,
        date,
        authorEmail,
        authorName,
        authorAvatar,
        likedBy = [],
    } = article;

    useEffect(() => {
        if (user?.email && likedBy.includes(user.email)) {
            setLiked(true);
        }
    }, [user, likedBy]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/articles/${_id}/comments`);
                setComments(res.data);
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'Failed to load comments', 'error');
            }
        };
        fetchComments();
    }, [_id]);

    const handleLike = async () => {
        if (!user) {
            return Swal.fire('Login Required', 'Please login to like this article', 'info');
        }

        try {
            const action = liked ? 'unlike' : 'like';
            await axios.patch(`${import.meta.env.VITE_API_URL}/articles/${_id}/like`, {
                userEmail: user.email,
                action
            });
            setLiked(!liked);
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Failed to update like status', 'error');
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const commentData = {
                user: user.displayName,
                userEmail: user.email,
                userPhoto: user.photoURL,
                text: newComment,
            };

            const res = await axios.post(`${import.meta.env.VITE_API_URL}/articles/${_id}/comments`, commentData);
            const newPostedComment = {
                ...commentData,
                _id: res.data.insertedId,
                createdAt: new Date()
            };
            setComments([newPostedComment, ...comments]);
            setNewComment('');
            Swal.fire('Success', 'Comment added successfully!', 'success');
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Failed to post comment', 'error');
        }
    };

    const handleEditComment = (comment) => {
        setEditingCommentId(comment._id);
        setEditCommentText(comment.text);
    };

    const handleUpdateComment = async (id) => {
        if (!editCommentText.trim()) return;

        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/articles/${_id}/comments/${id}`, {
                text: editCommentText
            });
            setComments(comments.map(c =>
                c._id === id ? { ...c, text: editCommentText, updatedAt: new Date() } : c
            ));
            setEditingCommentId(null);
            Swal.fire('Updated', 'Comment updated', 'success');
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Failed to update comment', 'error');
        }
    };

    const handleDeleteComment = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        });

        if (!result.isConfirmed) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/articles/${_id}/comments/${id}`, {
                data: { userEmail: user.email }
            });
            setComments(comments.filter(c => c._id !== id));
            Swal.fire('Deleted', 'Comment deleted', 'success');
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Failed to delete comment', 'error');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);
        if (diff < 60) return 'just now';
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        return `${Math.floor(diff / 86400)} days ago`;
    };

    if (!article) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 text-lg font-semibold">❌ Article not found!</p>
            </div>
        );
    }

    return (
        <div className='md:max-w-7xl  mx-auto p-2 grid grid-cols-1 md:grid-cols-3 gap-4'>
            <section className='col-span-2 '>
                <div className='space-y-3 shadow shadow-amber-100 p-2 rounded-2xl bg-[#1574c24b]'>

                    <div className='p-2'>
                        <img src={thumbnail} className='w-full rounded-xl' alt="" />
                    </div>

                    <div className='p-2 space-y-2'>
                        <h2 className='text-3xl font-semibold'>{title} </h2>
                        <button className='btn btn-xs '>{category}</button>
                        <p className='text-base'>{content}</p>

                        {/* Like Button  and comment*/}
                        <div className="mt-4 flex items-center gap-2">
                            <button onClick={handleLike} className="flex items-center gap-2 text-xl text-red-500 btn rounded-2xl">
                                {liked ? <FcLike /> : <GrFavorite />}
                                <span>{likedBy.length + (liked && !likedBy.includes(user?.email) ? 1 : 0) - (!liked && likedBy.includes(user?.email) ? 1 : 0)}</span>
                            </button>
                            <button className='btn rounded-2xl'>{comments.length} Comments</button>
                        </div>
                        {/* tag get  */}
                        <div>
                            
                            <h2 className='md:my-4 text-2xl font-semibold'>Tags</h2>
                            {
                                tags.map(tag=> <button className='btn  btn-dash mr-2'>{tag}</button>)
                            }

                        </div>

                        <h2 className='md:mt-4 text-2xl font-semibold'>Author</h2>
                        <div className='shadow shadow-amber-100 rounded-2xl p-2'>
                            <div className='flex md:flex-row flex-col md:items-center gap-2 justify-between'>
                                <div className='flex md:flex-row flex-col  md:items-center  gap-2'>
                                    <img className='rounded-full shadow shadow-amber-100 w-12 h-12' src={authorAvatar || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="" />
                                    <div className='flex flex-col'>
                                        <span>{authorName}</span>
                                        <span>{authorEmail}</span>
                                    </div>
                                </div>
                                <div>
                                    <span> Publish Date: {date}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div>
                        <h2 className='md:mt-4 text-2xl font-semibold'>Recent Comment</h2>

                        {user ? (
                            <form onSubmit={handleCommentSubmit} className="my-4">
                                <textarea
                                    className="w-full p-2 rounded border"
                                    rows="3"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write your comment..."
                                    required
                                />
                                <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">Submit</button>
                            </form>
                        ) : (
                            <p className="text-yellow-700">Please login to comment.</p>
                        )}

                        <div className="space-y-4 mt-4">
                            {comments.length === 0 ? (
                                <p>No comments yet.</p>
                            ) : (
                                comments.map(comment => (
                                    <div key={comment._id} className=" shadow shadow-amber-50 p-3 rounded ">
                                        <div className="flex justify-between">
                                            <div className="flex gap-2 items-center">
                                                <img className="w-8 h-8 rounded-full" src={comment.userPhoto} alt={comment.user} />
                                                <div>
                                                    <p className="font-semibold">{comment.user}</p>
                                                    <p className="text-sm ">{formatDate(comment.createdAt)}</p>
                                                </div>
                                            </div>

                                            {comment.userEmail === user?.email && (
                                                <div className="space-x-2 text-sm">
                                                    {editingCommentId === comment._id ? (
                                                        <>
                                                            <button onClick={() => handleUpdateComment(comment._id)} className="text-green-600">Save</button>
                                                            <button onClick={() => setEditingCommentId(null)} className="text-gray-600">Cancel</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button onClick={() => handleEditComment(comment)} className="text-blue-600">Edit</button>
                                                            <button onClick={() => handleDeleteComment(comment._id)} className="text-red-600">Delete</button>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {editingCommentId === comment._id ? (
                                            <textarea
                                                value={editCommentText}
                                                onChange={(e) => setEditCommentText(e.target.value)}
                                                className="w-full mt-2 p-2 border rounded"
                                            />
                                        ) : (
                                            <p className="mt-2">{comment.text}</p>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className='shadow shadow-amber-100 p-4 rounded-2xl bg-[#1574c24b] '>
                <RecentCard></RecentCard>
            </section>
        </div>
    );
};

export default Details;





