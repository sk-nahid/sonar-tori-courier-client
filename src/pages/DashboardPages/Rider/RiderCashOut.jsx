import { useQuery, useMutation } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import Swal from "sweetalert2";

const RiderCashOut = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [selectedParcelIds, setSelectedParcelIds] = useState([]);

  // Fetch successful deliveries eligible for cashout
  const { data: deliveries = [], isLoading, refetch } = useQuery({
    queryKey: ["successfulDeliveries", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider-deliveries-success?riderEmail=${user.email}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (deliveryId) => {
      const res = await axiosSecure.patch(`/request-cashout/${deliveryId}`);
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        title: "CashOut!",
        text: "Your file has been deleted.",
        icon: "success"
      });;
      refetch();
    },
    onError: () => {
      toast.error("Failed to request cash-out");
    },
  });

  const handleCashOutRequest = (deliveryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Cash Out!"
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(deliveryId);
      }
    });

  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">💸 Rider Successful Deliveries & Cash-Out</h2>

      {isLoading ? (
        <p>Loading deliveries...</p>
      ) : deliveries.length === 0 ? (
        <p>No successful deliveries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Tracking ID</th>
                <th>Date</th>
                <th>Earning</th>
                <th>Cash-out Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery, index) => (
                <tr key={delivery._id}>
                  <td>{index + 1}</td>
                  <td>{delivery.trackingId}</td>
                  <td>{new Date(delivery.paidAt).toLocaleDateString()}</td>
                  <td className="text-green-600">৳{delivery?.amount}</td>
                  <td className="capitalize">{delivery.cashOutStatus}</td>
                  <td>
                    {delivery.cashOutStatus === "pending" || delivery.cashOutStatus === "paid" ? (
                      <span className="text-gray-400">Already requested</span>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleCashOutRequest(delivery._id)}
                      >
                        Request Cash-Out
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default RiderCashOut;
