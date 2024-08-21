const express = require("express");
const app = express();
const PUERTO = 8080;
const productRoutes = require('./routes/products.router.js');
const cartsRoutes = require('./routes/carts.router.js');
const bodyParser = require("body-parser");

require('dotenv').config();

app.use(bodyParser.json());
app.use('/api/products', productRoutes);
app.use('/api/carts', cartsRoutes);

app.listen(PUERTO, () => {
    console.log('Escuchando en el puerto 8080')
})