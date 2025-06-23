import React from 'react';
import Marquee from "react-fast-marquee";
import logo1 from "../../assets/brands/amazon.png";
import logo2 from "../../assets/brands/amazon_vector.png";
import logo3 from "../../assets/brands/moonstar.png";
import logo4 from "../../assets/brands/randstad.png";
import logo5 from "../../assets/brands/start-people 1.png";
import logo6 from "../../assets/brands/start.png";
import logo7 from "../../assets/brands/casio.png";


const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];
const BrandLogoBar = () => {
    return (
        <div className="bg-primary py-6">
      <Marquee pauseOnHover speed={40} gradient={false}>
        <div className="flex items-center gap-26">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`brand-${index}`}
              className="h-[24px]  w-auto object-contain"
            />
          ))}
        </div>
      </Marquee>
    </div>
    );
};

export default BrandLogoBar;