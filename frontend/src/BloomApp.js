import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { authAPI } from './services/api';

// Import pages
import Products from './pages/Products';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import AdminOrders from './pages/AdminOrders';

// Components
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';

export default function BloomApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authAPI.getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
      setUserRole(user.role);
    }
  }, []); // ✅ only check once, no navigate here

  const handleLogout = () => {
    authAPI.logout();
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/login');
  };

  return (
    <ProductProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userRole={userRole}
          onLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/admin"
            element={
              isLoggedIn && userRole === 'admin'
                ? <Admin />
                : <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
            }
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />}
          />
          <Route
            path="/signup"
            element={<Signup setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />}
          />
          <Route
            path="/Checkout"
            element={isLoggedIn ? <Checkout /> : <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />}
          />
          <Route path="/Order-Success/:orderId" element={<OrderSuccess />} />
          <Route
            path="/Orders"
            element={isLoggedIn ? <Orders /> : <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />}
          />
          <Route
            path="/Order/:orderId"
            element={isLoggedIn ? <OrderDetails /> : <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />}
          />
          <Route
            path="/Admin/orders"
            element={isLoggedIn && userRole === 'admin'
              ? <AdminOrders />
              : <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />}
          />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>

        <Chatbot />
      </div>
    </ProductProvider>
  );
}
