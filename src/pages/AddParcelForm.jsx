import { useForm } from "react-hook-form";
import { use, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import areaData from "../assets/warehouses.json";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";
const generateTrackingId = () => {
    const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, ""); // "240624"
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // "X8TZ03"
    return `ST-${datePart}-${randomPart}`;
};




const AddParcelForm = ({ userName = "John Doe" }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();
    const { user } = use(AuthContext)
    const [showConfirm, setShowConfirm] = useState(false);
    const [cost, setCost] = useState(0);
    const [formData, setFormData] = useState(null);
    const [isWithinCity, setIsWithinCity] = useState(false)
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("")
    const [selectedReceiverRegion, setSelectedReceiverRegion] = useState("");
    const [selectedReceiverDistrict, setSelectedReceiverDistrict] = useState("")
    const axiosSecure = useAxios()
    //sender info
    const regions = [...new Set(areaData.map(item => item.region))];
    const districts = areaData.filter(item => item.region === selectedRegion).map(item => item.district)
    const serviceCenter = areaData.find(item => item.district === selectedDistrict)

    // receiver info
    const receiverRegions = [...new Set(areaData.map(item => item.region))];
    const receiverDistricts = areaData.filter(item => item.region === selectedReceiverRegion).map(item => item.district)
    const receiverServiceCenter = areaData.find(item => item.district === selectedReceiverDistrict)

    useEffect(() => {
        if (selectedDistrict === selectedReceiverDistrict) {
            console.log(selectedDistrict, selectedReceiverDistrict, isWithinCity)
            return setIsWithinCity(true)
        }
        else {
            return setIsWithinCity(false)
        }

    }, [selectedDistrict, selectedReceiverDistrict])




    // console.log(formData)
    const parcelType = watch("parcelType");

    const calculateCost = (data) => {
        // console.log(data)


        const type = data.parcelType
        const weight = parseFloat(data.weight) || 0;
        // const weightCharge = weight > 0 ? weight * 10 : 0;
        // return base + weightCharge;

        if (type === "document") {
            return isWithinCity ? 60 : 80;
        }

        if (type === "non-document") {
            const baseCost = isWithinCity ? 110 : 150;

            if (weight <= 3) {
                return baseCost;
            }

            const extraWeight = Math.ceil(weight - 3);
            const extraCharge = extraWeight * 40;

            console.log('weaght', extraWeight, "charege-", extraCharge)

            return isWithinCity
                ? baseCost + extraCharge
                : baseCost + extraCharge + 40; // ৳40 extra for outside
        }

        return 0; // fallback



    };

    // console.log(formData)

    const onSubmit = async (data) => {
        const deliveryCost = calculateCost(data);
        setCost(deliveryCost);

        const parcelData = {
            ...data,
            creation_date: new Date(),
            status: "pending",
            isWithinCity,
            calculatedCost: deliveryCost,
            paymentStatus: "unpaid",
            userEmail: user.email,
            trackingId: generateTrackingId()
        };
        setFormData(parcelData)

        const breakdownHtml = `
    <div style="text-align: left;">
      <strong>Parcel Type:</strong> ${parcelData.parcelType}<br>
      <strong>Weight:</strong> ${parcelData.weight || "N/A"} kg<br>
      <strong>Delivery Area:</strong> ${isWithinCity ? "Within City" : "Outside City"}<br>
      <strong>Total Cost:</strong> ৳${deliveryCost}
    </div>
  `;
        const result = await Swal.fire({
            title: 'Confirm Parcel Submission',
            html: breakdownHtml,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Confirm & Submit',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        });

        if (result.isConfirmed) {
            try {
                // 🟢 Save to Firebase, MongoDB, etc.
                // await saveToDatabase(parcelData);

                const parcelRes = await axiosSecure.post('/parcels', parcelData)
                console.log(parcelRes)

                if (parcelRes?.data?.insertedId) {
                    await Swal.fire({
                        title: "Confirmed!",
                        html: `
      <p>Your parcel has been submitted.</p>
      <p><strong>Tracking ID:</strong> ${parcelData.trackingId}</p>
      <button id="goToPaymentBtn" class="swal2-confirm swal2-styled" style="margin-top: 10px;">
        Go to Payment
      </button>
    `,
                        icon: "success",
                        showConfirmButton: false, // we use a custom button instead
                        didOpen: () => {
                            const btn = document.getElementById('goToPaymentBtn');
                            btn.addEventListener('click', () => {
                                window.location.href = `/dashboard/parcels/payment/${parcelRes.data.insertedId}`; // update to your actual payment route
                            });
                        }
                    });
                }
                


                reset(); // clear the form if using react-hook-form

            } catch (error) {
                console.error("Error saving parcel:", error);
                await Swal.fire("Error", "Something went wrong while saving!", "error");
            }
        }



    };

    const handleConfirm = () => {
        toast.dismiss();
        toast.success("Parcel information submitted!");
        console.log("Parcel submitted:", formData);
        // reset();
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow rounded-xl my-8">
            <h2 className="text-2xl font-bold mb-1">Add Parcel</h2>
            <p className="mb-6 text-sm text-base-content/70">
                Please fill in the required information for pickup and delivery.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Parcel Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Parcel Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="label">Type</label>
                            <select {...register("parcelType", { required: true })} className="select select-bordered w-full">
                                <option value="">Select</option>
                                <option value="document">Document</option>
                                <option value="non-document">Non-Document</option>
                            </select>
                            {errors.parcelType && <p className="text-red-500 text-sm">Required</p>}
                        </div>
                        <div>
                            <label className="label">Title</label>
                            <input {...register("title", { required: true })} className="input input-bordered w-full" />
                            {errors.title && <p className="text-red-500 text-sm">Required</p>}
                        </div>
                        {parcelType === "non-document" && (
                            <div>
                                <label className="label">Weight (kg)</label>
                                <input type="number" step="0.1" {...register("weight")} className="input input-bordered w-full" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Sender Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Sender Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="label">Name</label>
                            <input defaultValue={user?.displayName} {...register("senderName", { required: true })} className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="label">Contact</label>
                            <input {...register("senderContact", { required: true })} className="input input-bordered w-full" />
                            {errors.senderContact && <p className="text-red-500 text-sm">Required</p>}
                        </div>
                        <div>
                            <label className="label">Region</label>

                            <select
                                className="select select-bordered w-full"
                                {...register("senderRegion", { required: true })}
                                onChange={(e) => {

                                    setSelectedRegion(e.target.value)
                                    setSelectedDistrict('')

                                }}
                            >
                                <option value="select">Select</option>
                                {
                                    regions.map((region, idx) => (
                                        <option key={idx} value={region}>{region}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label className="label">District</label>
                            <select
                                className="select select-bordered w-full"
                                {...register("senderDistrict", { required: true })}
                                onChange={(e) => {

                                    setSelectedDistrict(e.target.value)

                                }}
                            >
                                <option value="select">Select</option>
                                {
                                    districts.map((district, idx) => (
                                        <option key={idx} value={district}>{district}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label className="label">Service Center</label>
                            <select
                                className="select"
                                {...register('senderCenter', { required: true })}

                            >
                                <option value="select">select</option>
                                {
                                    serviceCenter?.covered_area.map((item, idx) => (
                                        <option key={idx} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="">
                            <label className="label">Address</label>
                            <input {...register("senderAddress", { required: true })} className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="label">Pickup Instruction</label>
                            <input {...register("pickupInstruction", { required: true })} className="input input-bordered w-full" />
                        </div>
                    </div>
                </div>

                {/* Receiver Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Receiver Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="label">Name</label>
                            <input {...register("receiverName", { required: true })} className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="label">Contact</label>
                            <input {...register("receiverContact", { required: true })} className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="label">Region</label>
                            <select
                                className="select select-bordered w-full"
                                {...register("receiverRegion", { required: true })}
                                onChange={(e) => {

                                    setSelectedReceiverRegion(e.target.value)
                                    setSelectedReceiverDistrict('')

                                }}
                            >
                                <option value="select">Select</option>
                                {
                                    receiverRegions.map((region, idx) => (
                                        <option key={idx} value={region}>{region}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label className="label">District</label>
                            <select
                                className="select select-bordered w-full"
                                {...register("receiverDistrict", { required: true })}
                                onChange={(e) => {

                                    setSelectedReceiverDistrict(e.target.value)

                                }}
                            >
                                <option value="select">Select</option>
                                {
                                    receiverDistricts.map((district, idx) => (
                                        <option key={idx} value={district}>{district}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label className="label">Service Center</label>
                            <select
                                className="select"
                                {...register('receiverCenter', { required: true })}

                            >
                                <option value="select">select</option>
                                {
                                    receiverServiceCenter?.covered_area.map((item, idx) => (
                                        <option key={idx} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="">
                            <label className="label">Address</label>
                            <input {...register("receiverAddress", { required: true })} className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="label">Delivery Instruction</label>
                            <input {...register("deliveryInstruction", { required: true })} className="input input-bordered w-full" />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>

            {/* Toast container */}
            {/* <ToastContainer /> */}
        </div>
    );
};

export default AddParcelForm;
