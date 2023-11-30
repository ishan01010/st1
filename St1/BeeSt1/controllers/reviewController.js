const { Product } = require('../models/productModel');

// Add a new review to a product
const addReview = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const newReview = req.body;
    product.reviews.push(newReview);

    await product.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all reviews for a specific product with pagination
const getAllReviews = async (req, res) => {
  const { productId } = req.params;
  const { page = 1, pageSize = 10 } = req.query;
  const skip = (page - 1) * pageSize;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const reviews = product.reviews.slice(skip, skip + Number(pageSize));
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a review by ID within a product
const updateReview = async (req, res) => {
  const { productId, reviewId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const review = product.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    Object.assign(review, req.body);

    await product.save();
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a review by ID within a product
const deleteReview = async (req, res) => {
  const { productId, reviewId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const review = product.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    review.remove();
    await product.save();
    res.status(204).send(); // No content on successful deletion
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
