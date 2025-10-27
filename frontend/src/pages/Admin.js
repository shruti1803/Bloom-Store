import React, { useContext, useState } from 'react';
import { adminAPI } from '../services/api';
import { ProductContext } from '../context/ProductContext';

export default function AdminPage() {
  const { products, fetchProducts } = useContext(ProductContext);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    images: [''],
    category: 'dresses',
    condition: 'Good',
    description: '',
    brand: '',
    sizes: [],
    quantity: 1,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages.length ? newImages : [''] });
  };

  const handleSizeToggle = (size) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.includes(size)
        ? formData.sizes.filter(s => s !== size)
        : [...formData.sizes, size]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const validImages = formData.images.filter(img => img.trim() !== '');
    if (!formData.name || !formData.price || validImages.length === 0) {
      alert('Please fill in name, price, and at least one image URL');
      return;
    }

    if (formData.quantity < 1) {
      alert('Quantity must be at least 1');
      return;
    }

    setLoading(true);

    try {
      await adminAPI.addProduct({
        ...formData,
        images: validImages,
      });
      alert('Product added successfully!');
      setFormData({
        name: '',
        price: '',
        images: [''],
        category: 'dresses',
        condition: 'Good',
        description: '',
        brand: '',
        sizes: [],
        quantity: 1,
      });
      await fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await adminAPI.deleteProduct(id);
      alert('Product deleted successfully!');
      await fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete product');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Add Product Form */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
                placeholder="e.g., Vintage Denim Jacket"
                required
              />
            </div>

            {/* Brand (Optional) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Brand (Optional)
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
                placeholder="e.g., Levi's, Zara, H&M"
              />
            </div>

            {/* Price and Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
                  placeholder="1500"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity in Stock *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
                  placeholder="1"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Images * (At least one required)
              </label>
              <div className="space-y-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
                        placeholder={`Image URL ${index + 1}`}
                      />
                      {image && (
                        <div className="mt-2 w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden">
                          <img 
                            src={image} 
                            alt={`Preview ${index + 1}`} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL';
                            }}
                          />
                        </div>
                      )}
                    </div>
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm"
                >
                  + Add Another Image
                </button>
              </div>
            </div>

            {/* Description (Optional) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
                rows="3"
                placeholder="Add product description here... (optional)"
              />
            </div>

            {/* Category and Condition */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
                >
                  <option value="dresses">Dresses</option>
                  <option value="jackets">Jackets</option>
                  <option value="shirts">Shirts</option>
                  <option value="tops">Tops</option>
                  <option value="accessories">Accessories</option>
                  <option value="pants">Pants</option>
                  <option value="skirts">Skirts</option>
                  <option value="shorts">Shorts</option>
                  <option value="kurtas">Kurtas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Condition</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>
            </div>

            {/* Available Sizes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Available Sizes</label>
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`px-4 py-2 rounded font-semibold transition ${
                      formData.sizes.includes(size)
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-bold transition disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </form>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Products ({products.length})</h2>
          <div className="space-y-4">
            {products.map(product => (
              <div key={product._id} className="flex gap-4 border-b pb-4 items-start">
                {/* Product Images */}
                <div className="flex gap-2">
                  {product.images?.slice(0, 3).map((img, idx) => (
                    <div key={idx} className="w-20 h-20 border-2 border-gray-300 rounded overflow-hidden">
                      <img
                        src={img}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                        }}
                      />
                    </div>
                  ))}
                  {product.images?.length > 3 && (
                    <div className="w-20 h-20 border-2 border-gray-300 rounded flex items-center justify-center bg-gray-100">
                      <span className="text-xs text-gray-600">+{product.images.length - 3}</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  {product.brand && <p className="text-sm text-gray-600">Brand: {product.brand}</p>}
                  <p className="text-sm text-gray-600">
                    ₹{product.price} • {product.category} • {product.condition}
                  </p>
                  <p className="text-sm text-gray-600">
                    Stock: <span className={`font-semibold ${product.quantity < 5 ? 'text-red-600' : 'text-green-600'}`}>
                      {product.quantity} units
                    </span>
                  </p>
                  {product.sizes?.length > 0 && (
                    <p className="text-sm text-gray-600">Sizes: {product.sizes.join(', ')}</p>
                  )}
                </div>

                {/* Actions */}
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}