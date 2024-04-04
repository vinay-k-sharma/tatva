import {useSelector} from 'react-redux'
import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import PrivateRoutesUser from '../utils/private-routes/PrivateRoutesUser'
import PrivateRoutesAdmin from '../utils/private-routes/PrivateRoutesAdmin'
const ErrorPage = React.lazy(()=> import("../views/ErrorPage"))
const Layout = React.lazy(()=> import("../components/layout/Layout"))
const Home = React.lazy(()=> import("../views/Home"))
const Register = React.lazy(() => import("../views/Register"))
const Login = React.lazy(()=> import("../views/Login"))
const Contact = React.lazy(()=> import("../views/Contact"))
const About = React.lazy(()=> import("../views/About"))
const Cart = React.lazy(()=> import("../views/Cart"))
const Admin = React.lazy(()=> import("../views/Admin"))
const Wishlist = React.lazy(()=> import("../views/Whishlist"))
const Profile = React.lazy(()=> import("../views/Profile"))
const ProductDetails = React.lazy(()=> import("../views/ProductDetails"))
export const Router = () => {
    const role = useSelector((state)=>state.role)
    console.log(role.user)
    return createBrowserRouter([
        {
            element:<Layout/>,
            children:[
                {
                path:'/',
                element:<Home/>,
                },
                {
                    path:'/contact',
                    element:<Contact/>
                },
                {
                    path:'/products/:productID',
                    element:<ProductDetails/>
                },
                {
                    element:(
                        <PrivateRoutesUser isUserAuth={role.user!==null ? true : false} />
                    ),
                    children:[
                        {
                            path:'wishlist',
                            element:<Wishlist/>
                        },
                        {
                            path:'profile',
                            element:<Profile/>
                        },
                        {
                            path:'cart',
                            element:<Cart/>
                        }
                    ]
                },
                {
                    element:(
                        <PrivateRoutesAdmin
                        isAdminAuth={role.admin !== null ? true : false}
                      />
                    ),
                    children:[
                        {
                            path:'admin',
                            element:<Admin/>
                        }
                    ]
                },
                {
                    path:'login',
                    element:<Login/>
                },
                {
                    path:'register',
                    element:<Register/>
                }
            ]
        },
        {
            path:'*',
            element: <ErrorPage/>
        },
        
    ])
}