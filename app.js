const express = require('express');
const connectDB = require('./config/db');
const exphbs = require('express-handlebars');
const path = require('path');

const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const viewRoutes = require('./routes/view.routes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));