import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQty } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="px-6 md:px-16 py-10">
      <h1 className="text-3xl font-bold text-caviro mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.brand}</p>
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
            <button className="mt-4 bg-caviro text-white px-6 py-2 rounded">
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
}
