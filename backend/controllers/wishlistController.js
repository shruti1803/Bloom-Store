const Wishlist = require('../models/Wishlist');

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if already in wishlist
    const existing = await Wishlist.findOne({ userId: req.userId, productId });
    if (existing) {
      return res.status(400).json({ message: 'Already in wishlist' });
    }

    const wishlist = new Wishlist({ userId: req.userId, productId });
    await wishlist.save();
    res.status(201).json({ message: 'Added to wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.userId }).populate('productId');
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};