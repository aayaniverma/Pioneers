"use client";
import { useState } from 'react';

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I assist you today?', sender: 'bot' },
    { id: 2, text: 'I need some information about your services.', sender: 'user' },
  ]);

  return (
    <div className="h-96 overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-2 my-2 rounded-lg ${
            message.sender === 'bot' ? 'bg-blue-100 text-left' : 'bg-green-100 text-right'
          }`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
}
