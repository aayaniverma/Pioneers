"use client"; 
import { useState } from 'react';

export default function MessageInput() {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      // Handle sending the message here (e.g., API call)
      console.log('Sending message:', inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        className="flex-grow border border-gray-300 rounded-lg p-2"
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        className="ml-4 bg-blue-600 text-white rounded-lg px-4 py-2"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}
