'use client'
import { useState } from "react";
import { fitZoneApi } from "@/api/rutaApi";

// Define el tipo de las props, incluyendo onClose
interface ChatModalProps {
  onClose: () => void;
}

interface Message {
  sender: "bot" | "user";
  text: string;
}

export default function ChatModal({ onClose }: ChatModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStartMessage = async () => {
    try {
      const response = await fetch(`${fitZoneApi}/chatbot/start`);
      if (response.ok) {
        const data = await response.text();
        setMessages([{ sender: "bot", text: data }]); 
      } else {
        setMessages([{ sender: "bot", text: "Failed to fetch start message" }]);
      }
    } catch (error) {
      console.error("Error connecting to chatbot backend:", error);
      setMessages([{ sender: "bot", text: "Failed to connect to chatbot service" }]);
    }
  };

  const toggleModal = () => {
    if (!isOpen) {
      fetchStartMessage(); 
    }
    setIsOpen(!isOpen);
  };


  const sendMessage = async (option: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${fitZoneApi}/chatbot/response/?option=${option}`);
      if (response.ok) {
        const data = await response.text();
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "user", text: option.toString() },
          { sender: "bot", text: data },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "Failed to fetch bot response" },
        ]);
      }
    } catch (error) {
      console.error("Error connecting to chatbot backend:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Failed to connect to chatbot service" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={toggleModal} className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-full hover:bg-red-700">
        Chat
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-stone-900 text-white w-80 p-4 rounded-lg shadow-lg m-5">
            <button onClick={onClose} className="text-red-500 float-right text-3xl">×</button>
            <h2 className="text-lg font-semibold mb-4">Chatbot</h2>
            <div className="overflow-y-auto max-h-64 mb-4">
              {messages.map((message, index) => (
                <div key={index} className={`mb-2 ${message.sender === "bot" ? "text-white" : "text-white"}`}>
                  <span className="font-semibold">{message.sender === "bot" ? "Bot" : "You"}:</span> {message.text}
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <button onClick={() => sendMessage(1)} className="bg-red-500 p-2 rounded text-white hover:bg-red-700">1</button>
              <button onClick={() => sendMessage(2)} className="bg-red-500 p-2 rounded text-white hover:bg-red-700">2</button>
              <button onClick={() => sendMessage(3)} className="bg-red-500 p-2 rounded text-white hover:bg-red-700">3</button>
              <button onClick={() => sendMessage(4)} className="bg-red-500 p-2 rounded text-white hover:bg-red-700">End</button>
            </div>
            {loading && <p className="text-red-500 mt-2">Loading...</p>}
          </div>
        </div>
      )}
    </>
  );
}
