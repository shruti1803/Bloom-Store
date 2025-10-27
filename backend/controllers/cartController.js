const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, size } = req.body;

    const cart = new Cart({
      userId: req.userId,
      productId,
      quantity: quantity || 1,
      size,
    });

    await cart.save();
    res.status(201).json({ message: 'Added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.userId }).populate('productId');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removed from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );
    res.json({ message: 'Cart updated', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};