import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OrderPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setOrder(data);
      } catch (error) {
        console.error("ORDER FETCH ERROR:", error.response?.data || error.message);
      }
    };

    if (user) fetchOrder();
  }, [id, user]);

  if (!order) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "40px" }}>
      <h2>Order Details</h2>
      <p>Order ID: {order._id}</p>
      <p>Total: ₹{order.totalPrice}</p>
      <p>Status: {order.isPaid ? "Paid ✅" : "Not Paid ❌"}</p>
    </div>
  );
}