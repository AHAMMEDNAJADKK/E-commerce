import { useEffect, useState } from "react";
import axios from "axios";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data } = await axios.get(
      "https://caviro-backend.onrender.com/api/orders/myorders",
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    setOrders(data);
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="bg-white shadow p-6 mb-6 rounded">

          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Total:</strong> ₹{order.totalPrice}</p>

          <p>
            <strong>Payment:</strong>
            <span className={`ml-2 px-2 py-1 rounded text-white ${order.isPaid ? "bg-green-600" : "bg-red-600"}`}>
              {order.isPaid ? "Paid" : "Not Paid"}
            </span>
          </p>

          <p>
            <strong>Delivery:</strong>
            <span className={`ml-2 px-2 py-1 rounded text-white ${order.isDelivered ? "bg-green-600" : "bg-yellow-600"}`}>
              {order.isDelivered ? "Delivered" : "Pending"}
            </span>
          </p>

        </div>
      ))}
    </div>
  );
}
