"use client";

import { useDrawer } from "../app/context/DrawerContext";

export default function Drawer() {
  const { isOpen, toggleDrawer } = useDrawer();

  return (
    <div>
      {/* Toggle button */}
      <button
        onClick={toggleDrawer}
        className="fixed top-7 left-11 text-white transform -translate-x-2/4 w-10 h-10 flex items-center justify-center rounded-full z-50 transition-transform duration-300 ease-in-out"
      >
        <span className={`material-symbols-rounded transform duration-300 ease-in-out 
            ${isOpen ? 'rotate-90' : 'rotate-0'}`} style={{ fontSize: '50px' }}
          >
            {isOpen ? 'search_hands_free' : 'search_hands_free'}
          </span>
      </button>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-5 pt-8 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "300px" }}
      >
        <div className="flex flex-col mt-16">
          <div className="flex flex-col gap-4 mt-5">
          <button className="flex items-center transition-all duration-300 ease-in-out">
            <span className="material-symbols-rounded" style={{ fontSize: "50px" }}>
              add
            </span>
            {isOpen && <span className="text-2xl ml-2">New Chat</span>}
          </button>
          {/* Add more menu items here */}
        </div>
      </div>
      </div>

    </div>
  );
}
