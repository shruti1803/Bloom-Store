import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cart, fetchCart, removeFromCart } = useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authAPI.getCurrentUser();
    if (!user) {
      alert('Please login to view cart');
      navigate('/login');
      return;
    }
    fetchCart();
  }, []);

  const total = cart.reduce((sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-600">
            <div className="text-5xl mb-4">🛍️</div>
            <p className="text-lg">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cart.map(item => (
                <div key={item._id} className="bg-white rounded-lg shadow-md p-4 flex gap-4">
                  <img src={item.productId?.image} alt={item.productId?.name} className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.productId?.name}</h3>
                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                    <p className="text-pink-600 font-bold">₹{item.productId?.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 h-fit"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-2xl font-bold text-pink-600">₹{total}</span>
              </div>
              <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-bold">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}