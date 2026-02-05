const orders = [
  {
    id: "ORD123",
    user: "Ahammed",
    amount: 5999,
    status: "Paid",
  },
  {
    id: "ORD124",
    user: "Rahul",
    amount: 8999,
    status: "Pending",
  },
  {
    id: "ORD125",
    user: "Nithin",
    amount: 12999,
    status: "Paid",
  },
];

export default function RecentOrders() {
  return (
    <>
      <h2 className="font-semibold mb-3">Recent Orders</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Order ID</th>
            <th className="text-left p-2">User</th>
            <th className="text-left p-2">Amount</th>
            <th className="text-left p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="p-2">{order.id}</td>
              <td className="p-2">{order.user}</td>
              <td className="p-2">₹{order.amount}</td>
              <td
                className={`p-2 font-medium ${
                  order.status === "Paid"
                    ? "text-green-600"
                    : "text-orange-500"
                }`}
              >
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
