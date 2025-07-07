import axios from 'axios';
import React from 'react';
const axiosInstance = axios.create({
        baseURL:'https://sonar-tori-server.vercel.app'
    })

const useAxiosInstance = () => {
    
    return axiosInstance
};

export default useAxiosInstance;