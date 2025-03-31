const fs = require('fs');
const path = require('path');

const cartsFilePath = path.join(__dirname, '../data/carts.json');

// Leer los carritos desde el archivo
const readCarts = () => {
  const data = fs.readFileSync(cartsFilePath);
  return JSON.parse(data);
};

// Guardar los carritos al archivo
const saveCarts = (carts) => {
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
};

// Crear un nuevo carrito
const createCart = (req, res) => {
  const carts = readCarts();
  
  const newCart = {
    id: carts.length + 1,
    products: []
  };

  carts.push(newCart);
  saveCarts(carts);

  res.status(201).json(newCart);
};

// Obtener los productos del carrito
const getCartById = (req, res) => {
  const carts = readCarts();
  const cart = carts.find(c => c.id === parseInt(req.params.cid));

  if (!cart) return res.status(404).send('Carrito no encontrado');
  
  res.json(cart.products);
};

// Agregar un producto al carrito
const addProductToCart = (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  
  const carts = readCarts();
  const cart = carts.find(c => c.id === parseInt(cid));
  if (!cart) return res.status(404).send('Carrito no encontrado');

  const product = {
    productId: pid,
    quantity: quantity || 1
  };

  // Verificar si el producto ya existe en el carrito
  const existingProduct = cart.products.find(p => p.productId === pid);
  if (existingProduct) {
    existingProduct.quantity += quantity || 1;
  } else {
    cart.products.push(product);
  }

  saveCarts(carts);

  res.status(201).json(cart);
};

module.exports = { createCart, getCartById, addProductToCart };