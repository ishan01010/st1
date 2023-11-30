const { Product } = require('../models/productModel');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all products with pagination
const getAllProducts = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const skip = (page - 1) * pageSize;

  try {
    const products = await Product.find().skip(skip).limit(Number(pageSize));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific product by ID
const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).send(); // No content on successful deletion
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
