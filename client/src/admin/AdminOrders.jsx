import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const { data } = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/orders",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setOrders(data);
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ✅ WHATSAPP FUNCTION FIXED */
  const sendWhatsAppMessage = (order) => {
    console.log("PHONE:", order.user?.phone);
    if (!order.user?.phone) {
      toast.error("User phone number not available");
      return;
    }

    // Remove + if exists
    let phone = order.user.phone.replace("+", "");

    const message = `
Hello ${order.user.name},

🎉 Your order has been successfully delivered!

🧾 Order ID: ${order._id}
💰 Total: ₹${order.totalPrice}

Thank you for shopping with us ❤️
`;

    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  };

  /* 🔥 STATUS UPDATE FUNCTION */
  const updateStatus = async (order, type) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (type === "pending") return;

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/${order._id}/${type}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      toast.success("Order updated successfully");

      if (type === "deliver") {
        sendWhatsAppMessage(order);
      }

      fetchOrders();
    } catch (error) {
      toast.error("Failed to update order");
    }
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

                <td className="p-4 font-bold">₹{order.totalPrice}</td>

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
                      updateStatus(order, e.target.value)
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