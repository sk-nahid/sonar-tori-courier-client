import React from 'react';
import { NavLink, Outlet } from 'react-router';
import NavBar from '../components/shareComponents/NavBar';
import Footer from '../components/shareComponents/Footer';

const RootLayOut = () => {
    const linkClass = ({ isActive }) =>
        isActive
            ? "text-secondary font-semibold"
            : "hover:text-secondary transition";
    const navLinks = <>
        <li>
            <NavLink to="/" end className={linkClass}>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink to="/services" className={linkClass}>
                Services
            </NavLink>
        </li>
        <li>
            <NavLink to="/track" className={linkClass}>
                Track Parcel
            </NavLink>
        </li>
        <li>
            <NavLink to="/contact" className={linkClass}>
                Contact
            </NavLink>
        </li>
        <li>
            <NavLink to="/coverage" className={linkClass}>
                Coverage
            </NavLink>
        </li>
    </>


    return (
        <div>
            <NavBar navLinks={navLinks}></NavBar>
            <Outlet></Outlet>
            <Footer navLinks={navLinks}></Footer>
        </div>
    );
};

export default RootLayOut;