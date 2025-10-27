import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ordersAPI } from '../services/api';

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const data = await ordersAPI.getOrderById(orderId);
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
      alert('Failed to load order details');
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 px-4 flex items-center justify-center">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 px-4 flex items-center justify-center">
        <p>Order not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/orders')}
          className="mb-6 text-pink-500 hover:text-pink-600 flex items-center gap-2"
        >
          ← Back to Orders
        </button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Details</h1>
              <p className="text-gray-600">Order ID: {order._id}</p>
              <p className="text-gray-600">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)}`}>
              {order.orderStatus.toUpperCase()}
            </span>
          </div>

          {/* Order Status Timeline */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Order Status</h2>
            <div className="flex justify-between items-center">
              {['confirmed', 'shipped', 'delivered'].map((status, index) => {
                const isActive = ['confirmed', 'shipped', 'delivered'].indexOf(order.orderStatus) >= index;
                const isCancelled = order.orderStatus === 'cancelled';
                
                return (
                  <div key={status} className="flex-1 relative">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCancelled ? 'bg-red-500' : isActive ? 'bg-green-500' : 'bg-gray-300'
                      } text-white font-bold`}>
                        {isActive ? '✓' : index + 1}
                      </div>
                      <p className="text-xs mt-2 font-semibold">{status.toUpperCase()}</p>
                    </div>
                    {index < 2 && (
                      <div className={`absolute top-5 left-1/2 w-full h-1 ${
                        isCancelled ? 'bg-red-300' : isActive ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Items */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Items</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-4 border-b pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    {item.size && <p className="text-gray-600">Size: {item.size}</p>}
                    <p className="font-bold text-pink-600">₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold">{order.shippingAddress.fullName}</p>
              <p className="text-gray-600">{order.shippingAddress.address}</p>
              <p className="text-gray-600">
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
              <p className="text-gray-600">Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>

          {/* Payment Details */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>₹{order.totalAmount}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Payment Status:</span>
                <span className={`font-semibold ${
                  order.paymentDetails.paymentStatus === 'completed' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {order.paymentDetails.paymentStatus.toUpperCase()}
                </span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total Paid:</span>
                  <span className="text-pink-600">₹{order.totalAmount}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Payment ID: {order.paymentDetails.razorpayPaymentId}
              </p>
            </div>
          </div>

          {/* Actions */}
          {(order.orderStatus === 'pending' || order.orderStatus === 'confirmed') && (
            <button
              onClick={async () => {
                if (window.confirm('Are you sure you want to cancel this order?')) {
                  try {
                    await ordersAPI.cancelOrder(order._id);
                    alert('Order cancelled successfully');
                    fetchOrder();
                  } catch (error) {
                    alert('Failed to cancel order');
                  }
                }
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}