const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  text: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  dateOfComment: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Comment', userSchema);