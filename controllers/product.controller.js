const Product = require('../models/product.model');

exports.getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const filter = query
      ? { $or: [{ category: query }, { available: query === 'true' }] }
      : {};

    const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortOption,
      lean: true
    };

    const result = await Product.paginate(filter, options); // requiere mongoose-paginate-v2

    const { docs, totalPages, hasPrevPage, hasNextPage, nextPage, prevPage } = result;

    res.json({
      status: 'success',
      payload: docs,
      totalPages,
      page: result.page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${prevPage}` : null,
      nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${nextPage}` : null,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).lean();
    if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', product });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
