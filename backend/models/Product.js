const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  image_url: String,
  creator: String, // tymczasowo string; można zmienić na ObjectId dla użytkownika
});

module.exports = mongoose.model('Product', ProductSchema);