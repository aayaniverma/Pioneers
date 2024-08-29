"use client";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';



export default function Chatbot() {
  const words = 'Car Broke Down? Consult us before you do too!!';
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="text-white p-4 shadow-md" style={{ backgroundColor: '#AFEEEE',opacity: '0.5'}}>
        {/* Render the TextGenerateEffect component in the header */}
        <TextGenerateEffect words={words} />
      </header>

      <main className="flex-grow p-6">
      <div className="flex justify-center mb-6">
      <button className="btn">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
  Fuel Car
</button>
<button className="btn">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
  Button
</button>
      </div>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4">
          <ChatWindow />
        </div>
      </main>

      <footer className="p-4 bg-white shadow-inner">
        <MessageInput />
      </footer>
    </div>
    
  );
  
  
}
