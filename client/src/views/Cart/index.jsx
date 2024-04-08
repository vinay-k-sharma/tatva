import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CiCircleRemove } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoIosRemove } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { DELETE, REMOVE_ONE, ADD, emptyCart } from '../../redux/actions/cartActions';
import { updateUser,getUserOrders,orderEntry,updateSkinCare,getSkinCare} from '../../utils/axios-instance';
import { setRole } from '../../redux/actions/roleAction';
import EmptyCart from './EmptyCart';
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.carts);
  const products = useSelector((state)=>state.product.prducts)
  console.log(cartItems)

  const [orders,setOrders] = useState([])
  const [productData,setProductData]  = useState([0])
  const user = useSelector((state) => state.role.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const { data } = await getUserOrders();
      setOrders(data);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const { data } = await getSkinCare();
      setProductData(data);
    })();
  }, []);
  

  const removeWhole = (id) => {
    dispatch(DELETE(id))
  }  
  const removeOne = (product) => {
    dispatch(REMOVE_ONE(product))
  }
  const add = (product) => {
    if (product.stock > 0) {
      dispatch(ADD(product))
    } else {
      toast.warn('Out Of Stock');
    }
  }
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + (item.price - item.discount) * item.quantity;
  }, 0);

  const isProductLiked = (product) => {
    if (user && user.favouriteProducts) {
      return user.favouriteProducts.some(
        (favProduct) => favProduct.id === product.id
      );
    }
    return false;
  };

  const handleLikesDislikes = async (product) => {
    if (user) {
      const isLiked = user.favouriteProducts.filter(
        (item) => item.id === product.id
      );

      if (isLiked.length === 0) {
        user.favouriteProducts.push(product);
        try {
          await updateUser(user);
          dispatch(setRole("user", user));
        } catch (error) {
          console.log(error);
        }
      } else {
        const updatedLikedProducts = user.favouriteProducts.filter(
          (item) => item.id != product.id
        );
        const updatedUser = {
          ...user,
          favouriteProducts: updatedLikedProducts,
        };
        await updateUser(updatedUser);
        dispatch(setRole("user", updatedUser));
      }
    }
  };
  const handleCheckout = async () => {



    let orderId =
      orders.length !== 0
        ? (parseInt(orders[orders.length - 1].id) + 1).toString()
        : "1";

           for (let i = 0; i < cartItems.length; i++) {
          const productIndex = productData.findIndex(product => product.id === cartItems[i].id);
         if (productIndex !== -1) {
            productData[productIndex].stock = cartItems[i].stock;
            await updateSkinCare(productData[productIndex]); 
         }
    }

    for (let i = 0; i < cartItems.length; i++) {
      const newObj = {
        id: orderId,
        user_id: user.id,
        product_id: cartItems[i].id,
        ordered_at: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`,
        expected_delivery: "", 
        status: "Pending",
        accepted_by_id: "",
        accepted_by_name : "",
        quantity: cartItems[i].quantity,
        payment_id: ""
      };
      await orderEntry(newObj);
      orderId = (parseInt(orderId) + 1).toString();
      dispatch(emptyCart())
      navigate('/')
    }
  };



  return cartItems.length > 0 ?(
    
    <div >
      <div className="grid gap-12 p-6">
        {cartItems.map((item) => (
          <div key={item.id} className="lg:col-span-2 bg-white divide-y">
            <div className="flex items-start max-sm:flex-col gap-8 py-6">
              <div className="h-52 shrink-0">
                <img src={item.thumbnail} className="w-full h-full object-contain rounded-md" alt={item.name} />
              </div>
              <div className="flex items-start gap-6 max-md:flex-col w-full">
                <div>
                  <h3 className="text-xl font-extrabold text-[#333] mb-6">{item.name}</h3>
                  <div>
                    <h6 className="text-md text-gray-500">Description: <span className="ml-2">{item.description}</span></h6>
                    <h6 className="text-md text-gray-500 mt-2">Brand: <span className="ml-2">{item.brand}</span></h6>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-6">
                    <button  onClick={()=>removeWhole(item.id)} >
                      <CiCircleRemove className='text-3xl'/>
                     
                    </button>
                    <button >
                    <FaHeart
              className={`text-2xl  ${
                isProductLiked(item) ? "text-red-500" : "text-neutral-300"
              }`}
              onClick={() => handleLikesDislikes(item)}
            />
                      
                    </button>
                  </div>
                </div>
                <div className="md:ml-auto md:text-right">
                  <div className="flex">
                    <button   className="bg-transparent py-2 font-semibold text-[#333]">
                     <IoIosRemove onClick={item.quantity<=1? ()=>removeWhole(item.id): ()=>removeOne(item)}/>
                    </button>
                    <button type="button" className="bg-transparent mx-4 px-4 py-2 font-semibold text-[#333] text-md border">
                      {item.quantity}
                    </button>
                    <button onClick={ ()=>add(item) } className={`bg-transparent py-2 font-semibold text-[#333]  ${item.stock <= 0 ? "opacity-30 cursor-not-allowed" : ""}`}>
                      <IoIosAdd/>
                    </button>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-lg font-bold text-[#333]"><strike className="text-gray-500 mr-2 font-medium">{item.quantity*item.price}</strike></h4>
                    <h4 className="text-lg font-bold text-[#333] mt-2">{item.quantity*(item.price-item.discount)}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="shadow-md p-6">
          <h3 className="text-xl font-extrabold text-[#333] border-b pb-4">Order Summary</h3>
          <ul className="text-[#333] divide-y mt-6">
            <li className="flex flex-wrap gap-4 text-md py-4">Subtotal <span className="ml-auto font-bold">${subtotal}</span></li>
            <li className="flex flex-wrap gap-4 text-md py-4">Shipping <span className="ml-auto font-bold">$4.00</span></li>
            <li className="flex flex-wrap gap-4 text-md py-4">Tax <span className="ml-auto font-bold">$4.00</span></li>
            <li className="flex flex-wrap gap-4 text-md py-4 font-bold">Total <span className="ml-auto">${subtotal+4+4}</span></li>
          </ul>
          <button onClick={handleCheckout} className="mt-6 text-md px-6 py-2.5 w-full bg-[#D88552]  text-white rounded">Check out</button>
          <div className="mt-10">
          
            
          </div>
        </div>
      </div>
    </div>
  ) : (<EmptyCart/>)
};

export default Cart;
