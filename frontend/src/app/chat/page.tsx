// app/chat/page.tsx
import { useState } from 'react';
import ChatWindow from '../../components/ChatWindow'; // Adjust the path if needed

export default function ChatPage() {
  const [areButtonsVisible, setAreButtonsVisible] = useState(true);

  // Handle sending state
  const handleSending = () => {
    setAreButtonsVisible(false); // Hide buttons after sending
  };

  return (
    <div className='ml-20 min-h-screen flex flex-col'>
      <header className="text-white p-4 shadow-md fixed top-0 w-full z-50" style={{ backgroundColor: 'white' }}>
        <h1>Chat Section</h1>
      </header>
      <main className="flex-grow p-6 mt-16">
        <div className="max-w-2xl mx-auto bg-black rounded-lg shadow-lg p-4">
          <ChatWindow onSending={handleSending} />  {/* Pass the sending handler */}
        </div>
      </main>
    </div>
  );
}
