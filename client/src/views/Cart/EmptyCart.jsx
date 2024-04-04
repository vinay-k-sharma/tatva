import {useNavigate} from 'react-router-dom'
const EmptyCart = () => {
    const navigate = useNavigate()
    const continueShopping = () => {
        navigate('/')
    }
  return (
    <div className='justify-center content-center flex-row space-between'>
      Your Cart is empty !! 
      <button className='bg-[#D88552]' onClick={continueShopping}>Continue Shopping</button>
    </div>
  )
}

export default EmptyCart
