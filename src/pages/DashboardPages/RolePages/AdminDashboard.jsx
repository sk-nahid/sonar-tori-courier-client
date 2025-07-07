import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const AdminDashboard = () => {
  const axiosSecure = useAxios();

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["parcelStatusCounts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/admin/status");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading dashboard data...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map(({ status, count }) => (
          <div key={status} className="bg-indigo-100 p-4 rounded-lg shadow flex flex-col items-center">
            <p className="text-gray-700 font-semibold">{status}</p>
            <p className="text-4xl font-extrabold text-indigo-700">{count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
