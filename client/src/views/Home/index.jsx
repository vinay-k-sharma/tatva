import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { fetchProductsRequest } from '../../redux/actions/productActions'
import {useNavigate} from 'react-router-dom'
import SkinCareProducts from './SkinCareProducts'
const Home = () => {
  const products = useSelector((state)=>state.product.products)
  const {seller,admin} = useSelector((state) => state.role)
  const [productData,setProductData] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    admin ? 
    navigate('/admin')
    : seller ?
    navigate('/seller-dashboard')
    : null

  },[])
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

