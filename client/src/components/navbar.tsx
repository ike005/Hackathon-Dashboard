import {NavLink} from "react-router-dom";
import {useState} from "react";
import {Menu, X} from "lucide-react";

type NavLinksProps = {
    onNavigate?: () => void;
};

const NavLinks = ({onNavigate}: NavLinksProps) => {
    const isLoggedIn = true;
    const linkClass = ({isActive}: { isActive: boolean }) =>
        `block px-4 lg:px-6 py-2 cursor-pointer text-sm font-semibold text-[#000000] rounded-lg transition-colors
        ${isActive ? 'bg-[#F0F3FF] text-[#135BEC]' : 'hover:bg-[#F0F3FF]/60'}`;

    return (
        <div className="flex flex-col gap-1 lg:gap-4 px-2 lg:px-4 py-2 lg:py-0">
            <NavLink to="/" className={linkClass} onClick={onNavigate}>Dashboard</NavLink>
            <NavLink to="/participant" className={linkClass} onClick={onNavigate}>Participants</NavLink>
            <NavLink to="/download" className={linkClass} onClick={onNavigate}>Downloads</NavLink>
            <NavLink to="/test" className={linkClass} onClick={onNavigate}>test</NavLink>

            {isLoggedIn ?
                <NavLink to="#" className="block px-4 lg:px-6 py-2 text-[#000000] cursor-pointer rounded-lg hover:bg-[#F0F3FF]/60" onClick={onNavigate}>Logout</NavLink>
                :
                <NavLink to="#" className="block px-4 lg:px-6 py-2 text-[#000000] cursor-pointer rounded-lg hover:bg-[#F0F3FF]/60" onClick={onNavigate}>Login</NavLink>
            }
        </div>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <header className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 bg-[#FFFFFF] border-b-2 border-[#C8C5D9]">
                <h1 className="text-xl font-bold text-[#135BEC]">HackFlow</h1>
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="p-2 rounded-lg text-[#000000] hover:bg-[#F0F3FF] cursor-pointer"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                </button>
            </header>

            {isOpen && (
                <button
                    type="button"
                    className="lg:hidden fixed inset-0 z-40 bg-black/40 cursor-default"
                    onClick={closeMenu}
                    aria-label="Close menu overlay"
                />
            )}

            <nav
                className={`
                    fixed lg:static inset-y-0 left-0 z-50
                    flex flex-col shrink-0 w-[17rem] sm:w-[20rem] max-w-[85vw]
                    bg-[#FFFFFF] border-r-2 border-[#C8C5D9]
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    pt-14 lg:pt-0
                `}
            >
                <div className="hidden lg:flex px-4 lg:px-6 py-4 justify-start gap-4 h-[4rem] items-center">
                    <h1 className="text-2xl lg:text-3xl font-bold text-[#135BEC]">HackFlow</h1>
                </div>
                <div className="hidden lg:block px-4 lg:px-6 pb-2">
                    <p className="text-sm lg:text-md font-medium text-[#000000]">Hackathon System</p>
                </div>
                <NavLinks onNavigate={closeMenu} />
            </nav>
        </>
    );
};

export default Navbar;
