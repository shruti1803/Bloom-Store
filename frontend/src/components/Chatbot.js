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

  const botResponses = {
    'hello': "Hi there! Welcome to Bloom, your favorite thrift store! How can I assist you?",
    'hi': "Hello! Great to see you! What can I help you with today?",
    'product': "We have a amazing collection of vintage clothing and accessories! Browse our Products section to see what's available.",
    'price': "Our items are competitively priced, starting from as low as 100 rupees! Check out our Products page for more details.",
    'shipping': "We ship across all of India! Standard shipping takes 3-7 business days. Track your order in your Profile section.",
    'return': "We don't accept returns since we are a small business. Sorry <3 But feel free to reach out if you have any issues! ",
    'discount': "Follow our Instagram for exclusive discounts and promotions! We offer seasonal sales and special deals.",
    'about': "Bloom is a sustainable thrift platform connecting buyers all across India. We believe in eco-friendly fashion!",
    'contact': "You can reach us at on our Instagram: @BloomAgain_Thrift. We're here to help!",
    'help': "I can help you with questions about products, shipping, returns, selling, pricing, or general info. What would you like to know?",
  };

  const getResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (let key in botResponses) {
      if (lowerMessage.includes(key)) {
        return botResponses[key];
      }
    }
    
    return "Thanks for your message! I'm here to help with questions about our products, shipping, returns, and more. Feel free to ask! 😊";
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const botResponse = getResponse(input);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="fixed bottom-0 right-6 z-40 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-96 h-96 flex flex-col mb-4 border border-pink-200 animate-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-teal-400 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Hi it's Bloom</h3>
              <p className="text-xs opacity-90">Always here to help 🌸</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-pink-500 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-pink-200 rounded-bl-none'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-pink-200 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                    <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
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
                disabled={isLoading}
                className="bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white p-2 rounded-full transition"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button - Image Widget with Thought Cloud */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-40 h-48 focus:outline-none group" // match image size
      >
        {/* Image - No circle */}
        <div className="relative w-40 h-48 hover:shadow-xl transition transform hover:scale-110">
          <img
            src={isHovered ? "/images/20251018_182947.png" : "/images/20251018_183007.png"}
            alt="Chat"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thought Cloud */}
        <div className="absolute -top-12 -right-8 bg-white rounded-3xl shadow-lg px-4 py-2 border-2 border-pink-300 whitespace-nowrap pointer-events-none group-hover:block hidden">
          <p className="text-xs font-semibold text-gray-700">How can I help you? 💕</p>
          {/* Cloud tail - connecting to image */}
          <div className="absolute -bottom-2 left-4 w-3 h-3 bg-white rounded-full border-2 border-pink-300"></div>
          <div className="absolute -bottom-1 left-6 w-2 h-2 bg-white rounded-full border-2 border-pink-300"></div>
        </div>
      </button>
    </div>
  );
};

export default Chatbot;