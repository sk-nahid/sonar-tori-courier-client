import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";


const ParcelTrackingPage = () => {
    const axiosSecure = useAxios();
    const { user } = useAuth();
    const [trackingId, setTrackingId] = useState("");
    const [selectedTracking, setSelectedTracking] = useState(null);

    const {
        data: deliveryDetails,
        isLoading: trackingLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["trackParcel", trackingId],
        enabled: !!trackingId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/track-parcel/${trackingId}`);
            return res.data;
        },
    });

    const {
        data: userParcels = [],
        isLoading: parcelsLoading,
    } = useQuery({
        queryKey: ["userUndeliveredParcels", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data.filter(p => p.status !== "delivered");
        },
    });

    const handleSearch = () => {
        console.log('clicked')
        if (trackingId) refetch();
    };

    const handleTrack = (id) => {
        
        setTrackingId(id);
        refetch();
        setSelectedTracking(id);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <h2 className="text-2xl font-bold text-center">📦 Track Your Parcel</h2>
            <div className="flex items-center gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Enter Tracking ID..."
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="input input-bordered w-full"
                />
                <button onClick={handleSearch} className="btn btn-primary">
                    Search
                </button>
            </div>
            {trackingLoading && <p>Loading tracking info...</p>}
            {error && <p className="text-red-500">Error fetching tracking info.</p>}
            {deliveryDetails?.log?.length > 0 && selectedTracking && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">📍 Tracking History for {selectedTracking}</h3>
                    {deliveryDetails.log.map((logItem, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 rounded p-3 border-l-4 border-blue-500"
                        >
                            <p>{logItem.message}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(logItem.timeStamp).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            <div className="overflow-x-auto bg-white rounded-xl p-4 shadow">
                <h3 className="text-lg font-semibold mb-2">Your Undelivered Parcels</h3>
                {parcelsLoading ? (
                    <p>Loading parcels...</p>
                ) : userParcels.length === 0 ? (
                    <p className="text-gray-500">You have no undelivered parcels.</p>
                ) : (
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tracking ID</th>
                                <th>Receiver</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userParcels.map((parcel, index) => (
                                <tr key={parcel._id}>
                                    <td>{index + 1}</td>
                                    <td>{parcel.trackingId}</td>
                                    <td>{parcel.receiverName}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => handleTrack(parcel.trackingId)}
                                        >
                                            Track
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            


        </div>
    );
};

export default ParcelTrackingPage;
