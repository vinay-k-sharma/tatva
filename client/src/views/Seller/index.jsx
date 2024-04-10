import React from 'react'
import { useState,useEffect } from 'react';
import { getSkinCare } from '../../utils/axios-instance';
import { useSelector, useDispatch } from 'react-redux';
import DashBoardStatsGrid from '../../components/common/DashboardStatsGrid'
import CategoryChart from '../Admin/CategoryChart';
const index = () => {
  const {seller} = useSelector((state)=> state.role)
  const [products, setProducts] = useState([]);
  const [productsCount,setProductsCount] = useState(0)
  const [usersCount,setUsersCount] = useState(5)
  const[ordersCount,setOrdersCount ] = useState(6)
  const [categoriesCount,setCategoriesCount] = useState(3)
  console.log(products)
  const fetchData = async () => {
    try {
      const productData = await getSkinCare();
      const productsToSellIds = seller.productsToSell;
      const filteredProducts = productData.data.filter((product) =>
        productsToSellIds.includes(product.id)
      );
      console.log(filteredProducts)
      setProducts(filteredProducts);
      setProductsCount(products.length)
      console.log(productsCount)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div className=' gap-4 mt-5'>
     <DashBoardStatsGrid productsCount={productsCount} usersCount={usersCount} ordersCount={ordersCount} categoriesCount={categoriesCount}/>
     <CategoryChart products={products}/>
    </div>
  )
}

export default index
