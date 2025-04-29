const express = require('express');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');

const productsRouter = require('./routes/productsRouter');
const cartsRouter = require('./routes/cartsRouter');
const { getProducts } = require('./controllers/productsController');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars setup
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Vistas
app.get('/', (req, res) => {
  const products = require('./controllers/productsController').readProducts();
  res.render('home', { products });
});

app.get('/realtimeproducts', (req, res) => {
  const products = require('./controllers/productsController').readProducts();
  res.render('realTimeProducts', { products });
});

// Socket.io
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('newProduct', (product) => {
    const { createProductSocket } = require('./controllers/productsController');
    createProductSocket(product);
    io.emit('updateProducts', require('./controllers/productsController').readProducts());
  });

  socket.on('deleteProduct', (productId) => {
    const { deleteProductSocket } = require('./controllers/productsController');
    deleteProductSocket(productId);
    io.emit('updateProducts', require('./controllers/productsController').readProducts());
  });
});

const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
