import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState(30);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo || userInfo.role !== "admin") {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return <div className="p-10 text-center">Loading Dashboard...</div>;
  }

  const now = new Date();

  const filteredOrders = orders.filter((o) => {
    const orderDate = new Date(o.createdAt);
    const diff = (now - orderDate) / (1000 * 60 * 60 * 24);
    return diff <= range;
  });

  /* ================= METRICS ================= */

  const totalOrders = filteredOrders.length;

  const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.totalPrice, 0);

  const today = new Date().toISOString().slice(0, 10);

  const todayOrders = filteredOrders.filter(
    (o) => o.createdAt?.slice(0, 10) === today,
  );

  /* ================= BAR CHART ================= */

  const ordersByDate = {};
  filteredOrders.forEach((o) => {
    const date = o.createdAt.slice(0, 10);
    ordersByDate[date] = (ordersByDate[date] || 0) + 1;
  });

  const chartData = Object.keys(ordersByDate).map((date) => ({
    date,
    orders: ordersByDate[date],
  }));

  /* ================= TOP CUSTOMERS ================= */

  const customerMap = {};
  filteredOrders.forEach((o) => {
    const email = o.user?.email;
    if (!email) return;
    customerMap[email] = (customerMap[email] || 0) + 1;
  });

  const topCustomers = Object.entries(customerMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  /* ================= TOP PRODUCTS (DONUT) ================= */

  const productMap = {};

  filteredOrders.forEach((order) => {
    order.orderItems?.forEach((item) => {
      const name = item.name;
      const qty = item.qty;

      if (!name) return;

      productMap[name] = (productMap[name] || 0) + qty;
    });
  });

  const topProducts = Object.entries(productMap)
    .map(([name, quantity]) => ({
      name,
      quantity,
    }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      {/* FILTER */}
      <div className="flex gap-4 mb-8">
        {[1, 7, 30].map((day) => (
          <button
            key={day}
            onClick={() => setRange(day)}
            className={`px-4 py-2 rounded-lg font-medium ${
              range === day
                ? "bg-black text-white"
                : "bg-white shadow hover:bg-gray-200"
            }`}
          >
            Last {day} Day{day > 1 && "s"}
          </button>
        ))}
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card title="Total Orders" value={totalOrders} />
        <Card title="Today's Orders" value={todayOrders.length} />
        <Card title="Revenue" value={`₹${totalRevenue}`} />
        <Card title="Customers" value={Object.keys(customerMap).length} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6 overflow-hidden">
          <h2 className="text-xl font-semibold mb-6">Orders Overview</h2>

          <div className="w-full h-[350px]">
            <ResponsiveContainer>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="date"
                  interval="preserveStartEnd"
                  minTickGap={20}
                  tick={{ fontSize: 11 }}
                />

                <YAxis tick={{ fontSize: 11 }} />

                <Tooltip />

                <Bar dataKey="orders" fill="#111827" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Top Customers</h2>

          {topCustomers.length === 0 ? (
            <p>No customers yet</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th>Email</th>
                  <th>Orders</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map(([email, count]) => (
                  <tr key={email} className="border-b hover:bg-gray-50">
                    <td className="py-3">{email}</td>
                    <td className="py-3 font-bold">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6 overflow-hidden">
          <h2 className="text-xl font-semibold mb-6">Top Ordered Products</h2>

          {topProducts.length === 0 ? (
            <p>No product data</p>
          ) : (
            <div className="w-full h-[350px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={topProducts}
                    dataKey="quantity"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                  >
                    {topProducts.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  <Tooltip />

                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
