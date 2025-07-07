import React from 'react';
import useUserRole from '../hooks/useUserRole ';
import Loading from '../components/shareComponents/Loading';
import { Navigate } from 'react-router';

const RiderPrivateRoute = ({children}) => {
    const { role, isLoading } = useUserRole()
    
    if (isLoading) {
        return <Loading></Loading>
    }
    if (role !== "rider") {
        console.log('problem is here')
        return <Navigate to="/forbidden"></Navigate>
    }

    return children
};

export default RiderPrivateRoute;