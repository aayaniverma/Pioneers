"use client";
import type { Metadata } from "next";
import { SidebarProvider, useSidebar } from './context/SidebarContext';
import { Inter } from "next/font/google";
import './globals.css';
import Sidebar from '../components/Sidebar';


const MainContent = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useSidebar(); // Access the sidebar state
  
  return (
    <main className={`transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'} flex-grow p-6`}>
      {children}
    </main>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>

<body>
        <SidebarProvider>
          <div className="flex">
            {/* Sidebar remains constant */}
            <Sidebar />

            {/* Main content which shifts based on sidebar's state */}
            <MainContent>
              {children}
            </MainContent>
          </div>
        </SidebarProvider>
      </body>
    </html>
    
  );
}

