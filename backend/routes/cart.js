const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { addToCart, getCart, removeFromCart, updateCart } = require('../controllers/cartController');

router.post('/add', authMiddleware, addToCart);
router.get('/', authMiddleware, getCart);
router.delete('/:id', authMiddleware, removeFromCart);
router.put('/:id', authMiddleware, updateCart);

module.exports = router;