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
  CartesianGrid,
} from "recharts";

const RiderDashboard = () => {
    const axiosSecure = useAxios();
    const { user } = useAuth();

    const { data: earnings = {}, isLoading } = useQuery({
        queryKey: ["riderEarningsSummary", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider-dashboard?email=${user.email}`);
            return res.data;
        },
    });

    const chartData = useMemo(
        () => [
            { label: "Today", amount: earnings.today || 0 },
            { label: "Week", amount: earnings.week || 0 },
            { label: "Month", amount: earnings.month || 0 },
            { label: "Year", amount: earnings.year || 0 },
        ],
        [earnings]
    );

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-bold">💰 Rider Earnings Summary</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 shadow">
                    <p className="text-gray-500 text-sm">Total Income</p>
                    <p className="text-xl font-bold text-green-600">৳ {earnings.total || 0}</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow">
                    <p className="text-gray-500 text-sm">Withdrawn</p>
                    <p className="text-xl font-bold text-blue-600">৳ {earnings.withdrawn || 0}</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow">
                    <p className="text-gray-500 text-sm">Pending</p>
                    <p className="text-xl font-bold text-yellow-600">৳ {earnings.pending || 0}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow p-4">
                <h3 className="text-lg font-semibold mb-2">📊 Earnings Chart</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#4ade80" radius={[5, 5, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow p-4">
                <h3 className="text-lg font-semibold mb-4">📦 Delivery Status Breakdown</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {earnings.statusBreakdown?.map((item) => (
                        <div key={item._id} className="border rounded-lg p-4 bg-gray-50">
                            <p className="text-sm text-gray-600">{item._id}</p>
                            <p className="text-xl font-bold">{item.count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default RiderDashboard;
