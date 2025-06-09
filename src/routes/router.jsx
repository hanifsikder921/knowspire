import { createBrowserRouter } from "react-router";
import MainLayout from './../layouts/MainLayout';
import Home from "../pages/Home/Home";
import AuthencationLayout from './../layouts/AuthencationLayout';
import Login from './../pages/Login/Login';
import Register from './../pages/Register/Register';
import About from "../pages/About/About";
import AllArticlex from "../pages/AllArticles/AllArticlex";
import Support from "../pages/Support/Support";
import PostArticles from "../pages/PostArticles/PostArticles";
import axios from "axios";
import PrivateRoute from "../provider/PrivateRoute";
import MyArticles from "../pages/MyArticles/MyArticles"
import Details from "../pages/Details/Details";
import CategoryLayout from "../layouts/CategoryLayout";
import UniversalCategory from "../pages/CategoryPage/UniversalCategory";
import ContributorPostLayout from "../layouts/ContributorPostLayout";
import ContributorPost from "../pages/TopContributor/ContributorPost";





const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/about',
                Component: About

            },
            {
                path: '/allArticles',
                loader: () => axios(`${import.meta.env.VITE_API_URL}/articles`),
                Component: AllArticlex

            },
            {
                path: '/postArticles',
                Component: () => <PrivateRoute><PostArticles /></PrivateRoute>


            },

            {
                path: '/support',
                Component: Support

            },
            {
                path: 'my-added-article/:email',
                loader: ({ params }) => {
                    const token = localStorage.getItem('token');
                    return axios(`${import.meta.env.VITE_API_URL}/my-articles/${params.email}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                },
                element: <PrivateRoute><MyArticles /></PrivateRoute>
            },
            {
                path: '/details/:id',
                loader: async ({ params }) => {
                    try {
                        const res = await fetch(`${import.meta.env.VITE_API_URL}/details/${params.id}`);
                        if (!res.ok) throw new Error("Failed to load post details");
                        return res.json();
                    } catch (err) {
                        console.error(err.message);
                        return null;
                    }
                },
                Component: Details
            },



        ]
    },

    {
        path: "/auth",
        Component: AuthencationLayout,
        children: [
            {
                path: "/auth/login",
                Component: Login
            },
            {
                path: "/auth/register",
                Component: Register
            }
        ]
    },

    {
        path: '/cat',
        Component: CategoryLayout,
        children: [
            {
                path: '/cat/:category',
                loader: () => axios(`${import.meta.env.VITE_API_URL}/articles`),
                Component: UniversalCategory
            }    
        ]
    },
    {
        path: '/contri',
        Component: ContributorPostLayout,
        children: [
            {
                path: '/contri/:authorEmail',
                loader: () => axios(`${import.meta.env.VITE_API_URL}/articles`),
                Component: ContributorPost
            }    
        ]
    },



])



export default router;