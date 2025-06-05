import { createBrowserRouter } from "react-router";
import MainLayout from './../layouts/MainLayout';
import Home from "../pages/Home/Home";
import AuthencationLayout from './../layouts/AuthencationLayout';
import Login from './../pages/Login/Login';
import Register from './../pages/Register/Register';
import About from "../pages/About/About";
import AllArticlex from "../pages/AllArticles/AllArticlex";
import MyArticles from "../pages/MyArticles/MyArticles";
import Support from "../pages/Support/Support";
import PostArticles from "../pages/PostArticles/PostArticles";
import axios from "axios";




const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index:true,
                Component: Home,
            },
            {
                path:'/about',
                Component:About

            },
            {
                path:'/allArticles',
                loader: () => axios(`${import.meta.env.VITE_API_URL}/articles`),
                Component:AllArticlex

            },
            {
                path:'/myArticles',
                Component:MyArticles

            },
            {
                path:'/postArticles',
                Component:PostArticles

            },
            
            {
                path:'/support',
                Component:Support

            }
            

        ]
    },

    {
        path:"/auth",
        Component:AuthencationLayout,
        children:[
            {
                path:"/auth/login",
                Component:Login
            },
            {
                path:"/auth/register",
                Component:Register
            }
        ]
    }

])



export default router;