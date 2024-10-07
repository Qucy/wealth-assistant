'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaTachometerAlt, FaAddressBook, FaCalendar, FaCog, FaSignOutAlt, FaUser, FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';


export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { path: '/home', icon: FaHome, label: 'Home' },
    { path: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/contacts', icon: FaAddressBook, label: 'Clients' },
    { path: '/calendar', icon: FaCalendar, label: 'Calendar' },
    { path: '/settings', icon: FaCog, label: 'Settings' },
  ];

  // Hardcoded user name for demonstration
  const userName = "Josh Wang";

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Menu */}
      <div className="bg-white text-black shadow-md w-full">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center flex-grow">
            <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 mr-4">
              <img src="/avatars/6.jpg" alt="Josh Wang" className="w-8 h-8 rounded-full mr-2" />
              <span className="font-semibold mr-2 text-black">{userName}</span>
              <Link 
                href="/" 
                className="ml-2 text-gray-500 hover:text-black transition duration-300"
              >
                <FaSignOutAlt className="text-lg" />
              </Link>
            </div>
            <nav className="flex flex-wrap">
              {menuItems.map((item) => (
                <Link 
                  key={item.path}
                  href={item.path} 
                  className={`px-3 py-2 mr-2 transition duration-300 flex items-center rounded-full ${
                    pathname === item.path
                      ? 'font-bold text-black'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <item.icon className={`mr-2 text-lg ${pathname === item.path ? 'text-black' : 'text-gray-500'}`} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="relative ml-4 w-90">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Gray Divider */}
      <div className="flex justify-center w-full">
        <div className="h-px bg-gray-300 w-[90%]"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-white w-full">
        <div className="p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}