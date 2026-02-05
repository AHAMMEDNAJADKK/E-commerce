import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", orders: 10 },
  { day: "Tue", orders: 18 },
  { day: "Wed", orders: 12 },
  { day: "Thu", orders: 25 },
  { day: "Fri", orders: 20 },
  { day: "Sat", orders: 30 },
  { day: "Sun", orders: 22 },
];

export default function SalesChart() {
  return (
    <>
      <h2 className="font-semibold mb-3">Orders This Week</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#14532d"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
