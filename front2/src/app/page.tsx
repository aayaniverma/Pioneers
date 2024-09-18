"use client";
import { useState } from "react";
import  AnimationDemo  from "../components/ui/text-generate-effect";
import ChatWindow from '../components/ChatWindow';  // Import the updated ChatComponent
import Link from 'next/link';

export default function Chatbot() {
  const [areButtonsVisible, setAreButtonsVisible] = useState(true); // State for button visibility

  // Handle sending state
  const handleSending = () => {
    setAreButtonsVisible(false); // Hide buttons after sending
  };

  return (
    <div className='ml-20 min-h-screen flex flex-col'>
      <header className="shadow-md top-0"><AnimationDemo />
      </header>
      <main className="flex-grow p-6 mt-16">
        <div className="flex justify-center mb-6">
          {areButtonsVisible && (  // Only show buttons when visibility flag is true
            <div className="grid grid-cols-2 gap-20">
              <Link href="/fuel">
                <button className="btn btn-outline btn-primary h-20" style={{ fontSize: '19px' }}>
                  <span className="material-symbols-rounded" style={{ fontSize: '50px' }}>directions_car</span><br />
                  Fuel Car Dashboard Icons
                </button>
              </Link>
              <Link href="/ev">
                <button className="btn btn-outline btn-primary h-20" style={{ fontSize: '19px' }}>
                  <span className="material-symbols-rounded" style={{ fontSize: '50px' }}>electric_car</span><br />
                  EV Car Dashboard Icons
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <footer className="mb-10"><div className="max-w-2xl mx-auto  rounded-lg shadow-lg p-4">
          <ChatWindow onSending={handleSending} />  {/* Pass the sending handler */}
        </div></footer>
    </div>
  );
}