import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import AssignRiderModal from "./AssignRiderModal";
import useAuth from "../../../hooks/useAuth";

const AssignRider = () => {
  const axiosSecure = useAxios();
  const {user}= useAuth()
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedParcel, setSelectedParcel] = useState(null);

  // 1. Fetch parcels: paid + pending
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["paidPendingParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels?paymentStatus=paid&status=pending");
      return res.data;
    },
  });

  // 2. Fetch riders based on selected district
  const {
    data: riders = [],
    isLoading: riderLoading,
    refetch: refetchRiders,
  } = useQuery({
    queryKey: ["riders", selectedDistrict],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders?district=${selectedDistrict}`);
      return res.data;
    },
    enabled: !!selectedDistrict, // only run when a district is selected
  });

  // 3. Handler for Assign Rider button
  const handleAssignRider = (parcel) => {
    setSelectedParcel(parcel);
    setSelectedDistrict(parcel.senderDistrict);
      refetchRiders(); // manually refetch if needed immediately
      console.log('clicked')
  };

  if (isLoading) return <p>Loading parcels...</p>;

  if (parcels.length === 0)
    return <p className="text-center text-gray-500">No pending parcels with paid status.</p>;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">🚚 Assign Riders to Pending Parcels</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Sender District</th>
              <th>Receiver District</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Assign</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.trackingId}</td>
                <td>{parcel.senderName}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.receiverDistrict}</td>
                <td className="text-green-600">{parcel.paymentStatus}</td>
                <td className="text-orange-500">{parcel.status}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleAssignRider(parcel)}
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedParcel && (
        <AssignRiderModal
          parcel={selectedParcel}
          onClose={() => setSelectedParcel(null)}
        />
      )}
    </div>
  );
};

export default AssignRider;
