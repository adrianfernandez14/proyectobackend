import Product from '../models/products.model.js';

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

// Otros métodos como getProductById, createProduct, updateProduct y deleteProduct
