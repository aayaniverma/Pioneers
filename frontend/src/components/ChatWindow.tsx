// components/ChatWindow.tsx
import { useState, useRef } from 'react';
import styles from './ChatComponent.module.css'; 

interface ChatWindowProps {
  onSending: () => void; // Define the type for the prop
}

export default function ChatWindow({ onSending }: ChatWindowProps) {
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

    fetch('/Chat/GetResponseFromPdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        setChatHistory((prev) => [
          ...prev,
          `User: ${userMessage}`,
          `Chatbot: ${data.response}`,
        ]);
        setLastBotResponse(data.response);
        setIsSending(false);
        onSending(); // Call the onSending function passed from the parent
      })
      .catch(() => {
        setIsSending(false);
      });

    setUserMessage('');
  };

  // Function to start speech recognition
  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Sorry, your browser doesn't support speech recognition.");
      return;
    }

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
      sendMessage();
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error: " + event.error);
      document.getElementById('micIndicator')!.style.display = 'none';
    };

    recognitionRef.current.start();
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      document.getElementById('micIndicator')!.style.display = 'none';
    }
  };

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
      <div className={styles.inputContainer}>
        <input
          className="input input-bordered input-accent w-full bg-black"
          type="text"
          id="userMessage"
          value={userMessage}
          onChange={(e) => {
            setUserMessage(e.target.value);
          }}
          placeholder="Type your message here..."
        />
        <div className={styles.buttonContainer}>
          <button className={`btn btn-circle btn-outline btn-accent ${styles.button}`} id="sendButton" onClick={sendMessage} disabled={isSending}>
            <span className="material-symbols-rounded" style={{ fontSize: '30px' }}>send</span>
          </button>
          <button className={`btn btn-circle btn-outline btn-accent ${styles.button}`} onClick={startSpeechRecognition}><span className="material-symbols-rounded" style={{ fontSize: '30px' }}>mic</span></button>
          <button className={`btn btn-circle btn-outline btn-accent ${styles.button}`} onClick={speakResponse}><span className="material-symbols-rounded" style={{ fontSize: '30px' }}>brand_awareness</span></button>
        </div>
      </div>
      
      <div id="micIndicator" style={{ display: 'none' }}>
        <p>🎤 Microphone is recording...</p>
      </div>
    </div>
  );
}
