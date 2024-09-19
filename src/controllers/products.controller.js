import Product from '../models/products.model.js';
import mongoosePaginate from 'mongoose-paginate-v2';



// Obtener todos los productos con paginación, ordenamiento y filtrado
export const getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const filter = query ? { category: query } : {};
        const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

        const products = await Product.paginate(filter, {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sortOption,
        });

        res.json({
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}` : null,
            nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}` : null
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el producto', error });
    }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el producto', error });
    }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const updates = req.body;

        const product = await Product.findByIdAndUpdate(productId, updates, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        return res.status(200).json({ message: 'Producto eliminado', product });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};
