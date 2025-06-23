import React, { use, useEffect, useState } from 'react';
import { CiDark, CiLight } from 'react-icons/ci';
import { FaLightbulb, FaRegLightbulb } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const NavBar = ({ navLinks }) => {
    const {user,logOut}= use(AuthContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState("dark")
    const handleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme)
        document.documentElement.setAttribute("data-theme", `sonartori-${theme}`);
    }

    const handleLogout = () => {
        logOut().then(res=> console.log(res)).catch(error=> console.log(error))
    }

    console.log(user)





    return (
        <nav className="bg-primary text-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <NavLink to="/" className="text-2xl font-bold tracking-wide">
                    <img className='w-[170px]' src={`https://i.ibb.co/MWMN92Z/navLogo.png`} alt="logo" />
                </NavLink>

                {/* Menu (hidden on mobile) */}
                <ul className="hidden md:flex space-x-8">
                    {navLinks}
                </ul>




                {/* Buttons (hidden on mobile) */}
                <div className="hidden md:flex space-x-4 items-center">
                    {/* dark and light theme */}
                    <button onClick={handleTheme} >
                        {theme === 'light' ? <CiLight size={40} />: <CiDark  size={40}/>}
                    </button>
                    {
                        user? <button onClick={handleLogout} className="btn btn-outline btn-sm text-white hover:bg-secondary hover:border-secondary">
                        Log Out</button> : <Link to='/login'> <button className="btn btn-outline btn-sm text-white hover:bg-secondary hover:border-secondary">
                        Sign Up</button></Link>
                    }
                    {
                        user ? <button className="btn btn-primary btn-sm">{ user.email}</button>: <Link to='/create-account'> <button className="btn btn-primary btn-sm">Register</button></Link>
                    }
                </div>

                {/* Hamburger Menu Button (visible on mobile) */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-primary text-white px-6 pb-4">
                    <ul className="space-y-4 pt-4 border-t border-secondary">
                        {navLinks}
                    </ul>

                    {/* Buttons */}
                    <div className="flex flex-col space-y-2 mt-6">
                        <button className="btn btn-outline btn-sm text-white hover:bg-secondary hover:border-secondary">
                            Sign Up
                        </button>
                        <button className="btn btn-primary btn-sm">Register</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;