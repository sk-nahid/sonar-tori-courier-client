import React from 'react';
import DistrictMap from '../components/CoverageComponents/DistrictMap';

const Coverage = () => {
    return (
        <div className=''>
            <div>
                <h1 className='text-3xl text-center py-4 bg-secondary my-4 text-white max-w-7xl mx-auto rounded-2xl'>Our area coverage</h1>

            </div>

            <div className='w-[800px] mx-auto '>
                <DistrictMap></DistrictMap>
            </div>
            
        </div>
    );
};

export default Coverage;