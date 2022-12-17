const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: {type: String, required: true},
  author: {type: String, required: true},
  date: {type: Date, default: Date.now},
  blog: {type: mongoose.SchemaTypes.ObjectId, ref: "Blog", required: true}
});

module.exports = mongoose.model('Comment', CommentSchema);