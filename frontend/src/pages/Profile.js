import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { User, MapPin, Phone, Mail, Package, Settings, LogOut, Edit2, Save, X } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Form data for editing
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  useEffect(() => {
    // Get current user data
    const currentUser = authAPI.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    setUser(currentUser);
    setFormData({
      fullName: currentUser.fullName || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      address: currentUser.address || '',
      city: currentUser.city || '',
      state: currentUser.state || '',
      zipCode: currentUser.zipCode || ''
    });
    setLoading(false);
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      // Here you would call your API to update user profile
      // await authAPI.updateProfile(formData);
      
      // Update local user data
      const updatedUser = { ...user, ...formData };
      setUser(updatedUser);
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  const handleCancelEdit = () => {
    // Reset form data to current user data
    setFormData({
      fullName: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      state: user.state || '',
      zipCode: user.zipCode || ''
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6">
              {/* Profile Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-white">
                  {user.fullName?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>

              {/* User Info */}
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{user.fullName}</h1>
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <Mail size={16} />
                  {user.email}
                </p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  user.role === 'admin' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-pink-100 text-pink-700'
                }`}>
                  {user.role === 'admin' ? '👑 Admin' : '🌸 Customer'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {user.role === 'admin' && (
                <button
                  onClick={() => navigate('/admin')}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                >
                  <Settings size={18} />
                  Admin Panel
                </button>
              )}
              <button
                onClick={() => navigate('/orders')}
                className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                <Package size={18} />
                My Orders
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-6 py-4 font-semibold transition ${
                  activeTab === 'profile'
                    ? 'bg-pink-50 text-pink-600 border-b-2 border-pink-500'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <User className="inline mr-2" size={20} />
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 px-6 py-4 font-semibold transition ${
                  activeTab === 'settings'
                    ? 'bg-pink-50 text-pink-600 border-b-2 border-pink-500'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings className="inline mr-2" size={20} />
                Account Settings
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Profile Information Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                    >
                      <Edit2 size={18} />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      >
                        <Save size={18} />
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                      >
                        <X size={18} />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="+1 (555) 123-4567"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="New York"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="NY"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Zip Code */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="10001"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows="3"
                    placeholder="123 Main Street, Apt 4B"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            )}

            {/* Account Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => navigate('/orders')}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-pink-500 hover:shadow-lg transition text-left"
                  >
                    <Package className="text-pink-500 mb-3" size={32} />
                    <h3 className="font-bold text-gray-800 text-lg mb-2">Order History</h3>
                    <p className="text-gray-600 text-sm">View and track your orders</p>
                  </button>

                  <button
                    onClick={() => navigate('/wishlist')}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-pink-500 hover:shadow-lg transition text-left"
                  >
                    <svg className="text-pink-500 mb-3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <h3 className="font-bold text-gray-800 text-lg mb-2">My Wishlist</h3>
                    <p className="text-gray-600 text-sm">Saved items and favorites</p>
                  </button>

                  <button
                    onClick={() => navigate('/cart')}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-pink-500 hover:shadow-lg transition text-left"
                  >
                    <svg className="text-pink-500 mb-3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <h3 className="font-bold text-gray-800 text-lg mb-2">Shopping Cart</h3>
                    <p className="text-gray-600 text-sm">View items in your cart</p>
                  </button>

                  {user.role === 'admin' && (
                    <button
                      onClick={() => navigate('/admin')}
                      className="p-6 border-2 border-purple-200 bg-purple-50 rounded-xl hover:border-purple-500 hover:shadow-lg transition text-left"
                    >
                      <Settings className="text-purple-500 mb-3" size={32} />
                      <h3 className="font-bold text-gray-800 text-lg mb-2">Admin Dashboard</h3>
                      <p className="text-gray-600 text-sm">Manage products and orders</p>
                    </button>
                  )}
                </div>

                {/* Danger Zone */}
                <div className="mt-8 p-6 border-2 border-red-200 bg-red-50 rounded-xl">
                  <h3 className="font-bold text-red-800 text-lg mb-4">Danger Zone</h3>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to logout?')) {
                        authAPI.logout();
                        navigate('/login');
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
                  >
                    <LogOut size={20} />
                    Logout from Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}