import { useEffect, useState } from 'react';
import { getUserOrders, updateOrderFromAdmin,getUsers } from '../../../utils/axios-instance';
import { useSelector } from 'react-redux';
import CommonTable from '../../../components/common/CommonTable';
import ConfirmDispatchModal from '../../../components/common/ConfirmDispatchModal'; 
const Admin_Orders = () => {
  const [orders, setOrders] = useState([]);
  const [users,setUsers] = useState([0])
  const products = useSelector((state) => state.product.products);
  const [showModal, setShowModal] = useState(false); 
  const [orderIdToDispatch, setOrderIdToDispatch] = useState(null); 

  const fetchData = async () => {
    const ordersData = await getUserOrders();
    setOrders(ordersData.data)
    const usersData = await getUsers();
    setUsers(usersData.data)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ordersArray = [
    { key: 'id', label: 'Order ID' },
    { key: 'product_id', label: 'Product Id' },
    {key:'user_id',label:'User_Id'},
    { key: 'user_name', label: 'User Name' },
    { key: 'user_country', label: 'User Country' },
    { key: 'user_address', label: 'User Address' },
    { key: 'user_phone', label: 'User Phone' },
    { key: 'product_name', label: 'Product Name' }, 
    { key: 'quantity', label: 'Quantity' },
    { key: 'ordered_at', label: 'Ordered Date' },
    { key: 'dispatched', label: 'Dispatched',disableSorting: true },
    { key: 'status', label: 'Status',disableSorting: true },
    { key: 'dispatched_button', label: 'Dispatched',disableSorting: true },
    { key: 'accept', label: 'Accept',disableSorting: true },
    { key: 'reject', label: 'Reject',disableSorting:true },
  ];
  const getProductName = (productId) => {
    const product = products.find((product) => product.id === productId);
    return product ? product.name : "Product Not Found";
  };
  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "User Not Found";
  };
  const getUserCountry = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.country : "Country Not Found";
  };
  
  const getUserAddress = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.address : "Address Not Found";
  };
  
  const getUserPhone = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.phone : "Phone Not Found";
  };

  const ordersWithUserAndProductName = orders.map((order) => ({
    ...order,
    product_name: getProductName(order.product_id),
    user_name: getUserName(order.user_id), 
    user_country: getUserCountry(order.user_id),
    user_address: getUserAddress(order.user_id),
    user_phone: getUserPhone(order.user_id),
  }));

  const handleAccept = async (orderId) => {
    try {
      const updatedOrders = orders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: 'Accepted' };
        }
        return order;
      });
      setOrders(updatedOrders);
      await updateOrderFromAdmin(orderId, { status: 'Accepted', accepted_by_id: "admin", accepted_by_name: "admin" });
    } catch (error) {
      console.log('Error Accepting Order', error);
    }
  };

  const handleReject = async (orderId) => {
    try {
      const updatedOrders = orders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: 'Rejected' };
        }
        return order;
      });
      setOrders(updatedOrders);
      await updateOrderFromAdmin(orderId, { status: 'Rejected', accepted_by_id: "admin", accepted_by_name: "admin" });
    } catch (error) {
      console.log('Error Rejecting Order', error);
    }
  };

  const handleDispatch = async (orderId) => {
    try {
      const updatedOrders = orders.map((order) => {
        if (order.id === orderId) {
          return { ...order, dispatched: 'Dispatched' };
        }
        return order;
      });
      setOrders(updatedOrders);
      await updateOrderFromAdmin(orderId, { dispatched: 'Dispatched', accepted_by_id: "admin", accepted_by_name: "admin" });
    } catch (error) {
      console.log('Error Dispatching Order', error);
    }
  };

  const handleDispatchClick = (orderId) => {
    setOrderIdToDispatch(orderId);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-4 text-2xl mt-2">All Orders</h3>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-2xl mt-20">You have no orders currently</div>
      ) : (
        <>
          <div className="w-full flex justify-between items-center mb-4 px-4 md:px-0">
            <div className="flex justify-end w-full mr-12">
            </div>
          </div>
          <CommonTable data={ordersWithUserAndProductName} headers={ordersArray} handleAccept={handleAccept} handleReject={handleReject} handleDispatch={handleDispatchClick} />
          <ConfirmDispatchModal open={showModal} handleClose={() => setShowModal(false)} handleDispatch={handleDispatch} orderId={orderIdToDispatch} />
        </>
      )}
    </div>
  );
};

export default Admin_Orders;
