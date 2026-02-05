import StatCard from "../components/admin/StatCard";
import SalesChart from "../components/admin/SalesChart";
import RecentOrders from "../components/admin/RecentOrders";

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* 🔢 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Orders" value="128" />
        <StatCard title="Revenue" value="₹2,45,600" />
        <StatCard title="Users" value="54" />
        <StatCard title="Today Sales" value="₹12,500" />
      </div>

      {/* 📊 CHART */}
      <div className="bg-white rounded-xl shadow p-4">
        <SalesChart />
      </div>

      {/* 📦 RECENT ORDERS */}
      <div className="bg-white rounded-xl shadow p-4">
        <RecentOrders />
      </div>
    </div>
  );
}
