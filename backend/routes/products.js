const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// Middleware auth + admin
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Brak tokena' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Błędny token' });
  }
}

function isAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Dostęp tylko dla administratora' });
  }
  next();
}

// GET all products (public)
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// POST (auth only)
router.post('/', auth, async (req, res) => {
  const { title, description, image_url } = req.body;
  const product = new Product({
    title,
    description,
    image_url,
    creator: req.user.username,
  });
  await product.save();
  res.status(201).json(product);
});

// DELETE (admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
