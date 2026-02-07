import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const updateStatus = (id, status) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status } : o
    );

    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  const deleteOrder = (id) => {
    if (!confirm("Delete this order?")) return;

    const updated = orders.filter(
      (o) => o.id !== id
    );
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Orders Management
      </h1>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <Th>#</Th>
              <Th>Customer</Th>
              <Th>Items</Th>
              <Th>Amount</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6"
                >
                  No orders found
                </td>
              </tr>
            )}

            {orders.map((o, i) => (
              <tr
                key={o.id}
                className="border-t text-center"
              >
                <Td>{i + 1}</Td>
                <Td>{o.userEmail}</Td>
                <Td>{o.items?.length || 0}</Td>
                <Td>₹{o.amount}</Td>
                <Td>
                  {new Date(o.createdAt).toLocaleDateString()}
                </Td>

                <Td>
                  <select
                    value={o.status}
                    onChange={(e) =>
                      updateStatus(
                        o.id,
                        e.target.value
                      )
                    }
                    className="border px-2 py-1 rounded"
                  >
                    <option>Paid</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </Td>

                <Td>
                  <button
                    onClick={() => deleteOrder(o.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 🧩 SMALL COMPONENTS */
const Th = ({ children }) => (
  <th className="px-4 py-3 text-left">
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="px-4 py-3">
    {children}
  </td>
);
