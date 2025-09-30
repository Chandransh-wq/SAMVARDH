import { Link } from "react-router-dom";
import { getInitials, user } from "../assets/functions";
import { MdDashboard } from "react-icons/md";
import { useState } from "react";
import { FiBook, FiMap, FiMoon, FiSettings, FiSun, FiUser } from "react-icons/fi";

interface SidebarProps {
    darkMode?: boolean;
    setDarkMode?: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode, setDarkMode }) => {
    const Links = [
        { name: "Dashboard", icon: <MdDashboard />, path: "/" },
        { name: "Mind-Map", icon: <FiMap />, path: "/projects" },
        { name: "Notebooks", icon: <FiBook />, path: "/notebooks" },
        { name: "Profile", icon: <FiUser />, path: "/profile" },
        { name: "Settings", icon: <FiSettings />, path: "/settings" },
    ];
    const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <>
    <div className="h-screen w-15 fixed left-0  group ">f</div> 
    <div
      className={`sidebar md:flex hidden py-10 ${darkMode ? 'bg-black' : 'bg-white text-black'} flex flex-col justify-between fixed left-1 shadow-md rounded-full top-0 h-full z-10 p-4 transition-all duration-50 ${expanded ? "w-[20rem]" : "w-[5rem]"}`}
      onMouseEnter={() => setExpanded(false)}
      onMouseLeave={() => setExpanded(false)}
    >
        <div className="flex gap-3">
            <div className={`font-bold text-xl mb-4 h-fit w-fit p-2 px-3 rounded-full ${darkMode ? "bg-[#212842] border-1 border-white" : "bg-[#F0E7D5] border-1 border-black"}`}>
                {getInitials(user.name)}
            </div>
            <div className={`flex flex-col gap-1 text-left ${expanded ? 'block' : 'hidden'}`}>
                <span className="text-sm font-semibold">{user.name}</span>
                <span className="text-xs">{user.emailID}</span>
            </div>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center text-nowrap">
            {Links.map((link) => (
                <Link 
                    key={link.name}
                    to={link.path}
                    className={`flex items-center gap-3 p-2 px-3 rounded-full w-full hover:bg-gray-300 transition-colors ${darkMode ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-200'}`}
                >
                    <span className="text-xl">{link.icon}</span>
                    <span className={`text-md ${expanded ? 'block' : 'hidden'}`}>{link.name}</span>
                </Link>
            ))}
        </div>
        <div >
            <button
                onClick={() => setDarkMode && setDarkMode(!darkMode)}
                className={`w-full p-2 px-3 rounded-full ${darkMode ? 'bg-amber-500 shadow-zinc-700 text-white' : 'bg-zinc-800 shadow-zinc-800 text-white'} flex flex-nowrap items-center gap-3 justify-center p-3 transition-colors text-nowrap shadow-md `}
            >
                {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
                <span className={`text-md ${expanded ? 'block' : 'hidden'}`}>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
        </div>
    </div>
    </>
  )
}

export default Sidebar