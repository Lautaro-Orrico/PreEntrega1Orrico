const express = require('express');
const router = express.Router();
const { createCart, getCartById, addProductToCart } = require('../controllers/cartsController');

// Rutas de carritos
router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/:cid/product/:pid', addProductToCart);

module.exports = router;