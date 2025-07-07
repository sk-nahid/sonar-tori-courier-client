import React from 'react';
import useUserRole from '../../hooks/useUserRole ';
import Loading from '../../components/shareComponents/Loading';
import UserDashboard from './RolePages/UserDashboard';
import RiderDashboard from './RolePages/RiderDashboard';
import AdminDashboard from './RolePages/AdminDashboard';

const DashboardHome = () => {
    const { role, isLoading } = useUserRole();
    if (isLoading) {
        return <Loading></Loading>
    }
    if (role === "user") {
        return <UserDashboard></UserDashboard>
    }
    if (role === "rider") {
        return <RiderDashboard></RiderDashboard>
    }
    if (role === "admin") {
        return <AdminDashboard></AdminDashboard>
    }
};

export default DashboardHome;