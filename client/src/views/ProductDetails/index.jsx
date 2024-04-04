import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
const ProductDetails = () => {
    const getProductsFromStore = useSelector((state)=> state.product.products)
    console.log(getProductsFromStore)
    const [data,setData] = useState([])
    const params = useParams();
    const productId = params.productID; 
    console.log(productId); 
    const compare = ()=>{
        let comparedata = getProductsFromStore.filter((e)=>{
           
          return e.id == productId    
        });
        setData(comparedata);  
      }
      useEffect(()=>{
        compare()
      },[productId])
      console.log(data)
    return (
        <div>
            
        </div>
    );
}

export default ProductDetails;
