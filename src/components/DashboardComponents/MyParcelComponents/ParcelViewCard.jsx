import React from "react";

const ParcelViewCard = ({ parcel }) => {
  const {
    parcelType,
    title,
    senderRegion,
    senderDistrict,
    senderCenter,
    senderAddress,
    receiverRegion,
    receiverDistrict,
    receiverCenter,
    receiverAddress,
    weight,
    creation_date,
    status,
    calculatedCost,
    trackingId,
    paymentStatus,
  } = parcel;

  return (
    <div className="card bg-base-100 shadow-lg border border-base-300 p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-primary mb-4">
        📦 {title} ({parcelType})
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">Sender Info</h3>
          <p><strong>Region:</strong> {senderRegion}</p>
          <p><strong>District:</strong> {senderDistrict}</p>
          <p><strong>Center:</strong> {senderCenter}</p>
          <p><strong>Address:</strong> {senderAddress}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-1">Receiver Info</h3>
          <p><strong>Region:</strong> {receiverRegion}</p>
          <p><strong>District:</strong> {receiverDistrict}</p>
          <p><strong>Center:</strong> {receiverCenter}</p>
          <p><strong>Address:</strong> {receiverAddress}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-1">Parcel Details</h3>
          <p><strong>Weight:</strong> {weight || "N/A"} kg</p>
          <p><strong>Status:</strong> <span className="capitalize">{status}</span></p>
          <p><strong>Payment:</strong> <span className="capitalize">{paymentStatus}</span></p>
          <p><strong>Created:</strong> {new Date(creation_date).toLocaleString()}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-1">Tracking</h3>
          <p><strong>Tracking ID:</strong> {trackingId}</p>
          <p><strong>Delivery Cost:</strong> ৳{calculatedCost}</p>
        </div>
      </div>
    </div>
  );
};

export default ParcelViewCard;
