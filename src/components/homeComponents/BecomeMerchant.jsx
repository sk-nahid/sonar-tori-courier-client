import React from 'react';
import merchantImg from '../../assets/merchant/location-merchant.png'

const BecomeMerchant = () => {
    return (
        <section className="bg-primary p-16 rounded-2xl bg-[url(assets/be-a-merchant-bg.png)] bg-no-repeat">
      <div  className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-8 " >
        
        {/* Left Content */}
        <div  className="w-full md:w-3/5">
          <h2 data-aos="fade-down" className="text-3xl font-bold mb-4">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            We offer the lowest delivery charge with the highest value along with 100% safety of your product.
            Pathao courier delivers your parcels in every corner of Bangladesh right on time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn btn-primary w-full sm:w-auto">
              Become a Merchant
            </button>
            <button className="btn btn-outline w-full sm:w-auto">
              Earn with Profast Courier
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-2/5">
          <img
            src={merchantImg}
            alt="Become a merchant"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
    );
};

export default BecomeMerchant;