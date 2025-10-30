import React, { useState } from 'react';
import { X, Send } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! 👋 Welcome to Bloom. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Calls Gemini-based backend endpoint
  const getAIResponse = async (userMessage) => {
    try {
      const response = await fetch('/api/chatbot/chat', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Backend chatbot request failed');
      const data = await response.json();
      return data.response || "Sorry 💕 I couldn’t get that. Try again!";
    } catch (error) {
      console.error('Error contacting backend chatbot API:', error);
      return "Sorry 💕 I'm having a little trouble connecting right now. Try again or DM us on Instagram @BloomAgain_Thrift!";
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await getAIResponse(userMessage.text);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: botResponse, sender: 'bot' }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: "Oops 😅 something went wrong. Please try again!", sender: 'bot' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-6 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-96 h-[32rem] flex flex-col mb-4 border border-pink-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-teal-400 text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Hi, it’s Bloom 🌸</h3>
              <p className="text-xs opacity-90">Here to help you find your next favorite thrift 💕</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-pink-500 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-pink-200 rounded-bl-none shadow-sm'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-pink-200 px-4 py-2 rounded-lg rounded-bl-none shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-pink-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-full transition"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-40 h-48 focus:outline-none group"
      >
        <div className="relative w-40 h-48 hover:shadow-xl transition transform hover:scale-110">
          <img
            src={isHovered ? "/images/20251018_182947.png" : "/images/20251018_183007.png"}
            alt="Chat Assistant"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thought Cloud */}
        <div className="absolute -top-12 -right-8 bg-white rounded-3xl shadow-lg px-4 py-2 border-2 border-pink-300 whitespace-nowrap pointer-events-none group-hover:block hidden">
          <p className="text-xs font-semibold text-gray-700">How can I help you? 💕</p>
          <div className="absolute -bottom-2 left-4 w-3 h-3 bg-white rounded-full border-2 border-pink-300"></div>
          <div className="absolute -bottom-1 left-6 w-2 h-2 bg-white rounded-full border-2 border-pink-300"></div>
        </div>
      </button>
    </div>
  );
};

export default Chatbot;
