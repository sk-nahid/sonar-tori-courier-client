import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';
import ParcelViewCard from '../../components/DashboardComponents/MyParcelComponents/ParcelViewCard'; // Import your view card component
import { Link } from 'react-router';

const MyParcel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const [selectedParcel, setSelectedParcel] = useState(null); // 🌟 for modal view

    const { data: myParcel = [], refetch } = useQuery({
        queryKey: ['myParcel', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    });

    const onDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
                            refetch();
                        }
                    })
                    .catch(console.error);
            }
        });
    };

    const onView = (parcel) => setSelectedParcel(parcel);

    // const onPay = (parcel) => {
    //     // payment logic placeholder
    //     console.log("Pay clicked for:", parcel.trackingId);
    // };

    return (
        <div className="overflow-x-auto rounded-xl shadow border border-base-300">
            <table className="table table-zebra table-xs sm:table-sm md:table-md lg:table-lg">
                <thead className="bg-base-200 text-base">
                    <tr>
                        <th>#</th>
                        <th>Tracking ID</th>
                        <th>Parcel</th>
                        <th>Receiver</th>
                        <th>Cost (৳)</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {myParcel?.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <th>{index + 1}</th>
                            <td>{parcel.trackingId}</td>
                            <td>
                                {parcel.title} <br />
                                <span className="text-xs opacity-70">{parcel.parcelType}</span>
                            </td>
                            <td>{parcel.receiverName}</td>
                            <td>৳{parcel.calculatedCost}</td>
                            <td>
                                <span className={`badge badge-sm ${parcel.paymentStatus === "unpaid" ? "badge-warning" : "badge-success"}`}>
                                    {parcel.paymentStatus}
                                </span>
                            </td>
                            <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>
                            <td className="space-x-1">
                                <label
                                    htmlFor="view-modal"
                                    onClick={() => onView(parcel)}
                                    className="btn btn-xs btn-info text-white"
                                >
                                    View
                                </label>
                                <Link className={`btn btn-xs btn-success text-white`} disabled={parcel.paymentStatus === "paid" ? true: false} to={`payment/${parcel._id}` }>Pay</Link>
                                <button onClick={() => onDelete(parcel._id)} className="btn btn-xs btn-error text-white">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* DaisyUI Modal */}
            <input type="checkbox" id="view-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-4xl w-full relative">
                    <label htmlFor="view-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    {selectedParcel && <ParcelViewCard parcel={selectedParcel} />}
                </div>
            </div>
        </div>
    );
};

export default MyParcel;
