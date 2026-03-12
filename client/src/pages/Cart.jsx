import { useCart } from "../context/CartContext";
import loadRazorpay from "../utils/razorpay";
import { useToast } from "../context/ToastContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, updateQty,clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      showToast("Cart is empty");
      return;
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo || !userInfo.token) {
      showToast("Please login first 🔐");
      navigate("/login");
      return;
    }

    await loadRazorpay();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: total * 100,
      currency: "INR",
      name: "Wear Caviro",
      description: "Sneaker Order",

      handler: async function (response) {
        try {
          // ✅ FIXED ORDER DATA FORMAT
          const orderData = {
            orderItems: cartItems.map((item) => ({
              name: item.name,
              qty: item.qty,
              image: item.image || "",
              price: item.price,
              product: item._id, // 🔥 REQUIRED FIELD
            })),
            shippingAddress: {
              address: "Online Payment",
              city: "N/A",
              postalCode: "000000",
              country: "India",
            },
            paymentMethod: "Razorpay",
            totalPrice: total,
            paymentResult: {
              id: response.razorpay_payment_id,
              status: "completed",
              update_time: new Date().toISOString(),
              email_address: userInfo.email,
            },
          };

          await axios.post(
            "${import.meta.env.VITE_API_URL}/api/orders", // ✅ Ensure backend port
            orderData,
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json",
              },
            }
          );

          showToast("Payment successful 🎉 Order saved!");

          clearCart();
          navigate("/myorders");

        } catch (error) {
          console.error(
            "ORDER SAVE ERROR:",
            error.response?.data || error.message
          );
          showToast("Order saving failed ❌");
        }
      },

      theme: {
        color: "#111827",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="px-6 md:px-16 py-10">
      <h1 className="text-3xl font-bold text-caviro mb-8">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.brand}
                </p>
                <p className="font-bold">₹{item.price}</p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) =>
                    updateQty(item._id, Number(e.target.value))
                  }
                  className="w-16 border p-1"
                />

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <h2 className="text-xl font-bold">
              Total: ₹{total}
            </h2>

            <button
              onClick={handleCheckout}
              className="mt-4 bg-caviro text-white px-6 py-2 rounded hover:opacity-90"
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
}