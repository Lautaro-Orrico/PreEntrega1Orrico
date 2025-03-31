const express = require('express');
const router = express.Router();
const { getCarts, getCartById, createCart, addItemToCart, removeItemFromCart } = require('../controllers/cartsController');

router.get('/', getCarts);
router.get('/:id', getCartById);
router.post('/', createCart);
router.post('/:cartId/items', addItemToCart);
router.delete('/:cartId/items/:productId', removeItemFromCart);

module.exports = router;