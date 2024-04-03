import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { fetchProductsRequest } from '../../redux/actions/productActions'
import SkinCareProducts from './SkinCareProducts'
const Home = () => {
  const products = useSelector((state)=>state.product.products)
  const [productData,setProductData] = useState([])
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchProductsRequest())
  },[])
  useEffect(()=>{
    setProductData(products)
  },[products])
  console.log(productData)
  return (
    <>
      <SkinCareProducts data={productData}/>
    </>
  )
}

export default Home
