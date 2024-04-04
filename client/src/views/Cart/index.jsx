import React from 'react'
import { useSelector } from 'react-redux'
const Cart = () => {
  const cartItems = useSelector((state)=>state.cart.carts)
  console.log(cartItems) //receiving all the cart items here
  return (
    <div>
        Cart page
    </div>
  )
}

export default Cart
