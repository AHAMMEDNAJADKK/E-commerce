export default function Orders() {
  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="px-6 md:px-20 py-12">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {orders.map((order, i) => (
            <div key={i} className="bg-white p-5 rounded shadow">
              <h3 className="font-semibold mb-2">
                Order #{i + 1}
              </h3>
              <p>Total: ₹{order.amount}</p>
              <p>Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
