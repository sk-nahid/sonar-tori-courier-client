import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
import Loading from '../components/shareComponents/Loading';
import useUserRole from './useUserRole ';

const axiosSecure = axios.create({
    baseURL: 'https://sonar-tori-server.vercel.app',
    withCredentials: true
})



const useAxios = () => {
    // const { isLoading } = useUserRole()
    const { user, logOut, loading } = useAuth()
    const navigate = useNavigate()

    if (loading) {
        console.log('problem is here')
        return <Loading></Loading>
    }

    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `bearer ${user.accessToken}`
        return config
    }, error => {
        console.log(error)
    })

    axiosSecure.interceptors.response.use((res) => {
        return res
    }, async (error) => {
        console.log('error from req', error.status)
         const status = await error.status;
        if (status === 403) {
            console.log('forbidden here')
            // navigate('/forbidden')
        }
        else if (status === 401) {
            console.log('enter here')
            await logOut()
                .then(() => {


                    navigate('/login')
                })
                .catch(() => { })

        }
        return Promise.reject(error)
    })

    return axiosSecure
};

export default useAxios;