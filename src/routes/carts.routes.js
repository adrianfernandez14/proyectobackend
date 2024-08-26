import express from 'express';
import { createCart, getCartById, addProductToCart, updateCart, updateProductInCart, deleteProductFromCart, deleteAllProductsFromCart } from '../controllers/carts.controller.js';

const router = express.Router();

router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/:cid/product/:pid', addProductToCart);
router.put('/:cid', updateCart);
router.put('/:cid/product/:pid', updateProductInCart);
router.delete('/:cid/product/:pid', deleteProductFromCart);
router.delete('/:cid', deleteAllProductsFromCart);

export default router;
