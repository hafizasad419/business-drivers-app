import React, { useState, useRef, useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBriefcase, FaUser, FaSignOutAlt, FaChevronDown } from 'react-icons/fa'
import { RiMessage2Line } from 'react-icons/ri'
import { getCurrentUser } from '../../utils/getCurrentUser'
import { useLogout } from '../../utils/logoutFreelancer'
import mainLogo from "../../assets/Logos/main-logo.webp";


const Header = () => {
  const { handleLogout } = useLogout();

  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const freelancer = getCurrentUser()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="bg-lightBlue text-white px-8 py-2">
      <div className="flex flex-row justify-between items-center">
        {/* Logo */}
        <div className="logo w-[18vw] md:w-[8vw]">

          <img className='w-full scale-150' src={mainLogo} alt="Main Logo" />

        </div>
        <nav className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-white">
            <RiMessage2Line className="w-5 h-5" />
            <span className="hidden sm:inline">Messages</span>
          </button>
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                src={freelancer?.avatar || "/placeholder.svg?height=32&width=32"}
                alt="Your Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="hidden sm:inline">{freelancer?.fullName || "Your Account"}</span>
              <FaChevronDown className="w-4 h-4 ml-2" />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                >
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `${isActive ? 'bg-orange text-white' : 'text-gray-900 hover:bg-orange hover:text-white'
                      } flex w-full items-center px-4 py-2 text-sm transition-colors duration-200`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUser className="w-5 h-5 mr-2" />
                    Profile
                  </NavLink>
                  <button
                    className="text-gray-900 hover:bg-orange hover:text-white flex w-full items-center px-4 py-2 text-sm transition-colors duration-200"
                    onClick={() => {
                      setIsOpen(false)
                      handleLogout();
                    }}
                  >
                    <FaSignOutAlt className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>
    </header>
  )
}

const SidebarItem = ({ to, icon: Icon, children, exact = false }) => {
  const location = useLocation()
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to)

  return (
    <NavLink
      to={to}
      className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ease-in-out
        ${isActive ? 'bg-orange text-white' : 'bg-transparent text-darkBlue hover:bg-orange hover:text-white'}`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="ml-2">{children}</span>
    </NavLink>
  )
}

const Sidebar = () => {
  const isMobile = window.innerWidth < 640 // Adjust this breakpoint as needed
  const { handleLogout } = useLogout();


  return (
    <nav className="flex flex-row sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2 p-4 sm:p-8 overflow-x-auto sm:overflow-x-visible">
      <SidebarItem to="/dashboard" icon={FaBriefcase} exact={true}>Dashboard</SidebarItem>
      <SidebarItem to="/dashboard/jobs" icon={FaBriefcase}>Jobs</SidebarItem>
      {!isMobile && (
        <>
          <SidebarItem to="/dashboard/profile" icon={FaUser}>My Profile</SidebarItem>
          <button
            onClick={() => { handleLogout() }}
            className="flex items-center px-4 py-2 rounded-md text-[#D0021B] hover:bg-[#D0021B] hover:text-white transition-colors duration-200 ease-in-out">
            <FaSignOutAlt className="w-5 h-5 mr-2" />
            Logout
          </button>
        </>
      )}
    </nav>
  )
}

export default function FreelancerDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex flex-col sm:flex-row">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:w-64"
          >
            <Sidebar />
          </motion.div>
        </AnimatePresence>
        <main className="flex-1 p-4 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}