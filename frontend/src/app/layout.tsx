"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import Drawer from '../components/Drawer';
import { DrawerProvider, useDrawer } from './context/DrawerContext';

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useDrawer(); // Access the drawer state

  return (
    <main className={`transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'} flex-grow p-6`}>
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
        <DrawerProvider>
          <div className="flex">
            {/* Drawer remains constant */}
            <Drawer />

            {/* Main content which shifts based on drawer's state */}
            <MainContent>
              {children}
            </MainContent>
          </div>
        </DrawerProvider>
      </body>
    </html>
  );
}