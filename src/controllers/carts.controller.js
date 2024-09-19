import Cart from '../models/carrito.model.js'; 
import Product from '../models/products.model.js';
// Función para crear un carrito
export const createCart = async (req, res) => {
    try {
        const newCart = new Cart(); // Crear un nuevo carrito
        await newCart.save(); // Guardar el carrito
        return res.status(201).json(newCart); // Devolver el carrito creado
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el carrito', error });
    }
};

// Función para agregar un producto al carrito
export const addProductToCart = async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const { quantity } = req.body; // Cantidad de producto que quieres agregar

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const existingProductIndex = cart.products.findIndex(
            item => item.product.toString() === productId
        );

        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        return res.status(200).json({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
        return res.status(500).json({ message: 'Error al agregar el producto al carrito', error });
    }
};

// Función para eliminar todos los productos del carrito
export const deleteAllProductsFromCart = async (req, res) => {
    try {
        const { cartId } = req.params;

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        cart.products = [];
        await cart.save();
        return res.status(200).json({ message: 'Todos los productos han sido eliminados del carrito', cart });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar los productos del carrito', error });
    }
};

// Función para eliminar un producto del carrito
export const deleteProductFromCart = async (req, res) => {
    try {
        const { cartId, productId } = req.params;

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        cart.products = cart.products.filter(item => item.product.toString() !== productId);
        await cart.save();

        return res.status(200).json({ message: 'Producto eliminado del carrito', cart });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el producto del carrito', error });
    }
};

// Función para obtener un carrito por ID
export const getCartById = async (req, res) => {
    try {
        const { cartId } = req.params;

        const cart = await Cart.findById(cartId).populate('products.product');
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
};

// Función para actualizar un carrito
export const updateCart = async (req, res) => {
    try {
        const { cartId } = req.params;
        const updates = req.body; // Obtenemos los cambios que queremos aplicar

        const cart = await Cart.findByIdAndUpdate(cartId, updates, { new: true });
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el carrito', error });
    }
};

export const updateProductInCart = async (req, res) => {
  try {
      const { cartId, productId } = req.params;
      const { quantity } = req.body; // Nueva cantidad

      const cart = await Cart.findById(cartId);
      if (!cart) {
          return res.status(404).json({ message: 'Carrito no encontrado' });
      }

      const existingProductIndex = cart.products.findIndex(
          item => item.product.toString() === productId
      );

      if (existingProductIndex === -1) {
          return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
      }

      // Actualizar la cantidad del producto
      cart.products[existingProductIndex].quantity = quantity;

      await cart.save();
      return res.status(200).json({ message: 'Cantidad del producto actualizada', cart });
  } catch (error) {
      return res.status(500).json({ message: 'Error al actualizar el producto en el carrito', error });
  }
};
