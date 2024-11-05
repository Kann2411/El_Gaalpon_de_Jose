"use client";

import { useState, useEffect, useRef } from "react";
import { fitZoneApi } from "@/api/rutaApi";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatModalProps {
  onClose: () => void;
}

interface Message {
  sender: "bot" | "user";
  text: string;
  options?: string[];
}

export default function ChatModal({ onClose }: ChatModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const parseOptions = (
    text: string
  ): { message: string; options: string[] } => {
    const parts = text.split("\n");
    const message = parts[0];
    const options = parts
      .slice(1)
      .filter((part) => part.match(/^\d+\./))
      .map((part) => part.trim());
    return { message, options };
  };

  const fetchStartMessage = async () => {
    try {
      const response = await fetch(`${fitZoneApi}/chatbot/start`);
      if (response.ok) {
        const data = await response.text();
        const { message, options } = parseOptions(data);
        setMessages([
          {
            sender: "bot",
            text: "👋 " + message,
            options,
          },
        ]);
      } else {
        setMessages([
          {
            sender: "bot",
            text: "Hi! I'm having trouble connecting. Can you try again?",
          },
        ]);
      }
    } catch (error) {
      console.error("Error connecting to chatbot backend:", error);
      setMessages([
        {
          sender: "bot",
          text: "I'm experiencing technical difficulties. Please try again later!",
        },
      ]);
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
      const response = await fetch(
        `${fitZoneApi}/chatbot/response/?option=${option}`
      );
      if (response.ok) {
        const data = await response.text();
        const { message, options } = parseOptions(data);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "user", text: `Option ${option}` },
          {
            sender: "bot",
            text: message,
            options:
              options.length > 0
                ? options
                : [
                    "1. Information about us.",
                    "2. Establishment hours.",
                    "3. Membership inquiries.",
                    "4. End the conversation.",
                  ],
          },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "I couldn't process that. Let's try again!" },
        ]);
      }
    } catch (error) {
      console.error("Error connecting to chatbot backend:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Oops! Something went wrong. Let's try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (option: number) => {
    sendMessage(option);
  };

  const handleUserInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      const option = parseInt(userInput);
      if (option >= 1 && option <= 4) {
        sendMessage(option);
        setUserInput("");
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            text: "Please choose a valid option between 1 and 4.",
          },
        ]);
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <motion.button
        onClick={toggleModal}
        className="fixed bottom-6 right-6 bg-white text-white p-4 rounded-full hover:bg-red-700 hover:text-white transition-all duration-300 shadow-lg z-50 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bot className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-200" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[400px] bg-zinc-900 rounded-xl shadow-2xl overflow-hidden z-50 border border-zinc-800"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-red-600 p-4 text-white">
              <Avatar className="h-8 w-8 bg-white">
                <AvatarImage src="/robot-avatar.png" />
                <AvatarFallback>
                  <Bot className="w-5 h-5 text-red-600 group-hover:text-white transition-colors duration-200" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">FitZone Assistant</h2>
                <p className="text-xs text-red-100">Always here to help!</p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  setIsOpen(false);
                }}
                className="p-2 hover:bg-red-700 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[450px] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  className={`flex ${
                    message.sender === "bot" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div className="flex gap-3 max-w-[80%]">
                    {message.sender === "bot" && (
                      <Avatar className="h-8 w-8 bg-white">
                        <AvatarImage src="/robot-avatar.png" />
                        <AvatarFallback>
                          <Bot className="w-4 h-4 text-red-600" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex flex-col gap-2">
                      <div
                        className={`p-3 rounded-xl ${
                          message.sender === "bot"
                            ? "bg-zinc-800 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {message.text}
                      </div>
                      {message.options && (
                        <div className="flex flex-col gap-2 mt-2">
                          {message.options.map((option, idx) => {
                            const optionNumber = idx + 1;
                            return (
                              <button
                                key={idx}
                                onClick={() => handleOptionClick(optionNumber)}
                                className="text-left px-4 py-2 rounded-lg bg-zinc-800 hover:bg-red-600 transition-colors text-sm text-white border border-zinc-700"
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-zinc-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleUserInput}
              className="p-4 bg-zinc-800 flex items-center gap-2 border-t border-zinc-700"
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type 1-4 or click an option..."
                className="flex-1 bg-zinc-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 border border-zinc-700"
              />
              <button
                type="submit"
                className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
