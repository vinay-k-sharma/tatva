import { useEffect, useState } from "react"
import CommonTable from "../../components/common/CommonTable"
import { getUserOrders } from "../../utils/axios-instance"
import {useSelector,useDispatch} from 'react-redux'
const UserOrders = () => {
  const [orders,setOrders] = useState([])
  console.log(orders)
  useEffect(()=>{orders.sort((a,b)=> b.ordered_at - a.ordered_at)},[])
  const {user} = useSelector((state)=> state.role)
  const name = user.name.toUpperCase()
  const fetchData = async () => {
    try{
    const allOrders = await getUserOrders()
    const userOrders = allOrders.data.filter(order => order.user_id===user.id) 
    setOrders(userOrders)
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchData()
  },[])
  const userOrdersColumn = [
    { key: 'id', label: 'Order ID' },
    { key: 'product_id', label: 'Product Id' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'ordered_at', label: 'Ordered Date' },
    { key: 'dispatched', label: 'Dispatched' },
    { key: 'status', label: 'Status' },
  ];
  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-4 text-2xl mt-2">{name}'s Orders</h3>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-2xl mt-20">You have no orders currently</div>
      ) : (
        <>
          <div className="w-full flex justify-between items-center mb-4 px-4 md:px-0">
            <div className="flex justify-end w-full mr-12">
            </div>
          </div>
          <CommonTable data={orders} headers={userOrdersColumn} />
        </>
      )}
    </div>
  );
}

export default UserOrders
