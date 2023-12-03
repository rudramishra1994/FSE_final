const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfAccountCreation: { type: Date, default: Date.now },
  reputation: { type: Number, default: 0 },
  qids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  ansIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  tids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
});

module.exports = mongoose.model('User', userSchema);
