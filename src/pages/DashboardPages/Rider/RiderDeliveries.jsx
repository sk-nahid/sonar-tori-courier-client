import { QueryClient, useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import ParcelViewCard from "../../../components/DashboardComponents/MyParcelComponents/ParcelViewCard";
import Loading from "../../../components/shareComponents/Loading";

const RiderDeliveries = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [parcelId, setParcelId] = useState(null)

  const { data: deliveries = [], isLoading, refetch } = useQuery({
    queryKey: ["riderDeliveries", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider-deliveries?riderEmail=${user.email}`);
      return res.data;
    },
  });
  const { data: parcel = {}, isLoading: parcelLoading, error } = useQuery({
    queryKey: ['parcelData'],
    enabled: !!parcelId,
    queryFn: async () => {
      const parcelRes = await axiosSecure.get(`/parcels/tracking/${parcelId}`)
      return parcelRes.data
    }
  })

  if (isLoading) return <p>Loading your deliveries...</p>;
  if (error) {
    console.log(error)
  }


  const handleUpdateInfo = async (e, delivery) => {
    const newStatus = e.target.value;
    console.log(delivery)
   const {riderEmail,riderId,trackingId,_id,riderCharge} = delivery

    if (!newStatus) return;

    // if (newStatus === "delivered" || newStatus === "sent to office") {
    //   const res = await axiosSecure.get()
    // }
    try {
      const res = await axiosSecure.patch(`/update-delivery-status/${delivery.trackingId}`, {
        status: newStatus,
        riderEmail,
        riderId,
        trackingId,
        deliveryId: _id,
        cashOutStatus:'none',
        createdAt: new Date().toISOString(),
        amount: riderCharge,
        
      });

      if (res.data.modifiedCount > 0) {
        toast.success("Status updated!");
        refetch()
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    }
  };
  const handleParcelDetails = (id) => {
    setParcelId(id)
    setSelectedParcel(parcel)
    document.getElementById("view-modal").checked = true;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">📦 Your Assigned Deliveries</h2>

      {deliveries.length === 0 ? (
        <p className="text-gray-500">No pending deliveries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Tracking ID</th>
                <th>Status</th>
                <th>Assigned At</th>
                <th>Details</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery, index) => (
                <tr key={delivery._id}>
                  <td>{index + 1}</td>
                  <td>{delivery.trackingId}</td>
                  <td>{delivery.status}</td>
                  <td>{new Date(delivery.assignData).toLocaleString()}</td>
                  <td><button className="btn btn-secondary" onClick={() => handleParcelDetails(delivery.trackingId)}>Details</button></td>

                  <td>
                    <select
                      className="btn btn-primary"
                      value={delivery.status}
                      onChange={(e) => handleUpdateInfo(e, delivery)}
                    >
                      <option disabled value={delivery.status}>
                        {delivery.status}
                      </option>

                      {/* 🚚 If within city – full delivery by one rider */}
                      {delivery.isWithinCity && (
                        <>
                          {delivery.status === "assign rider to collect" && (
                            <option value="pickedUp from sender">Picked Up Parcel</option>
                          )}
                          {delivery.status === "pickedUp from sender" && (
                            <option value="delivered">Delivered</option>
                          )}
                        </>
                      )}

                      {/* 🚚 If outside city & rider is pickup */}
                      {!delivery.isWithinCity && delivery.role === "pickup" && (
                        <>
                          {delivery.status === "assign rider to collect" && (
                            <option value="pickedUp from sender">Picked Up Parcel</option>
                          )}
                          {delivery.status === "pickedUp from sender" && (
                            <option value="sent to office">Sent to Office</option>
                          )}
                        </>
                      )}

                      {/* 🚚 If outside city & rider is delivery */}
                      {!delivery.isWithinCity && delivery.role === "delivery" && (
                        <>
                          {delivery.status === "assign rider to deliver" && (
                            <option value="collected from office">Collected from Office</option>
                          )}
                          {delivery.status === "collected from office" && (
                            <option value="delivered">Delivered</option>
                          )}
                        </>
                      )}

                      {/* ❌ Rejection Option */}
                      {/* {(delivery.status !== "delivered" && delivery.status !== "rejected") && (
                        <option value="rejected">Rejected</option>
                      )} */}
                    </select>
                  </td>

                  {/* 🚚 If assigned and outside city */}
                  {/* {delivery.status === "assign rider to collect" && delivery.isWithinCity === false ? (
                    <td>
                      <select
                        defaultValue={delivery.status}
                        onChange={(e) => handleUpdateInfo(e, delivery.trackingId)}
                        className="btn btn-primary"
                      >
                        <option disabled value={delivery.status}>
                          {delivery.status}
                        </option>
                        <option value="pickedUp from sender">Picked Up Parcel</option>
                        <option value="pending">Rejected</option>
                      </select>
                    </td>
                  ) : (
                    // 🏙️ Otherwise: allow pickup/collected + delivered
                    <td>
                      <select
                        onChange={(e) => handleUpdateInfo(e, delivery.trackingId)}
                        className="btn btn-primary"
                        defaultValue=""
                      >
                        <option defaultValue={delivery.status}>
                          {delivery.status}
                        </option>
                        {delivery?.isWithinCity ? (
                          <option value="pickedUp from sender">Pick Up Parcel</option>
                        ) : (
                          <option value="collected from office">Collected Parcel</option>
                        )}
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  )} */}
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      )}
      {/* DaisyUI Modal */}
      <input type="checkbox" id="view-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-4xl w-full relative">
          <label htmlFor="view-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          {selectedParcel && <ParcelViewCard parcel={selectedParcel} />}
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default RiderDeliveries;
