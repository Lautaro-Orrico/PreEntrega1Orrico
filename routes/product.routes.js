const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// GET /api/products
router.get('/', productController.getProducts);

// GET /api/products/:pid
router.get('/:pid', productController.getProductById);

module.exports = router;