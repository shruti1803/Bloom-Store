import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://bloom-store-backend.onrender.com"
    : "http://localhost:5000";

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Auth API
export const authAPI = {
  signup: async (userData) => {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// Products API
export const productsAPI = {
  getAll: async (category = '') => {
    const url = category ? `${API_URL}/products?category=${category}` : `${API_URL}/products`;
    const response = await axios.get(url);
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  }
};

// Admin API
export const adminAPI = {
  addProduct: async (productData) => {
    const response = await axios.post(
      `${API_URL}/admin/add-product`,
      productData,
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    );
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await axios.put(
      `${API_URL}/admin/update-product/${id}`,
      productData,
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    );
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await axios.delete(
      `${API_URL}/admin/delete-product/${id}`,
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    );
    return response.data;
  }
};

// Wishlist API
export const wishlistAPI = {
  get: async () => {
    const response = await axios.get(`${API_URL}/wishlist`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  },

  add: async (productId) => {
    const response = await axios.post(
      `${API_URL}/wishlist/add`,
      { productId },
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    );
    return response.data;
  },

  remove: async (id) => {
    const response = await axios.delete(`${API_URL}/wishlist/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  }
};

// Orders API
export const ordersAPI = {
  createRazorpayOrder: async (amount) => {
    const response = await axios.post(
      `${API_URL}/orders/create-razorpay-order`,
      { amount },
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    );
    return response.data;
  },

  verifyPayment: async (paymentData) => {
    const response = await axios.post(
      `${API_URL}/orders/verify-payment`,
      paymentData,
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    );
    return response.data;
  },

  getMyOrders: async () => {
    const response = await axios.get(`${API_URL}/orders/my-orders`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await axios.get(`${API_URL}/orders/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  },

  cancelOrder: async (id) => {
    const response = await axios.put(
      `${API_URL}/orders/${id}/cancel`,
      {},
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    );
    return response.data;
  },

  // Admin
  getAllOrders: async () => {
    const response = await axios.get(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  },

  updateOrderStatus: async (id, orderStatus) => {
    const response = await axios.put(
      `${API_URL}/orders/${id}/status`,
      { orderStatus },
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    );
    return response.data;
  },
};

// Cart API
export const cartAPI = {
  get: async () => {
    const response = await axios.get(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  },

  add: async (productId, quantity = 1, size) => {
    const response = await axios.post(
      `${API_URL}/cart/add`,
      { productId, quantity, size },
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    );
    return response.data;
  },

  remove: async (id) => {
    const response = await axios.delete(`${API_URL}/cart/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  },

  update: async (id, quantity) => {
    const response = await axios.put(
      `${API_URL}/cart/${id}`,
      { quantity },
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    );
    return response.data;
  }
};