const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

// Leer los productos desde el archivo
const readProducts = () => {
  const data = fs.readFileSync(productsFilePath);
  return JSON.parse(data);
};

// Guardar los productos al archivo
const saveProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

// Obtener todos los productos
const getProducts = (req, res) => {
  const products = readProducts();
  res.json(products);
};

// Obtener un producto por id
const getProductById = (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.pid);
  if (!product) return res.status(404).send('Producto no encontrado');
  res.json(product);
};

// Crear un nuevo producto
const createProduct = (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  const products = readProducts();

  // Crear nuevo producto con ID autogenerado
  const newProduct = {
    id: products.length + 1,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  };

  products.push(newProduct);
  saveProducts(products);

  res.status(201).json(newProduct);
};

// Actualizar un producto
const updateProduct = (req, res) => {
  const { pid } = req.params;
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  const products = readProducts();

  const productIndex = products.findIndex(p => p.id === parseInt(pid));
  if (productIndex === -1) return res.status(404).send('Producto no encontrado');

  // Actualizar los campos
  const updatedProduct = {
    ...products[productIndex],
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  };

  products[productIndex] = updatedProduct;
  saveProducts(products);

  res.json(updatedProduct);
};

// Eliminar un producto
const deleteProduct = (req, res) => {
  const { pid } = req.params;
  const products = readProducts();

  const productIndex = products.findIndex(p => p.id === parseInt(pid));
  if (productIndex === -1) return res.status(404).send('Producto no encontrado');

  products.splice(productIndex, 1);
  saveProducts(products);

  res.status(204).send();
};

const createProductSocket = (product) => {
  const products = readProducts();
  product.id = products.length + 1;
  products.push(product);
  saveProducts(products);
};

const deleteProductSocket = (id) => {
  const products = readProducts();
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    products.splice(index, 1);
    saveProducts(products);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductSocket,
  deleteProductSocket,
  readProducts
};


