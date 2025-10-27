const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { addProduct, updateProduct, deleteProduct } = require('../controllers/adminController');

router.post('/add-product', authMiddleware, adminMiddleware, addProduct);
router.put('/update-product/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/delete-product/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;