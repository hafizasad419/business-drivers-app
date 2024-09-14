import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { BellAlertIcon, BriefcaseIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { LogOutIcon, MessageSquareIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { getCurrentUser } from '../../utils/getCurrentUser';

const Header = () => {

  const freelancer = getCurrentUser();
  return (
    <header className="bg-[#006989] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Business Drivers</h1>
        <nav className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-white">
            <MessageSquareIcon className="w-5 h-5" />
            <span>Messages</span>
          </button>
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center text-white">
              <img src={freelancer?.avatar} alt="Your Avatar" className="w-8 h-8 rounded-full mr-2" />
              {freelancer?.fullName ||"Your Account"}
              <ChevronDownIcon className="w-4 h-4 ml-2" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <Menu.Item>
                  {({ active }) => (
                    <NavLink to="/dashboard/profile" className={`${active ? 'bg-orange text-white' : 'text-gray-900'} flex w-full items-center px-4 py-2 text-sm`}>
                      <UserIcon className="w-5 h-5 mr-2" />
                      Profile
                    </NavLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button className={`${active ? 'bg-orange text-white' : 'text-gray-900'} flex w-full items-center px-4 py-2 text-sm`}>
                      <LogOutIcon className="w-5 h-5 mr-2" />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </nav>
      </div>
    </header>
  )
};

const Sidebar = () => (
  <aside className="w-64 mr-8 py-8 px-8">
    <nav className="space-y-2">
      <NavLink
        to="/dashboard"
        className={({ isActive }) => `w-full flex justify-start px-4 py-2 rounded-md ${!isActive ? 'bg-orange text-white' : 'bg-transparent text-black'}`}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/dashboard/profile"
        className={({ isActive }) => `w-full flex justify-start px-4 py-2 rounded-md ${isActive ? 'bg-orange text-white' : 'bg-transparent text-black'}`}
      >
        <UserIcon className="w-5 h-5 mr-2" />
        My Profile
      </NavLink>
      <NavLink
        to="/dashboard/jobs"
        className={({ isActive }) => `w-full flex justify-start px-4 py-2 rounded-md ${isActive ? 'bg-orange text-white' : 'bg-transparent text-black'}`}
      >
        <BriefcaseIcon className="w-5 h-5 mr-2" />
        Job Offers
      </NavLink>

      <button className="w-full flex justify-start px-4 py-2 rounded-md text-[#D0021B]">
        <LogOutIcon className="w-5 h-5 mr-2" />
        Logout
      </button>
    </nav>
  </aside>
);

export default function FreelancerDashboard() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {/* Render page content based on the route */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
