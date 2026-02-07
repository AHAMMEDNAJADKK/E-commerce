import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  /* 📦 METRICS */
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, o) => sum + Number(o.amount || 0),
    0
  );

  const customers = [
    ...new Set(orders.map((o) => o.userEmail)),
  ];

  /* 👤 TOP CUSTOMERS */
  const customerStats = {};
  orders.forEach((o) => {
    customerStats[o.userEmail] =
      (customerStats[o.userEmail] || 0) + 1;
  });

  const topCustomers = Object.entries(customerStats).sort(
    (a, b) => b[1] - a[1]
  );

  /* 📅 ORDERS PER DAY */
  const ordersByDate = {};
  orders.forEach((o) => {
    const date = new Date(o.createdAt)
      .toISOString()
      .slice(0, 10);
    ordersByDate[date] =
      (ordersByDate[date] || 0) + 1;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* 🔢 KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card title="Total Orders" value={totalOrders} />
        <Card
          title="Total Revenue"
          value={`₹${totalRevenue}`}
        />
        <Card
          title="Customers"
          value={customers.length}
        />
      </div>

      {/* 📊 ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 👤 TOP CUSTOMERS */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-semibold mb-4">
            Top Customers
          </h2>

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

        {/* 📅 ORDERS PER DAY */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-semibold mb-4">
            Orders per Day
          </h2>

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
                      width: `${count * 10}%`,
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

/* 🧩 CARD COMPONENT */
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

