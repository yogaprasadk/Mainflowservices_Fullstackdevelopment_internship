const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // MongoDB model

// GET with search and filters
router.get('/', async (req, res) => {
    const { search, category } = req.query;
    const query = {};
  
    if (search) query.name = { $regex: search, $options: 'i' }; // case-insensitive
    if (category) query.category = category;
  
    try {
      const products = await Product.find(query);
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  
// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update product by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
