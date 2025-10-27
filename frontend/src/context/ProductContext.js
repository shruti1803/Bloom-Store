import React, { createContext, useState, useEffect } from 'react';
import { productsAPI, wishlistAPI, cartAPI } from '../services/api';

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (category = '') => {
    try {
      setLoading(true);
      const data = await productsAPI.getAll(category);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const data = await wishlistAPI.get();
      setWishlist(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const data = await cartAPI.get();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await wishlistAPI.add(productId);
      await fetchWishlist();
      alert('Added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert(error.response?.data?.message || 'Failed to add to wishlist');
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      await wishlistAPI.remove(id);
      await fetchWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const addToCart = async (productId, quantity = 1, size) => {
    try {
      await cartAPI.add(productId, quantity, size);
      await fetchCart();
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  const removeFromCart = async (id) => {
    try {
      await cartAPI.remove(id);
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      fetchProducts,
      wishlist,
      fetchWishlist,
      addToWishlist,
      removeFromWishlist,
      cart,
      fetchCart,
      addToCart,
      removeFromCart,
    }}>
      {children}
    </ProductContext.Provider>
  );
}