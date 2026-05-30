import {NavLink} from "react-router-dom";
// import {useState} from "react";


const NavLinks = () => {
    const isLoggedIn = true;

    return(
        <div className="flex flex-col gap-4 px-4">
            <NavLink to="/" className={({isActive}) =>
                `px-6 py-2 cursor-pointer text-sm font-semibold text-[#000000]
                ${isActive ? 'bg-[#F0F3FF] text-[#135BEC] rounded-lg' : ''}`
            }>Dashboard</NavLink>

            <NavLink to="/participant" className={({isActive}) =>
                `px-6 py-2  cursor-pointer text-sm font-semibold text-[#000000]
                ${isActive ? ' bg-[#F0F3FF] text-[#135BEC] rounded-lg' : ''}`
            }>Participants</NavLink>

            <NavLink to="/part" className={({isActive}) =>
                `px-6 py-2  cursor-pointer text-sm font-semibold text-[#000000]
                ${isActive ? ' bg-[#F0F3FF] text-[#135BEC] rounded-lg' : ''}`
            }>Downloads</NavLink>

            {isLoggedIn ?
                <NavLink to="#" className="px-6 py-2 text-[#000000] cursor-pointer">Logout</NavLink>
                :
                <NavLink to="#" className="px-6 py-2 text-[#000000] cursor-pointer">Login</NavLink>
            }
        </div>
    )
}

const Navbar = () => {
    return(
        <div className="static flex flex-col w-[20rem] bg-[#FFFFFF] border-r-2 border-[#C8C5D9]">
            <div className="px-6 py-4 flex justify-start gap-4 h-[4rem]">
                <h1 className="text-3xl font-bold text-[#135BEC] text-center">HackFlow</h1>
            </div>
            <div className="px-6 py-4 flex justify-start">
                <h1 className="text-md font-medium text-[#000000] text-center">Hackathon System</h1>
            </div>
            <NavLinks />
        </div>
    )
}

export default Navbar;
