import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole ';
import Loading from '../components/shareComponents/Loading';
import { Navigate } from 'react-router';

const AdminPrivateRoute = ({children}) => {

    // const { user } = useAuth();
    const { role, isLoading } = useUserRole()
    if (!role) {
        return
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    if (role !== "admin") {
        
        return <Navigate to="/forbidden"></Navigate>
    }

    return children
};

export default AdminPrivateRoute;