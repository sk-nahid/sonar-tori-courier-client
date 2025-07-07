import React, { use } from 'react';
import { NavLink, Outlet } from 'react-router';
import NavBar from '../components/shareComponents/NavBar';
import Footer from '../components/shareComponents/Footer';
import { AuthContext } from '../Context/AuthContext';

const RootLayOut = () => {
    const { user } = use(AuthContext)
    const navLinks = <>
        <li>
            <NavLink to="/" end >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink to="/services" >
                Services
            </NavLink>
        </li>
        <li>
            <NavLink to="/track" >
                Track Parcel
            </NavLink>
        </li>
        <li>
            <NavLink to="/contact" >
                Contact
            </NavLink>
        </li>
        <li>
            <NavLink to="/add-parcel" >
                Send Parcel
            </NavLink>
        </li>
        <li>
            <NavLink to="/coverage" >
                Coverage
            </NavLink>
        </li>
        <li>
            <NavLink to="/be-rider" >
                Be a Rider
            </NavLink>
        </li>
        {
            user && <>
                <li>
                    <NavLink to="/dashboard" >
                        Dashboard
                    </NavLink>
                </li>
            </>
        }
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