import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const AssignRiderModal = ({ parcel, onClose }) => {
    const axiosSecure = useAxios();
    const queryClient = useQueryClient();

    const { data: riders = [], isLoading } = useQuery({
        queryKey: ["riders", parcel?.senderDistrict],
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?district=${parcel.senderDistrict}&status=approved`);
            return res.data;
        },
        enabled: !!parcel,
    });




    const handleAssignRider = async (rider) => {
        let riderCharge = parcel.calculatedCost * 0.3;
        if (parcel.isWithinCity) {
            riderCharge = parcel.calculatedCost * 0.8;
            
        }
        const deliveryInfo = {
            trackingId: parcel.trackingId,
            riderName: rider.name,
            isWithinCity: parcel.isWithinCity,
            riderCharge,
            role:'pickup',
            riderId: rider._id,
            riderEmail: rider.email,
            assignData: new Date(),
            status: "assign rider to collect",
            log: [
                {
                    message: `assign ${rider.name} to collect parcel from sender`,
                    timeStamp: new Date()
                }
            ]

        }

        const result = await axiosSecure.patch(`/parcels/${parcel._id}`, deliveryInfo)
        console.log(result.data)
        if (result.data.message) {
            Swal.fire({
                title: "Assign Successful",
                icon: "success",
                draggable: true
            });
        }
        return result.data

    }


    return (
        <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box sm:max-w-5xl w-full">
                <h3 className="font-bold text-lg mb-4">Assign Rider to Parcel: {parcel.trackingId}</h3>

                {isLoading ? (
                    <p>Loading riders...</p>
                ) : riders.length === 0 ? (
                    <p>No approved riders found in {parcel.senderDistrict}</p>
                ) : (
                    <div className="overflow-x-auto max-h-96">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Rider Name</th>
                                    <th>Email</th>
                                    <th>Region</th>
                                    <th>District</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {riders.map((rider, index) => (
                                    <tr key={rider._id}>
                                        <td>{index + 1}</td>
                                        <td>{rider.name}</td>
                                        <td>{rider.email}</td>
                                        <td>{rider.region}</td>
                                        <td>{rider.district}</td>
                                        <td>
                                            <button
                                                onClick={() => handleAssignRider(rider)}
                                                className="btn btn-sm btn-success"
                                            >
                                                Assign
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="modal-action">
                    <button onClick={onClose} className="btn btn-outline">Close</button>
                </div>
            </div>
        </dialog>
    );
};

AssignRiderModal.propTypes = {
    parcel: PropTypes.object,
    onClose: PropTypes.func.isRequired,
};

export default AssignRiderModal;
