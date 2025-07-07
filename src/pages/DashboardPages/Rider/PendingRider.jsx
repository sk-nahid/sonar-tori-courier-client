import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';


const PendingRider = () => {

  
  const axiosSecure = useAxios()
  
  const { data:riders=[], isError, refetch } = useQuery({
    queryKey: ["pending"],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders?status=pending')
      return res.data
    }
  })
  if (isError) {
    return console.log('error')
  }
    
const onApprove = async (rider) => {
  const result = await Swal.fire({
    title: `Approve ${rider.name}?`,
    html: `
      <div style="text-align: left">
        <p><strong>Email:</strong> ${rider.email}</p>
        <p><strong>Region:</strong> ${rider.region}</p>
        <p><strong>District:</strong> ${rider.district}</p>
      </div>
    `,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Approve',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#22c55e',
    cancelButtonColor: '#ef4444',
  });

  if (result.isConfirmed) {
    const updateReq = {
      status: "approved",
      email:rider.email
    }
    const res = await axiosSecure.patch(`/riders/${rider._id}`,updateReq);
    if (res.data.modifiedCount) {
      Swal.fire("Approved!", `${rider.name} is now a rider.`, "success");
      refetch();
    }
  }
};

const onReject = async (rider) => {
  const result = await Swal.fire({
    title: `Reject ${rider.name}?`,
    html: `
      <div style="text-align: left">
        <p><strong>Email:</strong> ${rider.email}</p>
        <p><strong>Region:</strong> ${rider.region}</p>
        <p><strong>District:</strong> ${rider.district}</p>
      </div>
    `,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Reject',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#9ca3af',
  });

  if (result.isConfirmed) {
    const updateReq = {
      status: "reject",
      email:rider.email
    }
    const res = await axiosSecure.patch(`/riders/${rider._id}`,updateReq);
    if (res.data.modifiedCount) {
      Swal.fire("Rejected!", `${rider.name} was removed.`, "success");
      refetch();
    }
  }
};
    
    return (
         <div className="overflow-x-auto shadow rounded-xl border border-base-300">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 text-base font-semibold">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Vehicle</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, idx) => (
            <tr key={rider._id}>
              <td>{idx + 1}</td>
              <td>{rider.name}</td>
              <td>{rider.email}</td>
              <td>{rider.phone}</td>
              <td>{rider.region}, {rider.district}</td>
              <td>{rider.vehicleType}</td>
              <td>
                <span className={`badge ${rider.status === "pending" ? "badge-warning" : "badge-success"}`}>
                  {rider.status}
                </span>
              </td>
              <td className="flex gap-2 flex-wrap">
                {rider.status === "pending" && (
                  <>
                    <button
                      onClick={() => onApprove(rider)}
                      className="btn btn-xs btn-success text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onReject(rider)}
                      className="btn btn-xs btn-error text-white"
                    >
                      Reject
                    </button>
                  </>
                )}
                {rider.status === "approved" && (
                  <span className="text-green-600 font-medium">Approved</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

export default PendingRider;