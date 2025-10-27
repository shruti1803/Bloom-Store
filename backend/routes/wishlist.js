const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { addToWishlist, getWishlist, removeFromWishlist } = require('../controllers/wishlistController');

router.post('/add', authMiddleware, addToWishlist);
router.get('/', authMiddleware, getWishlist);
router.delete('/:id', authMiddleware, removeFromWishlist);

module.exports = router;