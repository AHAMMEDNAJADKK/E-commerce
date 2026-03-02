import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const { data } = await axios.get(
      "http://localhost:5000/api/orders",
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* 🔥 STATUS UPDATE FUNCTION */
  const updateStatus = async (id, type) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (type === "pending") return;

    await axios.put(
      `http://localhost:5000/api/orders/${id}/${type}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    fetchOrders();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{order.user?.email}</td>

                <td className="p-4 font-bold">
                  ₹{order.totalPrice}
                </td>

                <td className="p-4">
                  <select
                    value={
                      order.isDelivered
                        ? "deliver"
                        : order.isPaid
                        ? "pay"
                        : "pending"
                    }
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="border px-3 py-1 rounded-lg"
                  >
                    <option value="pending">Pending</option>
                    <option value="pay">Mark as Paid</option>
                    <option value="deliver">
                      Mark as Delivered
                    </option>
                  </select>
                </td>

                <td className="p-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}