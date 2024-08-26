import Cart from '../models/carrito.model.js';

export const createCart = async (req, res) => {
  try {
    const newCart = new Cart({ products: [] });
    await newCart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Otros métodos como addProductToCart, updateCart, updateProductInCart, deleteProductFromCart y deleteAllProductsFromCart
