const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const productsFilePath = path.join(__dirname, '../data/productos.json');

// Función para leer productos del archivo
const getProductsFromFile = () => {
    const data = fs.readFileSync(productsFilePath);
    return JSON.parse(data);
};

// Función para escribir productos al archivo
const saveProductsToFile = (products) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

// Ruta GET / para listar todos los productos
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit) || undefined;
    const products = getProductsFromFile();
    res.json(limit ? products.slice(0, limit) : products);
});

// Ruta GET /:pid para obtener un producto por ID
router.get('/:pid', (req, res) => {
    const products = getProductsFromFile();
    const product = products.find(p => p.id === req.params.pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// Ruta POST / para agregar un nuevo producto
router.post('/', (req, res) => {
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios, excepto thumbnails' });
    }
    const products = getProductsFromFile();
    const newProduct = {
        id: (products.length ? Math.max(products.map(p => p.id)) + 1 : 1).toString(),
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
    saveProductsToFile(products);
    res.status(201).json(newProduct);
});

// Ruta PUT /:pid para actualizar un producto por ID
router.put('/:pid', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const products = getProductsFromFile();
    const productIndex = products.findIndex(p => p.id === req.params.pid);
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    const updatedProduct = {
        ...products[productIndex],
        ...(title && { title }),
        ...(description && { description }),
        ...(code && { code }),
        ...(price && { price }),
        ...(status !== undefined && { status }),
        ...(stock && { stock }),
        ...(category && { category }),
        ...(thumbnails && { thumbnails })
    };
    products[productIndex] = updatedProduct;
    saveProductsToFile(products);
    res.json(updatedProduct);
});

// Ruta DELETE /:pid para eliminar un producto por ID
router.delete('/:pid', (req, res) => {
    let products = getProductsFromFile();
    const initialLength = products.length;
    products = products.filter(p => p.id !== req.params.pid);
    if (products.length === initialLength) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    saveProductsToFile(products);
    res.status(204).end();
});

module.exports = router;
