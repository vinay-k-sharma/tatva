import React, { useEffect, useState } from 'react'
import {getSkinCare,getUsers,getUserOrders,getCategories} from '../../utils/axios-instance'
import DashBoardStatsGrid from '../../components/common/DashboardStatsGrid'
import CategoryChart from './CategoryChart'
const AdminDashboard = () => {
  const [productsCount,setProductsCount] = useState(0)
  const [usersCount,setUsersCount] = useState(0)
  const[ordersCount,setOrdersCount ] = useState(0)
  const [categoriesCount,setCategoriesCount] = useState(0)
  const [products,setProducts] = useState([])
  console.log(products)
  const fetchCounts = async () => {
    try {
      const products = await getSkinCare()
      setProductsCount(products.data.length)
      setProducts(products.data)
      const users = await getUsers()
      setUsersCount(users.data.length)
      const categories = await getCategories()
      setCategoriesCount(categories.data.length) 
      const orders = await getUserOrders()
      setOrdersCount(orders.data.length)
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchCounts()
  },[])
  console.log(products)
  return (
    <div className=' gap-4 mt-5'>
     <DashBoardStatsGrid productsCount={productsCount} usersCount={usersCount} ordersCount={ordersCount} categoriesCount={categoriesCount}/>
     <CategoryChart products={products}/>
    </div>
  )
}

export default AdminDashboard
