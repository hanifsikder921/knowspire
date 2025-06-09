import { createBrowserRouter } from "react-router";
import MainLayout from './../layouts/MainLayout';
import Home from "../pages/Home/Home";
import AuthencationLayout from './../layouts/AuthencationLayout';
import Login from './../pages/Login/Login';
import Register from './../pages/Register/Register';
import AllArticlex from "../pages/AllArticles/AllArticlex";
import PostArticles from "../pages/PostArticles/PostArticles";
import axios from "axios";
import PrivateRoute from "../provider/PrivateRoute";
import MyArticles from "../pages/MyArticles/MyArticles"
import Details from "../pages/Details/Details";
import CategoryLayout from "../layouts/CategoryLayout";
import UniversalCategory from "../pages/CategoryPage/UniversalCategory";
import ContributorPostLayout from "../layouts/ContributorPostLayout";
import ContributorPost from "../pages/TopContributor/ContributorPost";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Terms from "../pages/OptionalPage/Terms";
import ContactUs from "../pages/OptionalPage/ContactUs";
import AboutUs from "../pages/OptionalPage/AboutUs";
import PublicRoute from "../provider/PublicRoute";





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
                Component: AboutUs

            },
            {
                path: '/allArticles',
                loader: async () => {
                    try {
                        const res = await axios(`${import.meta.env.VITE_API_URL}/articles`);
                        return res;
                    } catch (err) {
                        throw new Response("Failed to load articles", {
                            status: 500,
                            statusText: "Internal Server Error",
                        });
                    }
                },

                Component: AllArticlex,
                errorElement: <ErrorPage/>
            },



            {
                path: '/postArticles',
                Component: () => <PrivateRoute><PostArticles /></PrivateRoute>


            },

            {
                path: '/support',
                Component: ContactUs

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
                        return { message: "Server Disconnected" };
                    }
                },
                Component: Details
            },
            {
                path: "terms",
                component: Terms
            }



        ]
    },

    {
        path: "/auth",
        Component: AuthencationLayout,
        children: [
            {
                path: "/auth/login",
                Component: () => <PublicRoute><Login /></PublicRoute>
            },
            {
                path: "/auth/register",
                Component: () => <PublicRoute><Register /></PublicRoute>
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
    {
        path: '*',
        Component: ErrorPage
    }



])



export default router;