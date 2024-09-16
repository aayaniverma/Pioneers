"use client";
import { useState, useRef } from 'react';

export default function ChatComponent() {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [lastBotResponse, setLastBotResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const recognitionRef = useRef<null | any>(null);
  
  // Function to handle sending the message
  const sendMessage = () => {
    if (isSending) return;
    setIsSending(true);

    // Post the user message and get a response from the backend
    fetch('/Chat/GetResponseFromPdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMessage }),
    })
      .then(response => response.json())
      .then(data => {
        setChatHistory((prev) => [
          ...prev,
          `User: ${userMessage}`,
          `Chatbot: ${data.response}`,
        ]);
        setLastBotResponse(data.response);
        setIsSending(false);
      })
      .catch(() => {
        setIsSending(false);
      });

    // Clear input after sending
    setUserMessage('');
  };

  // Function to start speech recognition
  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Sorry, your browser doesn't support speech recognition.");
      return;
    }

    // Initialize recognition
    recognitionRef.current = new (window as any).webkitSpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      document.getElementById('micIndicator')!.style.display = 'block';
    };

    recognitionRef.current.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setUserMessage(transcript);
    };

    recognitionRef.current.onend = () => {
      document.getElementById('micIndicator')!.style.display = 'none';
      sendMessage(); // Send the message after recognition ends
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error: " + event.error);
      document.getElementById('micIndicator')!.style.display = 'none';
    };

    recognitionRef.current.start();
  };

  // Function to stop speech recognition manually
  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      document.getElementById('micIndicator')!.style.display = 'none';
    }
  };

  // Function to trigger text-to-speech for the last chatbot response
  const speakResponse = () => {
    if (isSpeaking || !lastBotResponse) return;

    const utterance = new SpeechSynthesisUtterance(lastBotResponse);
    utterance.lang = 'en-US';
    setIsSpeaking(true);

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <div id="chatBox">
        {chatHistory.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <input
        type="text"
        id="userMessage"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button id="sendButton" onClick={sendMessage} disabled={isSending}>
        Send
      </button>
      <button onClick={startSpeechRecognition}>Speak</button> {/* Speech-to-text button */}
      <button onClick={speakResponse}>Play Response</button> {/* Text-to-speech button */}
      <div id="micIndicator" style={{ display: 'none' }}>
        <p>🎤 Microphone is recording...</p>
      </div>
    </div>
  );
}
