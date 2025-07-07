import React from 'react';
import useUserRole from '../hooks/useUserRole ';
import Loading from '../components/shareComponents/Loading';
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';

const RiderPrivateRoute = ({children}) => {
    const { role, roleLoading } = useUserRole()
    // const{user, loading} = useAuth()
    
    if (!role) {
        
        return
    }
    if (roleLoading ) {
        
        return <Loading></Loading>
    }
    if ( role !== "rider") {
        
        return <Navigate to="/forbidden"></Navigate>
    }
    

    return children
};

export default RiderPrivateRoute;