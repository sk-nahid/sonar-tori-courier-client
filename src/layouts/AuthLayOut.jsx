import React from 'react';
import { Link, Outlet } from 'react-router';
import authImage from '../assets/authImage.png'
const AuthLayOut = () => {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto">
            {/* Left Side: Logo + Form */}
            <div className="flex flex-col p-8 justify-between">
                {/* Logo */}
                <div>
                    <Link to='/'>
                    <img src={`https://i.ibb.co/MWMN92Z/navLogo.png`} alt="Sonar Tori Logo" className="h-12" /></Link>
                </div>

                {/* Login Form */}
                <Outlet></Outlet>

                
            </div>

            {/* Right Side: Image */}
            <div className="hidden lg:flex items-center justify-center ">
                <img
                    src={authImage}
                    alt="Login Visual"
                    className="w-full h-[70%] object-center "
                />
            </div>
        </div>
    );
};

export default AuthLayOut;