import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderPage = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await axios.get(`/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setOrder(data);
    };

    fetchOrder();
  }, [id, userInfo]);

  if (!order) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "40px" }}>
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Total:</strong> ₹{order.totalPrice}</p>
      <p>
        <strong>Status:</strong> {order.isPaid ? "Paid ✅" : "Not Paid ❌"}
      </p>
    </div>
  );
};

export default OrderPage;
