import React, { useEffect, useState } from "react";
import CommonTable from "../../components/common/CommonTable";
import { getUserOrders } from "../../utils/axios-instance";
import { useSelector } from "react-redux";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const products = useSelector((state) => state.product.products);
  const { user } = useSelector((state) => state.role);
  const name = user.name.toUpperCase();

  const fetchData = async () => {
    try {
      const allOrders = await getUserOrders();
      const userOrders = allOrders.data.filter(
        (order) => order.user_id === user.id
      );
      setOrders(userOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const userOrdersColumn = [
    { key: "id", label: "Order ID" },
    { key: "product_id", label: "Product Name" },
    { key: "quantity", label: "Quantity" },
    { key: "ordered_at", label: "Ordered Date" },
    { key: "dispatched", label: "Dispatched" },
    { key: "status", label: "Status" },
  ];

  const getProductName = (productId) => {
    const product = products.find((product) => product.id === productId);
    return product ? product.name : "Product Not Found";
  };

  const ordersWithProductName = orders.map((order) => ({
    ...order,
    product_id: getProductName(order.product_id),
  }));

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-4 text-2xl mt-2">{name}'s Orders</h3>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-2xl mt-20">
          You have no orders currently
        </div>
      ) : (
        <>
          <div className="w-full flex justify-between items-center mb-4 px-4 md:px-0">
            <div className="flex justify-end w-full mr-12"></div>
          </div>
          <CommonTable data={ordersWithProductName} headers={userOrdersColumn} />
        </>
      )}
    </div>
  );
};

export default UserOrders;
