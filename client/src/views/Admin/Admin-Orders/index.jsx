import { useEffect, useState } from 'react';
import {  getUserOrders, updateOrderFromAdmin } from '../../../utils/axios-instance';
import CommonTable from '../../../components/common/CommonTable';

const Admin_Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    const ordersData = await getUserOrders();
    setOrders(ordersData.data)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ordersArray = [
    { key: 'id', label: 'Order ID' },
    { key: 'product_id', label: 'Product Id' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'ordered_at', label: 'Ordered Date' },
    { key: 'dispatched', label: 'Dispatched',disableSorting: true },
    { key: 'status', label: 'Status',disableSorting: true },
    { key: 'dispatched_button', label: 'Dispatched',disableSorting: true },
    { key: 'accept', label: 'Accept',disableSorting: true },
    { key: 'reject', label: 'Reject',disableSorting:true },
  ];
  
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
          <CommonTable data={orders} headers={ordersArray} handleAccept={handleAccept} handleReject={handleReject} handleDispatch={handleDispatch} />
        </>
      )}
    </div>
  );
};

export default Admin_Orders;
