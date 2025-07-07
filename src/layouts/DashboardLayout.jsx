import { Link, Outlet } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import "@fortawesome/fontawesome-free/css/all.min.css";
import useUserRole from "../hooks/useUserRole ";


const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role, isLoading: roleLoading } = useUserRole()

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex flex-col bg-base-200">

      {/* TOP NAVBAR */}
      <div className="navbar bg-base-100 shadow px-4">
        <div className="flex-1 items-center gap-4">
          {/* Sidebar toggle (mobile) */}
          <button className="md:hidden btn btn-sm btn-ghost" onClick={toggleSidebar}>
            <FiMenu size={20} />
          </button>
          <Link to="/" className="text-xl font-bold text-primary">Sonar Tori</Link>
        </div>
        <div className="flex-none">
          {user ? (
            <button onClick={logout} className="btn btn-sm btn-outline btn-error">
              <FiLogOut className="mr-1" /> Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-sm btn-outline btn-primary">Login</Link>
          )}
        </div>
      </div>

      {/* MAIN BODY */}
      <div className="flex flex-1 relative">

        {/* SIDEBAR - MOBILE SLIDE & DESKTOP STATIC */}
        <aside
          className={`bg-base-100 border-r w-64 z-50 fixed md:static inset-y-0 left-0 transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          {/* Close btn for mobile */}
          <div className="flex justify-between items-center md:hidden p-4 border-b">
            <h2 className="text-lg font-bold">Menu</h2>
            <button onClick={toggleSidebar}>
              <FiX size={22} />
            </button>
          </div>

          <ul className="menu p-4 font-semibold space-y-1 text-base">
            <li>
              <Link to="/dashboard" onClick={toggleSidebar} className="flex items-center gap-3">
                <i className="fa-solid fa-chart-line text-primary"></i>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/parcels" onClick={toggleSidebar} className="flex items-center gap-3">
                <i className="fa-solid fa-boxes-stacked text-secondary"></i>
                All Parcels
              </Link>
            </li>
            <li>
              <Link to="/dashboard/payment-history" onClick={toggleSidebar} className="flex items-center gap-3">
                <i className="fa-solid fa-file-invoice-dollar text-secondary"></i>
                Payment History
              </Link>
            </li>
            <li>
              <Link to="/dashboard/parcel-tracking" onClick={toggleSidebar} className="flex items-center gap-3">
                <i className="fa-solid fa-location-crosshairs text-success"></i>
                Track Parcel
              </Link>
            </li>

            {!roleLoading && role === "rider" && (
              <>
                <li>
                  <Link to="/dashboard/pending-delivery" onClick={toggleSidebar} className="flex items-center gap-3">
                    <i className="fa-solid fa-clock text-warning"></i>
                    Pending Delivery
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/rider-cashOut" onClick={toggleSidebar} className="flex items-center gap-3">
                    <i className="fa-solid fa-money-check-dollar text-green-600"></i>
                    Rider Delivery History
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/rider-earning" onClick={toggleSidebar} className="flex items-center gap-3">
                    <i className="fa-solid fa-sack-dollar text-yellow-600"></i>
                    Rider Earning
                  </Link>
                </li>
              </>
            )}

            {!roleLoading && role === "admin" && (
              <>
                <li>
                  <Link to="/dashboard/active-rider" onClick={toggleSidebar} className="flex items-center gap-3">
                    <i className="fa-solid fa-user-check text-green-500"></i>
                    Active Rider
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/pending-rider" onClick={toggleSidebar} className="flex items-center gap-3">
                    <i className="fa-solid fa-user-clock text-yellow-500"></i>
                    Pending Rider
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/change-role" onClick={toggleSidebar} className="flex items-center gap-3">
                    <i className="fa-solid fa-user-gear text-cyan-600"></i>
                    Change Role
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/assign-rider" onClick={toggleSidebar} className="flex items-center gap-3">
                    <i className="fa-solid fa-motorcycle text-purple-500"></i>
                    Assign Rider
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/settings" onClick={toggleSidebar} className="flex items-center gap-3">
                    <i className="fa-solid fa-gear text-gray-600"></i>
                    Settings
                  </Link>
                </li>
              </>
            )}
          </ul>

        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-4  w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
