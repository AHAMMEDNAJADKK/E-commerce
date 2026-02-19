import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // 🔐 Protect dashboard
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.token) {
      navigate("/login");
      return;
    }

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);
  }, [navigate]);

  /* 📦 METRICS */
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, o) => sum + Number(o.amount || 0),
    0
  );

  const customers = [
    ...new Set(
      orders
        .filter((o) => o.userEmail)
        .map((o) => o.userEmail)
    ),
  ];

  /* 👤 TOP CUSTOMERS */
  const customerStats = {};
  orders.forEach((o) => {
    if (!o.userEmail) return;
    customerStats[o.userEmail] =
      (customerStats[o.userEmail] || 0) + 1;
  });

  const topCustomers = Object.entries(customerStats).sort(
    (a, b) => b[1] - a[1]
  );

  /* 📅 ORDERS PER DAY (SAFE DATE FIX) */
  const ordersByDate = {};
  orders.forEach((o) => {
    if (!o.createdAt) return;

    const dateObj = new Date(o.createdAt);
    if (isNaN(dateObj.getTime())) return;

    const date = dateObj.toISOString().slice(0, 10);

    ordersByDate[date] =
      (ordersByDate[date] || 0) + 1;
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <Card title="Total Orders" value={totalOrders} />
        <Card title="Total Revenue" value={`₹${totalRevenue}`} />
        <Card title="Customers" value={customers.length} />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* TOP CUSTOMERS */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-semibold mb-4">
            Top Customers
          </h2>

          {topCustomers.length === 0 && (
            <p className="text-gray-500">
              No customers yet
            </p>
          )}

          {topCustomers.map(([email, count]) => (
            <div
              key={email}
              className="flex justify-between border-b py-2"
            >
              <span>{email}</span>
              <span className="font-bold">
                {count} orders
              </span>
            </div>
          ))}
        </div>

        {/* ORDERS PER DAY */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-semibold mb-4">
            Orders per Day
          </h2>

          {Object.keys(ordersByDate).length === 0 && (
            <p className="text-gray-500">
              No order data available
            </p>
          )}

          {Object.entries(ordersByDate).map(
            ([date, count]) => (
              <div key={date} className="mb-2">
                <div className="flex justify-between text-sm">
                  <span>{date}</span>
                  <span>{count}</span>
                </div>
                <div className="bg-gray-200 h-2 rounded">
                  <div
                    className="bg-caviro h-2 rounded"
                    style={{
                      width: `${Math.min(count * 10, 100)}%`,
                    }}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded shadow p-6">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}
