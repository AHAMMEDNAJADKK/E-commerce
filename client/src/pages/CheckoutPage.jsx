import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { cartItems, shippingAddress } = useSelector((state) => state.cart);

  const placeOrderHandler = async () => {
    try {
      // 🔹 Prepare order data
      const orderData = {
        orderItems: cartItems,
        shippingAddress,
        totalPrice: cartItems.reduce(
          (acc, item) => acc + item.price * item.qty,
          0,
        ),
      };

      // ✅ STEP 1 — Create MongoDB Order
      const { data: order } = await axios.post("/api/orders", orderData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      // ✅ STEP 2 — Create Razorpay Order
      const { data: razorpayData } = await axios.post(
        "/api/payment/create-order",
        { orderId: order._id },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      // ✅ STEP 3 — Open Razorpay Checkout
      const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayData.amount,
        currency: razorpayData.currency,
        name: "Caviro Sneakers",
        description: "Order Payment",
        order_id: razorpayData.razorpayOrderId,

        handler: async function (response) {
          await axios.post(
            "/api/payment/verify",
            {
              ...response,
              orderId: razorpayData.orderId,
            },
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            },
          );

          localStorage.removeItem("cartItems");
          navigate(`/order/${razorpayData.orderId}`);
        },

        prefill: {
          name: userInfo.name,
          email: userInfo.email,
        },

        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Checkout</h2>

      <h3>Shipping Address</h3>
      <p>
        {shippingAddress.address}, {shippingAddress.city},{" "}
        {shippingAddress.postalCode}, {shippingAddress.country}
      </p>

      <h3>Order Items</h3>
      {cartItems.map((item) => (
        <div key={item._id}>
          {item.name} x {item.qty} = ₹{item.price * item.qty}
        </div>
      ))}

      <h3>
        Total: ₹
        {cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)}
      </h3>

      <button
        onClick={placeOrderHandler}
        style={{
          padding: "10px 20px",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default CheckoutPage;
