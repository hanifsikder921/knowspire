import React from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';

const MyArticleCard = ({ article, onDelete }) => {
    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://roommate-finder-server-site.vercel.app/items/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Listing has been deleted.",
                                icon: "success",
                                timer: 1500,
                            });
                            const remainingPost = posts.filter(post => post._id !== _id);
                            setPost(remainingPost);
                        }
                    });
            }
        });
    };

};

return (
    <tr className="border-b">
        <td className="p-2">{article.title}</td>
        <td className="p-2">{article.category}</td>
        <td className="p-2">{article.status || 'Published'}</td>
        <td className="p-2 space-x-2">
            <Link to={`/edit-article/${article._id}`} className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700">Edit</Link>
            <button onClick={()=>handleDelete(article._id)} className="btn btn-sm bg-red-600 text-white hover:bg-red-700">Delete</button>
        </td>
    </tr>
);
};

export default MyArticleCard;
