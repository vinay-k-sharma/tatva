import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { fetchProductsRequest } from '../../redux/actions/productActions'
import Card from './Card'
import MyCarousel from './Carousel'
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
    <div>
      <MyCarousel data={productData} />
       {/* <MyCarousel data={productData}  >
        
       </MyCarousel> */}
      <Card data={productData}/>
    </div>
  )
}

export default Home
