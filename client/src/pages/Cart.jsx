import { useCart } from "../context/CartContext";
import loadRazorpay from "../utils/razorpay";


export default function Cart() {
  const { cartItems, removeFromCart, updateQty } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    await loadRazorpay();

    const options = {
      key: "rzp_test_123456",
      amount: total * 100,
      currency: "INR",
      name: "Wear Caviro",
      description: "Sneaker Order",
      handler: function () {
        const orders =
          JSON.parse(localStorage.getItem("orders")) || [];

        orders.push({
          items: cartItems,
          amount: total,
          status: "Paid",
          date: new Date().toLocaleString(),
        });

        localStorage.setItem("orders", JSON.stringify(orders));
        alert("Payment successful!");
      },
      theme: {
        color: "#111827",
      },
    };

    new window.Razorpay(options).open();
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
              key={item.id}
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
                    updateQty(item.id, Number(e.target.value))
                  }
                  className="w-16 border p-1"
                />

                <button
                  onClick={() => removeFromCart(item.id)}
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
