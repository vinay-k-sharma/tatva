import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSkinCare, getUserOrders, updateOrderFromSeller } from '../../utils/axios-instance';
import CommonTable from '../../components/common/CommonTable';

const SellerOrders = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const { seller } = useSelector((state) => state.role);
  console.log(seller)
  
  const name = seller.name.toUpperCase();

  const fetchData = async () => {
    const productData = await getSkinCare();
    setProducts(productData.data);
    
    const ordersData = await getUserOrders();
    const filteredOrders = ordersData.data.filter(order => seller.productsToSell.includes(order.product_id));
    setOrders(filteredOrders); 
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ordersArray = [
    { key: 'id', label: 'Order ID' },
    { key: 'product_id', label: 'Product Id' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'ordered_at', label: 'Ordered Date' },
    { key: 'dispatched', label: 'Dispatched' },
    { key: 'status', label: 'Status' },
    { key: 'dispatched_button', label: 'Dispatched' },
    { key: 'accept', label: 'Accept' },
    { key: 'reject', label: 'Reject' },
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
      await updateOrderFromSeller(orderId, { status: 'Accepted', accepted_by: seller.id, accepted_by_name: seller.name });
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
      await updateOrderFromSeller(orderId, { status: 'Rejected', accepted_by_id: seller.id, accepted_by_name: seller.name });
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
      await updateOrderFromSeller(orderId, { dispatched: 'Dispatched', accepted_by_id: seller.id, accepted_by_name: seller.name });
    } catch (error) {
      console.log('Error Dispatching Order', error);
    }
  };

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
          <CommonTable data={orders} headers={ordersArray} handleAccept={handleAccept} handleReject={handleReject} handleDispatch={handleDispatch} />
        </>
      )}
    </div>
  );
};

export default SellerOrders;
