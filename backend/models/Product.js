const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  image_url: String,
  creator: String,
});

module.exports = mongoose.model('Product', ProductSchema);