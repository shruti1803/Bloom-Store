import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function WishlistPage() {
  const { wishlist, fetchWishlist, removeFromWishlist, addToCart } = useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authAPI.getCurrentUser();
    if (!user) {
      alert('Please login to view wishlist');
      navigate('/login');
      return;
    }
    fetchWishlist();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Wishlist</h1>
        
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-600">
            <div className="text-5xl mb-4">❤️</div>
            <p className="text-lg">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishlist.map(item => (
              <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
                <img src={item.productId?.image} alt={item.productId?.name} className="w-full h-40 object-cover rounded mb-4" />
                <h3 className="font-bold text-lg mb-2">{item.productId?.name}</h3>
                <p className="text-pink-600 font-bold mb-4">₹{item.productId?.price}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(item.productId?._id)}
                    className="flex-1 bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}