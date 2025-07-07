import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RiderEarningsPage = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const { data: cashouts = [], isLoading } = useQuery({
    queryKey: ["riderCashouts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider-cashouts?email=${user.email}`);
      return res.data;
    },
  });

  const stats = useMemo(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    let total = 0, withdrawn = 0, pending = 0;
    let today = 0, week = 0, month = 0, year = 0;

    for (const entry of cashouts) {
      const createdAt = new Date(entry.createdAt);
      total += entry.amount;
      if (entry.cashOutStatus === "paid") withdrawn += entry.amount;
      else pending += entry.amount;

      if (createdAt >= todayStart) today += entry.amount;
      if (createdAt >= weekStart) week += entry.amount;
      if (createdAt >= monthStart) month += entry.amount;
      if (createdAt >= yearStart) year += entry.amount;
    }

    return { total, withdrawn, pending, today, week, month, year };
  }, [cashouts]);

  const chartData = [
    { name: "Today", amount: stats.today },
    { name: "Week", amount: stats.week },
    { name: "Month", amount: stats.month },
    { name: "Year", amount: stats.year },
  ];

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">💰 Rider Earnings Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-gray-500 text-sm">Total Income</p>
          <p className="text-xl font-bold text-green-600">৳ {stats.total}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-gray-500 text-sm">Withdrawn</p>
          <p className="text-xl font-bold text-blue-600">৳ {stats.withdrawn}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-gray-500 text-sm">Pending</p>
          <p className="text-xl font-bold text-yellow-600">৳ {stats.pending}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-100 rounded-lg p-3">
          <p className="text-sm text-gray-600">Today</p>
          <p className="text-lg font-semibold">৳ {stats.today}</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-3">
          <p className="text-sm text-gray-600">This Week</p>
          <p className="text-lg font-semibold">৳ {stats.week}</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-3">
          <p className="text-sm text-gray-600">This Month</p>
          <p className="text-lg font-semibold">৳ {stats.month}</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-3">
          <p className="text-sm text-gray-600">This Year</p>
          <p className="text-lg font-semibold">৳ {stats.year}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-2">📊 Income Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#4ade80" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RiderEarningsPage;
