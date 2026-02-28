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
} from "recharts";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo || userInfo.role !== "admin") {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/orders",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

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

  // 📊 Metrics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (sum, o) => sum + o.totalPrice,
    0
  );

  const today = new Date().toISOString().slice(0, 10);

  const todayOrders = orders.filter(
    (o) => o.createdAt?.slice(0, 10) === today
  );

  // 📈 Orders Per Day
  const ordersByDate = {};
  orders.forEach((o) => {
    const date = o.createdAt?.slice(0, 10);
    if (!date) return;
    ordersByDate[date] =
      (ordersByDate[date] || 0) + 1;
  });

  const chartData = Object.keys(ordersByDate).map(
    (date) => ({
      date,
      orders: ordersByDate[date],
    })
  );

  // 👑 Top Customers
  const customerMap = {};
  orders.forEach((o) => {
    const email = o.user?.email;
    if (!email) return;
    customerMap[email] =
      (customerMap[email] || 0) + 1;
  });

  const topCustomers = Object.entries(customerMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <Card title="Total Orders" value={totalOrders} />
        <Card title="Today's Orders" value={todayOrders.length} />
        <Card title="Revenue" value={`₹${totalRevenue}`} />
        <Card title="Customers" value={Object.keys(customerMap).length} />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 📊 Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-6">
            Orders Overview
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#111827" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🏆 Top Customers */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-6">
            Top Customers
          </h2>

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
                  <tr
                    key={email}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3">{email}</td>
                    <td className="py-3 font-bold">
                      {count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}