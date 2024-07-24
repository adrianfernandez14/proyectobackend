const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const cartsFilePath = path.join(__dirname, '../data/carrito.json');
const productsFilePath = path.join(__dirname, '../data/productos.json');

// Función para leer carritos del archivo
const getCartsFromFile = () => {
    const data = fs.readFileSync(cartsFilePath);
    return JSON.parse(data);
};

// Función para escribir carritos al archivo
const saveCartsToFile = (carts) => {
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
};

// Función para leer productos del archivo
const getProductsFromFile = () => {
    const data = fs.readFileSync(productsFilePath);
    return JSON.parse(data);
};

// Ruta POST / para crear un nuevo carrito
router.post('/', (req, res) => {
    const carts = getCartsFromFile();
    const newCart = {
        id: (carts.length ? Math.max(carts.map(c => c.id)) + 1 : 1).toString(),
        products: []
    };
    carts.push(newCart);
    saveCartsToFile(carts);
    res.status(201).json(newCart);
});

// Ruta GET /:cid para obtener los productos de un carrito por ID
router.get('/:cid', (req, res) => {
    const carts = getCartsFromFile();
    const cart = carts.find(c => c.id === req.params.cid);
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

// Ruta POST /:cid/product/:pid para agregar un producto a un carrito por ID
router.post('/:cid/product/:pid', (req, res) => {
    const carts = getCartsFromFile();
    const products = getProductsFromFile();
    const cart = carts.find(c => c.id === req.params.cid);
    const product = products.find(p => p.id === req.params.pid);
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    const existingProductIndex = cart.products.findIndex(p => p.product === req.params.pid);
    if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += 1;
    } else {
        cart.products.push({ product: req.params.pid, quantity: 1 });
    }
    saveCartsToFile(carts);
    res.status(201).json(cart);
});

module.exports = router;
