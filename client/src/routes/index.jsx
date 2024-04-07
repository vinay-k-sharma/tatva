import {useSelector} from 'react-redux'
import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import PrivateRoutesUser from '../utils/private-routes/PrivateRoutesUser'
import PrivateRoutesAdmin from '../utils/private-routes/PrivateRoutesAdmin'
const ErrorPage = React.lazy(()=> import("../views/ErrorPage"))
const Layout = React.lazy(()=> import("../components/layout/Layout"))
const Home = React.lazy(()=> import("../views/Home"))
const RegisterUser = React.lazy(() => import("../views/Register/RegisterUser"))
const Login = React.lazy(()=> import("../views/Login"))
const Contact = React.lazy(()=> import("../views/Contact"))
const About = React.lazy(()=> import("../views/About"))
const Cart = React.lazy(()=> import("../views/Cart"))
const AdminDashboard = React.lazy(()=> import("../views/Admin"))
const Admin_Users = React.lazy(()=>import ('../views/Admin/Admin-Users'))
const Admin_Update_User = React.lazy(()=> import('../views/Admin/Admin-Users/Admin_Update_User'))
const Admin_Add_User = React.lazy(()=> import('../views/Admin/Admin-Users/Admin_Add_User'))
const Admin_Products = React.lazy(()=>import ('../views/Admin/Admin-Products'))
const Admin_Add_Product = React.lazy(()=> import ('../views/Register/RegisterProduct'))
const UpdateProduct = React.lazy(()=> import ('../views/Register/UpdateProduct'))
const Admin_Categories = React.lazy(()=>import ('../views/Admin/Admin-Categories'))
const Add_Admin_Categories = React.lazy(()=>import ('../views/Register/RegisterCategory'))
const Update_Admin_Categories = React.lazy(()=> import ('../views/Admin/Admin-Categories/Admin_Update_Category'))
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
                            element:<AdminDashboard/>
                        },
                        {
                            path: 'admin-users',
                            element: <Admin_Users/>
                        },
                        {
                            path: "admin-update-user/:userId",
                            element : <Admin_Update_User/>
                        },
                        {
                            path: "admin-add-user",
                            element : <Admin_Add_User/>
                        },
                        {
                            path : 'admin-products',
                            element: <Admin_Products/>
                        }, 
                        {
                            path : 'admin-add-product',
                            element: <Admin_Add_Product/>
                        }, 
                        {
                            path : 'admin-update-product/:prodId',
                            element: <UpdateProduct/>
                        }, 
                        {
                            path: 'admin-categories',
                            element: <Admin_Categories/>
                        },
                        {
                            path: 'admin-add-categories',
                            element: <Add_Admin_Categories/>
                        },
                        {
                            path: 'admin-update-category/:categoryId',
                            element: <Update_Admin_Categories/>
                        }
                    ]
                },
                {
                    path:'login',
                    element:<Login/>
                },
                {
                    path:'register',
                    element:<RegisterUser/>
                }
            ]
        },
        {
            path:'*',
            element: <ErrorPage/>
        },
        
    ])
}