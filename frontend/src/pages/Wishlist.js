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
            {wishlist.map(({ _id, productId }) => (
              <div key={_id} className="bg-white rounded-lg shadow-md p-4">
                <div className="w-full aspect-square overflow-hidden rounded-lg mb-4">
                  <img
                    src={
                      productId?.images?.[0] ||
                      'https://via.placeholder.com/400?text=No+Image'
                    }
                    alt={productId?.name || 'Product'}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        'https://via.placeholder.com/400?text=No+Image';
                    }}
                  />
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">{productId?.name}</h3>
                <p className="text-pink-600 font-bold mb-4">₹{productId?.price}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(productId?._id)}
                    className="flex-1 bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(_id)}
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
