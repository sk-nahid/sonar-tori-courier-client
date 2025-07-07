import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../components/shareComponents/Loading';
import { Navigate, useLocation, useNavigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();

    const navigate = useNavigate()
    const location = useLocation()
    if (loading) {
        return <Loading></Loading>
    }
    if (user) {
        return children
    }

    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoute;