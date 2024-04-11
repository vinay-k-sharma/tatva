import {useNavigate} from 'react-router-dom'

const EmptyCart = () => {
    const navigate = useNavigate()
    const continueShopping = () => {
        navigate('/')
    }
  return (
    <div className='flex flex-col items-center justify-center h-screen space-y-4'>
      <h2 className='text-2xl text-gray-700'>Your Cart is empty !!</h2>
      <button className='px-4 py-2 text-white bg-[#D88552] rounded hover:bg-orange-500' onClick={continueShopping}>Continue Shopping</button>
    </div>
  )
}

export default EmptyCart