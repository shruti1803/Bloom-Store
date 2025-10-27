const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }],
  description: {
    type: String,
    default: '',  // Made optional
  },
  brand: {
    type: String,
    default: '',  // NEW FIELD
  },
  category: {
    type: String,
    enum: ['dresses', 'jackets', 'shirts', 'tops', 'accessories','pants','skirts','shorts','kurtas'],
    required: true,
  },
  condition: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair'],
    required: true,
  },
  sizes: [String],
  quantity: {  // Changed from default 1 to admin-controlled
    type: Number,
    default: 1,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);