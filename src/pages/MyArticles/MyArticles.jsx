import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';
import ArticleCard from '../../components/ArticleCard/ArticleCard';


const MyArticles = () => {
    const { user } = useContext(AuthContext)
    const [articles, setArticles] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios(`${import.meta.env.VITE_API_URL}/my-articles/${user?.email}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(data => {
                console.log(data?.data)
                setArticles(data?.data)

            })
            .catch(err => {
                console.log(err);

            })
    }, [user])

    return (
        <div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>


                {
                    articles.map(article => <ArticleCard key={article._id} article={article}> </ArticleCard>)

                }
            </div>


        </div>
    );
};

export default MyArticles;