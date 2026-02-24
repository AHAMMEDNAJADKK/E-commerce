import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder() {
  const navigate = useNavigate();

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const totalPrice = itemsPrice;

  const placeOrderHandler = async () => {
    if (!userInfo?.token) {
      toast.error("Login first 🔐");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        {
          orderItems: cartItems,
          shippingAddress: shipping,
          paymentMethod,
          itemsPrice,
          taxPrice: 0,
          shippingPrice: 0,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      toast.success("Order placed successfully 🎉");

      localStorage.removeItem("cartItems");
      navigate("/myorders");
    } catch (error) {
      console.error(error);
      toast.error("Order failed ❌");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">Place Order</h1>

      <div className="space-y-4">

        <input
          placeholder="Full Name"
          className="admin-input-simple"
          onChange={(e) =>
            setShipping({ ...shipping, fullName: e.target.value })
          }
        />

        <input
          placeholder="Address"
          className="admin-input-simple"
          onChange={(e) =>
            setShipping({ ...shipping, address: e.target.value })
          }
        />

        <input
          placeholder="City"
          className="admin-input-simple"
          onChange={(e) =>
            setShipping({ ...shipping, city: e.target.value })
          }
        />

        <input
          placeholder="Postal Code"
          className="admin-input-simple"
          onChange={(e) =>
            setShipping({ ...shipping, postalCode: e.target.value })
          }
        />

        <input
          placeholder="Country"
          className="admin-input-simple"
          onChange={(e) =>
            setShipping({ ...shipping, country: e.target.value })
          }
        />

        <select
          className="admin-input-simple"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option>Cash On Delivery</option>
          <option>UPI</option>
          <option>Card</option>
        </select>

        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold">Total: ₹{totalPrice}</h2>
        </div>

        <button
          onClick={placeOrderHandler}
          className="admin-submit-btn w-full"
        >
          Confirm Order
        </button>

      </div>
    </div>
  );
}
