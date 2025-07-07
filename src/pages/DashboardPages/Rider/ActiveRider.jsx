import React from 'react';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const ActiveRider = () => {
    const axiosSecure = useAxios()

    const { data: riders = [], isError, refetch } = useQuery({
        queryKey: ["pending"],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders?status=approved')
            return res.data
        }
    })
    if (isError) {
        return console.log('error')
    }

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

export default ActiveRider;