import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { User, MapPin, Phone, Mail, Package, Heart, ShoppingCart, Settings, LogOut, Edit2, Save, X, Shield } from 'lucide-react';

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

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      authAPI.logout();
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl shadow-lg p-8 mb-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6">
              {/* Profile Avatar */}
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-pink-600">
                  {user.fullName?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>

              {/* User Info */}
              <div>
                <h1 className="text-3xl font-bold mb-1">{user.fullName}</h1>
                <p className="flex items-center gap-2 opacity-90">
                  <Mail size={16} />
                  {user.email}
                </p>
                <div className="mt-2">
                  {user.role === 'admin' ? (
                    <span className="inline-flex items-center gap-1 bg-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                      <Shield size={16} />
                      Administrator
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                      🌸 Member
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 flex-wrap">
              {user.role === 'admin' && (
                <button
                  onClick={() => navigate('/admin')}
                  className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 backdrop-blur rounded-lg hover:bg-opacity-30 transition font-semibold"
                >
                  <Settings size={18} />
                  <span className="hidden sm:inline">Admin Panel</span>
                </button>
              )}
              <button
                onClick={() => navigate('/orders')}
                className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 backdrop-blur rounded-lg hover:bg-opacity-30 transition font-semibold"
              >
                <Package size={18} />
                <span className="hidden sm:inline">My Orders</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'bg-pink-50 text-pink-600 border-b-2 border-pink-500'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <User size={20} />
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'bg-pink-50 text-pink-600 border-b-2 border-pink-500'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings size={20} />
                Quick Access
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
                      placeholder="+91 98765 43210"
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
                      placeholder="Mumbai"
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
                      placeholder="Maharashtra"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Zip Code */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pin Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="400001"
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
                    placeholder="123 Main Street, Apartment 4B"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            )}

            {/* Quick Access Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Access</h2>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    onClick={() => navigate('/orders')}
                    className="group p-6 border-2 border-gray-200 rounded-xl hover:border-pink-500 hover:shadow-lg transition text-left bg-white"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-500 transition">
                        <Package className="text-pink-500 group-hover:text-white transition" size={24} />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg">My Orders</h3>
                    </div>
                    <p className="text-gray-600 text-sm">View and track your orders</p>
                  </button>

                  <button
                    onClick={() => navigate('/wishlist')}
                    className="group p-6 border-2 border-gray-200 rounded-xl hover:border-pink-500 hover:shadow-lg transition text-left bg-white"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-500 transition">
                        <Heart className="text-pink-500 group-hover:text-white transition" size={24} />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg">Wishlist</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Saved items and favorites</p>
                  </button>

                  <button
                    onClick={() => navigate('/cart')}
                    className="group p-6 border-2 border-gray-200 rounded-xl hover:border-pink-500 hover:shadow-lg transition text-left bg-white"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-500 transition">
                        <ShoppingCart className="text-pink-500 group-hover:text-white transition" size={24} />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg">Shopping Cart</h3>
                    </div>
                    <p className="text-gray-600 text-sm">View items in your cart</p>
                  </button>

                  <button
                    onClick={() => navigate('/products')}
                    className="group p-6 border-2 border-gray-200 rounded-xl hover:border-pink-500 hover:shadow-lg transition text-left bg-white"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-500 transition">
                        <Package className="text-pink-500 group-hover:text-white transition" size={24} />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg">Browse Products</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Explore our collection</p>
                  </button>

                  {user.role === 'admin' && (
                    <>
                      <button
                        onClick={() => navigate('/admin')}
                        className="group p-6 border-2 border-purple-200 bg-purple-50 rounded-xl hover:border-purple-500 hover:shadow-lg transition text-left"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-500 transition">
                            <Settings className="text-purple-500 group-hover:text-white transition" size={24} />
                          </div>
                          <h3 className="font-bold text-gray-800 text-lg">Admin Panel</h3>
                        </div>
                        <p className="text-gray-600 text-sm">Manage products and inventory</p>
                      </button>

                      <button
                        onClick={() => navigate('/admin/orders')}
                        className="group p-6 border-2 border-purple-200 bg-purple-50 rounded-xl hover:border-purple-500 hover:shadow-lg transition text-left"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-500 transition">
                            <Package className="text-purple-500 group-hover:text-white transition" size={24} />
                          </div>
                          <h3 className="font-bold text-gray-800 text-lg">Manage Orders</h3>
                        </div>
                        <p className="text-gray-600 text-sm">Process customer orders</p>
                      </button>
                    </>
                  )}
                </div>

                {/* Account Stats */}
                <div className="mt-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-800 text-lg mb-4">Account Overview</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-pink-600">0</div>
                      <div className="text-sm text-gray-600">Total Orders</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-pink-600">0</div>
                      <div className="text-sm text-gray-600">Wishlist Items</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-pink-600">0</div>
                      <div className="text-sm text-gray-600">Cart Items</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-pink-600">₹0</div>
                      <div className="text-sm text-gray-600">Total Spent</div>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="mt-8 p-6 border-2 border-red-200 bg-red-50 rounded-xl">
                  <h3 className="font-bold text-red-800 text-lg mb-4">Account Actions</h3>
                  <button
                    onClick={handleLogout}
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