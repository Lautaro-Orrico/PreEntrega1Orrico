const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

router.get('/products', async (req, res) => {
  const { limit = 10, page = 1 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    lean: true
  };

  const result = await Product.paginate({}, options);

  res.render('products', {
    products: result.docs,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    currentPage: result.page
  });
});

router.get('/products/:pid', async (req, res) => {
  const product = await Product.findById(req.params.pid).lean();
  if (!product) return res.status(404).send('Producto no encontrado');
  res.render('products', { product });
});

router.get('/carts/:cid', async (req, res) => {
  const cart = await Cart.findById(req.params.cid).populate('products.product').lean();
  if (!cart) return res.status(404).send('Carrito no encontrado');
  res.render('cart', { cart });
});

module.exports = router;