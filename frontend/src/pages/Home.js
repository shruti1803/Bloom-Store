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

      
        {/* How It Works Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">How Bloom Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-teal-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">Browse</h3>
              <p className="text-gray-600">Explore a collection of handpicked pieces, personally curated by me.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-teal-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-4xl">💳</span>
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">Select & Pay</h3>
              <p className="text-gray-600">Add items to cart and checkout securely with multiple payment options</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-teal-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-4xl">📦</span>
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">Ship</h3>
              <p className="text-gray-600">We carefully package and ship your order across India</p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-teal-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-4xl">😊</span>
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">Enjoy</h3>
              <p className="text-gray-600">Receive your sustainable fashion and join our happy community!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-pink-400 to-teal-300 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">Bloom by the Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat 1 - Orders */}
            <div className="bg-white bg-opacity-20 backdrop-blur rounded-2xl p-8 text-center shadow-lg border border-white border-opacity-30">
              <div className="text-5xl font-bold text-white mb-2 drop-shadow-lg">500+</div>
              <p className="text-xl text-white font-semibold drop-shadow-md">Orders Shipped Across India</p>
              <p className="text-white text-opacity-90 mt-2">Happy customers from every corner of India</p>
            </div>

            {/* Stat 2 - Instagram */}
            <div className="bg-white bg-opacity-20 backdrop-blur rounded-2xl p-8 text-center shadow-lg border border-white border-opacity-30">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Instagram size={40} className="text-white drop-shadow-lg" />
              </div>
              <div className="text-5xl font-bold text-white mb-2 drop-shadow-lg">2K+</div>
              <p className="text-xl text-white font-semibold drop-shadow-md">Instagram Followers</p>
              <p className="text-white text-opacity-90 mt-2">Join our thriving fashion community</p>
            </div>

            {/* Stat 3 - Sellers */}
             <div className="bg-white bg-opacity-20 backdrop-blur rounded-2xl p-8 text-center shadow-lg border border-white border-opacity-30">
              <div className="text-5xl font-bold text-white mb-2 drop-shadow-lg">1</div>
            <p className="text-xl text-white font-semibold drop-shadow-md">One Seller</p>
            <p className="text-white text-opacity-90 mt-2">Every item is uniquely handpicked by a single seller.</p>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🌸</span>
                </div>
                <span className="text-2xl font-bold">Bloom</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your destination for sustainable, stylish thrift shopping across India.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-pink-400 transition">Shop</a></li>
                <li><a href="#" className="hover:text-pink-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-pink-400 transition">How It Works</a></li>
                <li><a href="#" className="hover:text-pink-400 transition">Sell With Us</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-pink-400 transition">FAQ</a></li>
                <li><a href="#" className="hover:text-pink-400 transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-pink-400 transition">Returns</a></li>
                <li><a href="#" className="hover:text-pink-400 transition">Shipping Info</a></li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Mail size={18} className="text-pink-400" />
                  <span>contact@bloom.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Phone size={18} className="text-pink-400" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin size={18} className="text-pink-400" />
                  <span>Bangalore, India</span>
                </div>

                {/* Instagram Link */}
                <div className="pt-2">
                  <a 
                    href="https://www.instagram.com/bloomagain_thrift/"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded-full text-white font-semibold hover:shadow-lg transition"
                  >
                    <Instagram size={20} />
                    Follow Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <p>&copy; 2024 Bloom. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-pink-400 transition">Privacy Policy</a>
                <a href="#" className="hover:text-pink-400 transition">Terms of Service</a>
                <a href="#" className="hover:text-pink-400 transition">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
