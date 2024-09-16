"use client";

import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import Link from 'next/link';

export default function Chatbot() {
  const words = 'Car Broke Down? Consult us before you do too!!';

  return (
    
    <div className= 'ml-20  min-h-screen  flex flex-col'>
      <header
        className="text-white p-4 shadow-md fixed top-0 w-full z-50"
        style={{ backgroundColor: 'white' }}
      >
        {/* Render the TextGenerateEffect component in the header */}
        <TextGenerateEffect words={words} />
      </header>
      <main className="flex-grow p-6 mt-16">
      <div className="flex justify-center mb-6">
      <div className="grid grid-cols-2 gap-20">
      <Link href="/fuel">
  <button className="btn">
    <span className="material-symbols-rounded" style={{ fontSize: '50px'}}>directions_car</span><br></br>
    Fuel Car Dashboard Icons
  </button></Link>
  <Link href="/ev">
  <button className="btn">
    <span className="material-symbols-rounded " style={{ fontSize: '50px'}}>electric_car</span><br></br>
    EV Car Dashboard Icons
  </button></Link>
</div>


      </div>
        <div className="max-w-2xl mx-auto bg-black rounded-lg shadow-lg p-4">
          <ChatWindow />
        </div>
      </main>

      <footer className="p-4 bg-black shadow-inner">
        <MessageInput />
      </footer>
    </div>
    
  );
  
  
}
