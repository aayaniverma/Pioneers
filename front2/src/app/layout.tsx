import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import Sidebar from '../components/Sidebar';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>

      <body>
        <div className="flex">
          {/* Sidebar that appears on all pages */}
          <Sidebar />

          {/* Main content area that changes based on route */}
          <main className="flex-grow p-7">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

