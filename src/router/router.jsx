import { createBrowserRouter } from "react-router";
import RootLayOut from "../layouts/RootLayOut";
import Home from "../pages/Home";
import AuthLayOut from "../layouts/AuthLayOut";
import Login from "../components/AuthComponents/Login";
import CreateAccount from "../components/AuthComponents/CreateAccount";
import Coverage from "../pages/Coverage";
import AddParcelForm from "../pages/AddParcelForm";

import MyParcel from "../pages/DashboardPages/MyParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/DashboardPages/DashboardHome";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Payment from "../pages/DashboardPages/Payment/Payment";
import PaymentHistory from "../pages/DashboardPages/Payment/PaymentHistory";
import BeARider from "../pages/BeARider";
import ActiveRider from "../pages/DashboardPages/Rider/ActiveRider";
import PendingRider from "../pages/DashboardPages/Rider/PendingRider";
import ChangeRole from "../pages/DashboardPages/ChangeRole/ChangeRole";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";
import Forbidden from "../components/shareComponents/Forbidden";
import AssignRiders from "../pages/DashboardPages/Rider/AssignRiders";
import RiderPrivateRoute from "../PrivateRoute/RiderPrivateRoute";
import PendingDelivery from "../pages/DashboardPages/Rider/RiderDeliveries";
import RiderDeliveries from "../pages/DashboardPages/Rider/RiderDeliveries";
import RiderCashOut from "../pages/DashboardPages/Rider/RiderCashOut";
import RiderEarningsPage from "../pages/DashboardPages/Rider/RiderEarningsPage";
import ParcelTracking from "../pages/DashboardPages/ParcelTracking.jsx/ParcelTracking";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
      {
        index: true,
        Component:Home,
      },
      {
        path: "/coverage",
        Component:Coverage,
      },
      {
        path: '/be-rider',
        element: <PrivateRoute><BeARider></BeARider></PrivateRoute>
      },
      {
        path: '/add-parcel',
        element:<PrivateRoute><AddParcelForm></AddParcelForm></PrivateRoute>,
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayOut,
    children: [
      {
        path: '/login',
        Component:Login,
        
      },
      {
        path: '/create-account',
        Component: CreateAccount,
      }
    ]
  },
  {
    path: '/dashboard',
    element:<PrivateRoute> <DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index:true,
        Component: DashboardHome
      },
      {
        path: '/dashboard/parcels',
        Component:MyParcel
      },
      {
        path: '/dashboard/parcels/payment/:id',
        Component:Payment,
      },
      {
        path: '/dashboard/payment-history',
        Component:PaymentHistory,
      },
      {
        path: '/dashboard/parcel-tracking',
        Component:ParcelTracking,
      },
      {
        path: '/dashboard/pending-delivery',
        element:<RiderPrivateRoute><RiderDeliveries></RiderDeliveries></RiderPrivateRoute>,
      },
      {
        path: '/dashboard/rider-cashOut',
        element:<RiderPrivateRoute><RiderCashOut></RiderCashOut></RiderPrivateRoute>,
      },
      {
        path: '/dashboard/rider-earning',
        element:<RiderPrivateRoute><RiderEarningsPage></RiderEarningsPage></RiderPrivateRoute>,
      },
      {
        path: '/dashboard/pending-rider',
        element: <AdminPrivateRoute><PendingRider></PendingRider></AdminPrivateRoute>,
      },
      {
        path: '/dashboard/active-rider',
        element: <AdminPrivateRoute><ActiveRider></ActiveRider></AdminPrivateRoute>,
      },
      {
        path: '/dashboard/change-role',
        element: <AdminPrivateRoute><ChangeRole></ChangeRole></AdminPrivateRoute>
      },
      {
        path: "/dashboard/assign-rider",
        element: <AdminPrivateRoute><AssignRiders></AssignRiders></AdminPrivateRoute>
      }
      
    ]
  },
  {
    path: "/forbidden",
    Component: Forbidden
  }
]);