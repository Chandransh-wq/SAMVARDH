import React from 'react'
import { FiSearch, FiHome, FiLogOut, FiMoon, FiSun, FiBell, FiBook, FiUser } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface NavbarProps {
    darkMode?: boolean;
    setDarkMode?: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
    const navigate = useNavigate()
  return (
    <>
    {/* Navbar for big screens */}
        <div className={`hidden items-center gap-4 fixed top-0 left-0 justify-center p-4 w-screen shadow-md ${darkMode ? "dark text-white" : "primary-light text-black"} md:flex`}>
          <div className={`flex items-center gap-6 px-4 py-1 ${darkMode ? "bg-zinc-900" : "bg-white"} rounded-full shadow-lg`}>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${darkMode ? "border-zinc-700" : "border-gray-300"} transition-colors duration-300`}>
              <FiSearch size={18} />
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-transparent outline-none placeholder:text-gray-400 text-sm w-48"
              />
            </div>
            <div className={`h-auto w-auto border-2 ${darkMode ? "border-zinc-700" : "border-gray-300"} rounded-full p-2 cursor-pointer hover:bg-zinc-800 transition-colors duration-300`} 
            onClick={() => navigate('/')}>
            <FiHome size={20} className="rounded-full cursor-pointer  transition-colors duration-300 "/>
            </div>
            <div className={`h-auto w-auto border-2 ${darkMode ? "border-zinc-700" : "border-gray-300"} rounded-full p-2 cursor-pointer hover:bg-zinc-800 transition-colors duration-300`}>
            <FiBell size={20} className="rounded-full cursor-pointer transition-colors duration-300"/>
            </div>
            <div 
              className={`h-auto w-auto bg-red-600 border-red-600 text-white rounded-full p-2 border-2 cursor-pointer hover:bg-red-700 transition-colors duration-300`}
              onClick={()=>{
                localStorage.removeItem('token');
                navigate('/log')
                toast.success("Logged out Successfully")
              }}  
            >
                 
          <FiLogOut size={18} />
        </div>

          </div>
            <button
              onClick={() => setDarkMode && setDarkMode(!darkMode)}
              className={`ml-4 p-2 rounded-full border-2 border-gray-300 
                ${darkMode ? "bg-yellow-300 hover:bg-amber-200 text-black" : "bg-gray-50 hover:bg-gray-100 hover:text-black"} 
                hover:rotate-45 border-2 border-white hover:scale-110 transition-all duration-300 ease-in-out shadow-xl scale-105`}
            >
              {darkMode ? <FiSun size={18}/> : <FiMoon size={18}/>}
            </button>

        </div>
    {/* Navbar for small screens */}
        <div className={` shadow-top flex md:hidden items-center justify-around p-2 w-screen fixed bottom-0 left-0 rounded-t-2xl text-xs ${darkMode ? "dark text-white" : "light text-[#212842]"}`}>

          {/* Home */}
          <div
            className='flex flex-col items-center justify-center cursor-pointer p-2 transition-colors duration-200 hover:text-amber-500'
            onClick={() => navigate('/')}
          >
            <FiHome size={24} />
            <span className='text-sm mt-1'>Home</span>
          </div>

          {/* Library */}
          <div
            className='flex flex-col items-center justify-center cursor-pointer p-2 transition-colors duration-200 hover:text-amber-500'
            onClick={() => navigate('/library')}
          >
            <FiBook size={24} />
            <span className='text-sm mt-1'>Library</span>
          </div>

          {/* Floating Search */}
          <div className='flex flex-col items-center justify-center relative -mt-6'>
            <div className={`${darkMode ? "bg-[#6779b9] text-white border-zinc-800" : "bg-[#faebc9] text-black border-zinc-800"} p-5 rounded-full shadow-xl border-4 cursor-pointer hover:scale-110 transition-transform duration-300 relative bottom-4`}
                 onClick={() => navigate('/search')}>
              <FiSearch size={24} />
            </div>
          </div>

          {/* Profile */}
          <div
            className='flex flex-col items-center justify-center cursor-pointer p-2 transition-colors duration-200 hover:text-amber-500'
            onClick={() => navigate('/profile')}
          >
            <FiUser size={24} />
            <span className='text-sm mt-1'>Profile</span>
          </div>

          {/* Dark Mode Toggle */}
          <div
            className='flex flex-col items-center justify-center cursor-pointer p-2 transition-colors duration-200 hover:text-amber-500'
            onClick={() => setDarkMode && setDarkMode(!darkMode)}
          >
            {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
            <span className='text-sm mt-1'>{darkMode ? "Light" : "Dark"}</span>
          </div>

        </div>

    </>
  )
}

export default Navbar