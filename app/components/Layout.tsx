'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaTachometerAlt, FaAddressBook, FaCalendar, FaCog, FaSignOutAlt } from 'react-icons/fa';
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
    { path: '/contacts', icon: FaAddressBook, label: 'Contacts' },
    { path: '/calendar', icon: FaCalendar, label: 'Calendar' },
    { path: '/settings', icon: FaCog, label: 'Settings' },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex h-screen">
      {/* Left Menu */}
      <div className="w-70 bg-white text-gray-800 shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-indigo-600">Wealth Assistant</h1>
        </div>
        <nav className="flex-grow py-6 px-4">
          {menuItems.map((item) => (
            <Link 
              key={item.path}
              href={item.path} 
              className={`block py-3 px-6 mb-3 transition duration-300 flex items-center rounded-full ${
                pathname === item.path
                  ? 'bg-gray-100 bg-opacity-75 font-bold text-black'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <item.icon className={`mr-3 text-xl ${pathname === item.path ? 'text-black' : 'text-gray-500'}`} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-gray-200">
          <Link 
            href="/" 
            className="block py-3 px-6 hover:bg-gray-50 transition duration-300 flex items-center text-gray-700 rounded-full"
          >
            <FaSignOutAlt className="mr-3 text-xl text-gray-500" /> 
            <span>Sign Out</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-100">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}