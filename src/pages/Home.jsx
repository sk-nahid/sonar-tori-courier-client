import React from 'react';
import Banner from '../components/homeComponents/banner';
import Services from '../components/homeComponents/Services';
import BrandLogoBar from '../components/homeComponents/BrandLogoBar';
import SpecialtySection from '../components/homeComponents/SpecialtySection';
import BecomeMerchant from '../components/homeComponents/BecomeMerchant';

const Home = () => {
    return (
        <div className='container mx-auto px-6 py-10'>
            <Banner></Banner>
            <Services></Services>
            <BrandLogoBar></BrandLogoBar>
            <SpecialtySection></SpecialtySection>
            <BecomeMerchant></BecomeMerchant>
        </div>
    );
};

export default Home;