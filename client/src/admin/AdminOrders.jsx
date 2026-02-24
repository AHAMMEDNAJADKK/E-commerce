import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AdminOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get("/api/orders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(data);
    };

    if (user?.isAdmin) fetchOrders();
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      {orders.map((o) => (
        <div key={o._id} className="border p-4 mb-3">
          <p>User: {o.user.name}</p>
          <p>Total: ₹{o.totalPrice}</p>
          <p>Status: {o.isPaid ? "Paid" : "Not Paid"}</p>
        </div>
      ))}
    </div>
  );
}

