import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import { authAPI } from '../services/api';

export default function ProductsPage() {
  const { products, loading, fetchProducts, addToWishlist, addToCart } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts(selectedCategory === 'all' ? '' : selectedCategory);
    const user = authAPI.getCurrentUser();
    setIsLoggedIn(!!user);
  }, [selectedCategory]);

  const categories = ['all','dresses', 'jackets', 'shirts', 'tops', 'accessories','pants','skirts','shorts','kurtas'];

  const handleAddToWishlist = (productId) => {
    if (!isLoggedIn) {
      alert('Please login to add items to wishlist');
      return;
    }
    addToWishlist(productId);
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      alert('Please login to add items to cart');
      return;
    }
    addToCart(product._id);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 px-4 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Our Collection</h1>

        {/* Filter */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-800 border border-gray-300 hover:border-pink-500'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                {/* Image Gallery - Square */}
                <div className="relative w-full aspect-square bg-gray-100">
                  <img 
                    src={product.images?.[0] || 'https://via.placeholder.com/400'} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400?text=No+Image';
                    }}
                  />
                  {product.images?.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                      +{product.images.length - 1} more
                    </div>
                  )}
                  {product.quantity < 5 && product.quantity > 0 && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      Only {product.quantity} left!
                    </div>
                  )}
                  {product.quantity === 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      Out of Stock
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
                  {product.brand && (
                    <p className="text-sm text-gray-500 mb-2">by {product.brand}</p>
                  )}
                  {product.description && (
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                  )}
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-pink-600 font-bold text-lg">₹{product.price}</p>
                    <p className="text-xs text-gray-500">Condition: {product.condition}</p>
                  </div>
                  {product.sizes?.length > 0 && (
                    <p className="text-xs text-gray-500 mb-3">Sizes: {product.sizes.join(', ')}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.quantity === 0}
                      className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded transition text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                    <button
                      onClick={() => handleAddToWishlist(product._id)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded transition text-sm font-semibold"
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}