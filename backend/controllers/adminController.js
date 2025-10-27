const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    const { name, price, images, description, brand, category, condition, sizes, quantity } = req.body;

    // Validate required fields
    if (!name || !price || !images || images.length === 0) {
      return res.status(400).json({ message: 'Name, price, and at least one image are required' });
    }

    const product = new Product({
      name,
      price,
      images,
      description: description || '',
      brand: brand || '',
      category,
      condition,
      sizes: sizes || [],
      quantity: quantity || 1,
      createdBy: req.userId,
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    Object.assign(product, req.body);
    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};