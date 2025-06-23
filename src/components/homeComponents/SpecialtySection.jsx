import React from 'react';
import tracking from '../../assets/special/live-tracking.png'
import safe from '../../assets/special/safe-delivery.png'
import support from '../../assets/special/support.jpg'

const specialties = [
    {
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        image: tracking,
    },
    {
        title: "24/7 Call Center Support",
        description:
            "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        image: support,
    },
    {
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        image: safe,
    },
];

const SpecialtySection = () => {
    return (
        <section className="py-16 bg-base-100 text-base-content rounded-3xl">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-10 text-center">Our Specialty</h2>

                <div className="space-y-6 ">
                    {specialties.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row items-center  p-6 rounded-xl shadow-md gap-6 bg-white"
                        >
                            {/* Image - 20% */}
                            <div 
                                data-aos="flip-left"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="10000"
                                className="flex-shrink-0 w-full md:w-1/5 ">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-auto object-contain border-r-2 pr-4 border-black border-dashed"
                                />
                            </div>

                            {/* Text - 80% */}
                            <div className="w-full md:w-4/5">
                                <h3 className="text-xl text-black font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SpecialtySection;