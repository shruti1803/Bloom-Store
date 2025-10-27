import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function LoginPage({ setIsLoggedIn, setUserRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await authAPI.login({ email, password });
      setIsLoggedIn(true);
      setUserRole(data.user.role);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-fixed"
      style={{backgroundImage: 'url("/images/login-bg.jpg")'}}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md backdrop-blur-sm">
        <div className="text-center mb-8">
          <img 
            src="/images/logo.png" 
            alt="Bloom Logo" 
            className="w-16 h-16 mx-auto mb-4 object-contain"
          />
          <h1 className="text-4xl font-bold text-gray-800">Bloom</h1>
          <p className="text-gray-600 text-sm mt-2">Welcome back to sustainable fashion</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 rounded-lg font-bold transition transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account? 
            <button 
              onClick={() => navigate('/signup')}
              className="text-pink-500 font-bold hover:text-pink-600 ml-1"
            >
              Sign up here
            </button>
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-6 border-2 border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}