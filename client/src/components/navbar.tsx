import {NavLink} from "react-router-dom";
// import {useState} from "react";


const NavLinks = () => {
    const isLoggedIn = true;

    return(
        <div>
            <NavLink to="/" className="bg-red-900 px-6 py-2 text-[#FFFFFF] cursor-pointer">Dashboard</NavLink>
            <NavLink to="/participant" className="bg-red-900 px-6 py-2 text-[#FFFFFF] cursor-pointer">Participants</NavLink>

            {isLoggedIn ?
                <NavLink to="#" className="bg-red-900 px-6 py-2 text-[#FFFFFF] cursor-pointer">Logout</NavLink>
                :
                <NavLink to="#" className="bg-red-900 px-6 py-2 text-[#FFFFFF] cursor-pointer">Login</NavLink>
            }
        </div>
    )
}

const Navbar = () => {
    return(
        <div className="flex flex-row justify-between items-center bg-[#111827] px-8 py-4 md:py-8 gap-4">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#FFFFFF]">Hackathon Dashboard</h1>
                <p className="text-md font-normal text-[#AAAFB8]">Track participant progress and overall insight</p>
            </div>
            <NavLinks />
        </div>
    )
}

export default Navbar;