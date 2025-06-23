import { FaTruck, FaGlobeAsia, FaWarehouse, FaMoneyBillWave, FaBuilding, FaUndo } from "react-icons/fa";

const services = [
    {
        title: "Express & Standard Delivery",
        description:
            "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
        icon: <FaTruck className="text-3xl text-primary" />,
    },
    {
        title: "Nationwide Delivery",
        description:
            "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
        icon: <FaGlobeAsia className="text-3xl text-primary" />,
    },
    {
        title: "Fulfillment Solution",
        description:
            "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
        icon: <FaWarehouse className="text-3xl text-primary" />,
    },
    {
        title: "Cash on Home Delivery",
        description:
            "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
        icon: <FaMoneyBillWave className="text-3xl text-primary" />,
    },
    {
        title: "Corporate Service / Contract In Logistics",
        description:
            "Customized corporate services which includes warehouse and inventory management support.",
        icon: <FaBuilding className="text-3xl text-primary" />,
    },
    {
        title: "Parcel Return",
        description:
            "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
        icon: <FaUndo className="text-3xl text-primary" />,
    },
];

const Services = () => {
    return (
        <section className="py-16 bg-base-100 text-base-content ">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 max-w-2xl mx-auto">
                    <h2 className="md:text-3xl text-xl font-bold mb-4">Our Services</h2>
                    <p className="text-sm text-gray-500">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                    </p>
                </div>

                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  ">
                    {services.map((service, index) => (
                        <div
                            data-aos="zoom-in"
                            data-aos-duration= '2000'
                            key={index}
                            className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition text-center hover:bg-secondary transition-all duration-1000"
                        >
                            <div className="mb-4 flex justify-center">{service.icon}</div>
                            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;