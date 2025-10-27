import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, MapPin, Phone, Mail } from 'lucide-react';
import Chatbot from '../components/Chatbot';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* ✅ Navbar removed — it's already rendered in BloomApp */}

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/download (4).jpg")' }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>

        <div className="relative z-10 text-center px-4 pt-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            WELCOME 💕
          </h1>
          <p className="text-xl md:text-2xl text-white font-semibold mb-8 drop-shadow-md">
            To the next generation of<br />thrift & consignment shopping
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-bold text-lg transition transform hover:scale-105 shadow-lg"
          >
            Start Shopping
          </button>
        </div>
      </div>

      {/* About Bloom Section */}
      <div className="bg-gradient-to-b from-pink-400 to-pink-300 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl font-bold text-pink-600 mb-6">About Bloom</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              At Bloom Again, we bring you handpicked clothing and accessories with love and care.
              Started during the COVID pandemic as a personal Instagram store, each item is carefully
              selected to offer style, quality, and sustainability.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our customers enjoy unique, curated pieces that save money and reduce waste,
              supporting a more mindful and eco-friendly way to shop. Every item reflects our
              commitment to quality, personal touch, and thoughtful selection.
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-gradient-to-b from-pink-300 to-pink-200 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">
            What Our Customers Say
          </h2>

          {/* Marquee Container */}
          <div className="overflow-hidden">
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
              }
              .marquee {
                display: flex;
                animation: marquee 30s linear infinite;
                gap: 32px;
              }
              .marquee:hover {
                animation-play-state: paused;
              }
              .marquee-item {
                flex-shrink: 0;
                width: 350px;
              }
            `}</style>

            <div className="marquee">
              {[
                {
                  name: 'Priya M.',
                  img: '/images/WhatsApp Image 2025-10-15 at 23.41.41.jpeg',
                  text: 'Love the quality of items at Bloom! Found amazing vintage pieces at great prices. Shipping was super fast to Bangalore!',
                },
                {
                  name: 'Arjun K.',
                  img: '/images/WhatsApp Image 2025-10-15 at 23.41.33 (2).jpeg',
                  text: 'Excellent service! The support team is so helpful. Got my order delivered to Delhi in just 3 days. Highly recommend!',
                },
                {
                  name: 'Sneha R.',
                  img: '/images/WhatsApp Image 2025-10-15 at 23.41.33.jpeg',
                  text: 'As a sustainable fashion enthusiast, I love Bloom! Great prices and eco-friendly shopping. My Mumbai order arrived perfectly!',
                },
              ].map((review, idx) => (
                <div
                  key={idx}
                  className="marquee-item bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={review.img}
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-800">{review.name}</h3>
                      <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-white text-sm mt-8 drop-shadow-md">Hover to pause</p>
          </div>
        </div>
      </div>

      {/* Rest of your sections remain unchanged */}
      <Chatbot />
    </div>
  );
};

export default HomePage;
