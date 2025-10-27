import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Package, Heart, ShoppingCart, User, LogOut, LogIn } from 'lucide-react';

const Navbar = ({ isLoggedIn, userRole, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnHome = location.pathname === '/';
  const currentPage = location.pathname; // ✅ Fix for currentPage undefined

  // Define nav background style
  const navBgClass = isOnHome
    ? 'fixed top-0 left-0 right-0 bg-transparent'
    : 'sticky top-0 bg-white shadow-md';

  // Define navigation items
  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Products', icon: Package, path: '/products' },
    { label: 'Wishlist', icon: Heart, path: '/wishlist' },
    { label: 'Cart', icon: ShoppingCart, path: '/cart' },
  ];

  return (
    <nav className={`${navBgClass} z-50 px-4 sm:px-6 lg:px-8 py-4`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          onClick={() => navigate('/')}
        >
          <img
            src="/images/logo.png"
            alt="Bloom Logo"
            className="w-12 h-12 object-contain"
          />
          <span
            className={`text-2xl font-bold ${
              isOnHome ? 'text-white' : 'text-pink-600'
            } hidden sm:inline drop-shadow-lg`}
          >
            Bloom
          </span>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-6 sm:gap-8 flex-wrap justify-center flex-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 font-semibold transition-all pb-1 border-b-2 ${
                currentPage === item.path
                  ? isOnHome
                    ? 'text-white border-white drop-shadow-lg'
                    : 'text-pink-600 border-pink-600'
                  : isOnHome
                  ? 'text-white border-transparent hover:border-pink-200 hover:text-pink-100 drop-shadow-md'
                  : 'text-gray-800 border-transparent hover:border-pink-500 hover:text-pink-600'
              }`}
            >
              <item.icon size={20} />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {/* Profile */}
              <button
                onClick={() => navigate('/profile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition ${
                  isOnHome
                    ? 'bg-white bg-opacity-20 backdrop-blur border border-white border-opacity-30 text-white hover:bg-opacity-30 drop-shadow-lg'
                    : 'bg-pink-500 text-white hover:bg-pink-600'
                }`}
              >
                <User size={20} />
                <span className="hidden sm:inline">Profile</span>
              </button>

              {/* Admin */}
              {userRole === 'admin' && (
                <button
                  onClick={() => navigate('/admin')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full font-semibold text-white transition ${
                    isOnHome
                      ? 'bg-pink-600 hover:bg-pink-700 drop-shadow-lg'
                      : 'bg-pink-600 hover:bg-pink-700'
                  }`}
                >
                  <span className="hidden sm:inline">Admin</span>
                  <span className="sm:hidden">⚙️</span>
                </button>
              )}

              {/* Logout */}
              <button
                onClick={onLogout}
                className={`flex items-center gap-2 transition ${
                  isOnHome
                    ? 'text-white hover:text-pink-200 drop-shadow-md'
                    : 'text-gray-800 hover:text-pink-600'
                }`}
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            // Login
            <button
              onClick={() => navigate('/login')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition ${
                isOnHome
                  ? 'bg-white bg-opacity-20 backdrop-blur border border-white border-opacity-30 text-white hover:bg-opacity-30 drop-shadow-lg'
                  : 'bg-pink-500 text-white hover:bg-pink-600'
              }`}
            >
              <LogIn size={20} />
              <span className="hidden sm:inline">Login</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
