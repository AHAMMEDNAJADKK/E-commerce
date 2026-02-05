export default function AdminOrders() {
  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    return <p>No orders yet</p>;
  }

  return (
    <div className="bg-white shadow rounded p-5">
      <h2 className="text-xl font-semibold mb-4">
        Orders
      </h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={i}>
              <td className="p-2 border">
                {i + 1}
              </td>
              <td className="p-2 border">
                ₹{o.amount}
              </td>
              <td className="p-2 border">
                {o.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
