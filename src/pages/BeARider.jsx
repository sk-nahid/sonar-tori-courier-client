import { useForm } from "react-hook-form";
import { useState } from "react";
import areaData from "../assets/warehouses.json";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";

const BeARider = () => {

    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [selectedRegion, setSelectedRegion] = useState("");
    const axiosSecure = useAxios()

    const regions = [...new Set(areaData.map(item => item.region))];
    const districts = areaData.filter(item => item.region === selectedRegion).map(item => item.district);

    const onSubmit = async (data) => {
        console.log("Rider Data:", data);
        const riderData = {
            ...data,
            status: "pending",
            createAt: new Date().toISOString(),
        }
        const res = await axiosSecure.post('/riders', riderData)
        console.log(res.data)
        if (res.data.insertedId) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "rider request submitted",
                showConfirmButton: false,
                timer: 1500
            });
        }
        if (res.data.message) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${res.data.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }

        // TODO: POST this data to your backend API
        // reset();
    };

    return (
        <div className="max-w-xl mx-auto bg-base-100 p-6 rounded-xl shadow my-8">
            <h2 className="text-2xl font-bold mb-4">Become a Rider</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="label">Name</label>
                    <input
                        type="text"
                        defaultValue={user?.displayName || ""}
                        readOnly
                        className="input input-bordered w-full bg-base-200"
                        {...register("name")}
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="label">Email</label>
                    <input
                        type="email"
                        defaultValue={user?.email || ""}
                        readOnly
                        className="input input-bordered w-full bg-base-200"
                        {...register("email")}
                    />
                </div>

                {/* Region */}
                <div>
                    <label className="label">Region</label>
                    <select
                        className="select select-bordered w-full"
                        {...register("region", { required: true })}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                        <option value="">Select a region</option>
                        {regions.map((region, i) => (
                            <option key={i} value={region}>{region}</option>
                        ))}
                    </select>
                    {errors.region && <p className="text-red-500 text-sm">Region is required</p>}
                </div>

                {/* District */}
                <div>
                    <label className="label">District</label>
                    <select
                        className="select select-bordered w-full"
                        {...register("district", { required: true })}
                    >
                        <option value="">Select a district</option>
                        {districts.map((district, i) => (
                            <option key={i} value={district}>{district}</option>
                        ))}
                    </select>
                    {errors.district && <p className="text-red-500 text-sm">District is required</p>}
                </div>

                {/* Phone Number */}
                <div>
                    <label className="label">Phone Number</label>
                    <input
                        type="tel"
                        className="input input-bordered w-full"
                        {...register("phone", { required: true })}
                        placeholder="e.g. 017XXXXXXXX"
                    />
                    {errors.phone && <p className="text-red-500 text-sm">Phone is required</p>}
                </div>
                {/* NID Number */}
                <div>
                    <label className="label">NID Number</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        {...register("nid", { required: true })}
                        placeholder="e.g. 2435132452"
                    />
                    {errors.nid && <p className="text-red-500 text-sm">NID is required</p>}
                </div>

                {/* Vehicle Type */}
                <div>
                    <label className="label">Vehicle Type</label>
                    <select
                        className="select select-bordered w-full"
                        {...register("vehicleType", { required: true })}
                    >
                        <option value="">Select Vehicle</option>
                        <option value="bike">Bike</option>
                        <option value="cycle">Cycle</option>
                        <option value="van">Van</option>
                    </select>
                    {errors.vehicleType && <p className="text-red-500 text-sm">Vehicle is required</p>}
                </div>

                {/* Submit */}
                <div className="text-right">
                    <button className="btn btn-primary">Apply Now</button>
                </div>
            </form>
        </div>
    );
};

export default BeARider;