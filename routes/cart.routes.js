const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

// GET /api/carts/:cid
router.get('/:cid', cartController.getCartById);

// POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', cartController.addProductToCart);

// DELETE /api/carts/:cid/products/:pid
router.delete('/:cid/products/:pid', cartController.deleteProductFromCart);

// PUT /api/carts/:cid
router.put('/:cid', cartController.updateCart);

// PUT /api/carts/:cid/products/:pid
router.put('/:cid/products/:pid', cartController.updateProductQuantity);

// DELETE /api/carts/:cid
router.delete('/:cid', cartController.clearCart);

module.exports = router;
