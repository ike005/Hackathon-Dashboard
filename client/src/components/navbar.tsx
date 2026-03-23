import {NavLink} from "react-router-dom";
// import {useState} from "react";


const NavLinks = () => {
    const isLoggedIn = true;

    return(
        <div className="flex flex-col gap-4 px-4">
            <NavLink to="/" className={({isActive}) =>
                `px-6 py-2 cursor-pointer text-sm font-light text-[#FFFFFF]
                ${isActive ? 'bg-[#1F2937] rounded-lg' : ''}`
            }>Dashboard</NavLink>

            <NavLink to="/participant" className={({isActive}) =>
                `px-6 py-2  cursor-pointer text-sm font-light text-[#FFFFFF]
                ${isActive ? ' bg-[#1F2937] rounded-lg' : ''}`
            }>Participants</NavLink>

            <NavLink to="/2" className={({isActive}) =>
                `px-6 py-2  cursor-pointer text-sm font-light text-[#FFFFFF]
                ${isActive ? 'bg-[#1F2937] rounded-lg' : ''}`
            }>Settings</NavLink>

            {isLoggedIn ?
                <NavLink to="#" className="px-6 py-2 text-[#FFFFFF] cursor-pointer">Logout</NavLink>
                :
                <NavLink to="#" className="px-6 py-2 text-[#FFFFFF] cursor-pointer">Login</NavLink>
            }
        </div>
    )
}

const NotificationLinks = () => {
    const isLoggedIn = true;

    return(
        <div className="flex flex-col gap-4 px-4">
            <NavLink to="/" className={({isActive}) =>
                `px-6 py-2 cursor-pointer text-sm font-light text-[#FFFFFF]
                ${isActive ? 'bg-[#1F2937] rounded-lg' : ''}`
            }>Dashboard</NavLink>

            <NavLink to="/participant" className={({isActive}) =>
                `px-6 py-2  cursor-pointer text-sm font-light text-[#FFFFFF]
                ${isActive ? ' bg-[#1F2937] rounded-lg' : ''}`
            }>Participants</NavLink>

            <NavLink to="/2" className={({isActive}) =>
                `px-6 py-2  cursor-pointer text-sm font-light text-[#FFFFFF]
                ${isActive ? 'bg-[#1F2937] rounded-lg' : ''}`
            }>Settings</NavLink>

            {isLoggedIn ?
                <NavLink to="#" className="px-6 py-2 text-[#FFFFFF] cursor-pointer">Logout</NavLink>
                :
                <NavLink to="#" className="px-6 py-2 text-[#FFFFFF] cursor-pointer">Login</NavLink>
            }
        </div>
    )
}

const Navbar = () => {
    return(
        <div className="static flex flex-col w-[20rem] bg-[#111827] border-r-2 border-[#525252]">
            <div className="px-6 py-4 flex justify-start gap-4 h-[4rem]">
                {/*border-b-2 border-[#282E38]*/}
                <h1 className="text-xl font-medium text-[#FFFFFF] text-center">Hackathon System</h1>
            </div>
            <div className="px-6 py-4 flex justify-start gap-4 h-[4rem] border-t-2 border-[#525252]">
                {/*border-b-2 border-[#282E38]*/}
                <h1 className="text-md font-medium text-[#FFFFFF] text-center">Notifications</h1>
            </div>
            <NavLinks />
            <div className="px-6 py-4 flex justify-start gap-4 h-[4rem] border-t-2 border-[#525252]">
                {/*border-b-2 border-[#282E38]*/}
                <h1 className="text-md font-medium text-[#FFFFFF] text-center">Notifications</h1>
            </div>
            <NotificationLinks />
        </div>
    )
}

export default Navbar;
