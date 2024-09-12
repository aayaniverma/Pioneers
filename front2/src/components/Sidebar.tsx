"use client"; // Ensure this component is treated as a Client Component

import { useState } from 'react';
import Link from 'next/link';
import { useSidebar } from '../app/context/SidebarContext';


export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <div className="fixed flex">
      <div className={`bg-gray-800 text-white h-screen p-5 pt-8 ${isOpen ? 'w-64' : 'w-20'} duration-300 relative flex flex-col`}>
        {/* Toggle button positioned at the top center */}
        <button
          onClick={toggleSidebar}
          className="fixed top-7 left-9 transform -translate-x-2/4 w-10 h-10 flex items-center justify-center rounded-full z-50 transition-transform duration-300 ease-in-out"
        >
          {/* Material icon for toggle */}
          <span className={`material-symbols-rounded transform duration-300 ease-in-out 
            ${isOpen ? 'rotate-90' : 'rotate-0'}`} style={{ fontSize: '50px' }}
          >
            {isOpen ? 'search_hands_free' : 'search_hands_free'}
          </span>
        </button>

        {/* Sidebar content */}
        <div className="flex flex-col mt-16">
          <div className="flex flex-col gap-4 mt-8">
            <button className="fixed flex items-center transition-all duration-300 ease-in-out">
              <span className="material-symbols-rounded" style={{ fontSize: '50px', transform: 'translateX(-8px)' }}>add</span>
              {isOpen && <span className="text-2xl ml-2">New Chat</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
