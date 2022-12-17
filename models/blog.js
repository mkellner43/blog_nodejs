const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {type: String, required: true},
  blog_post: {type: String, required: true},
  author: {type: mongoose.SchemaTypes.ObjectId, ref: 'Admin', required: true},
  date: {type: Date, default: Date.now},
  published: {type: String, enum: ['published', 'not-published'], default: 'not-published'}
});

BlogSchema.virtual("url").get(function() {
  return `blog/${this._id}`
});

module.exports = mongoose.model('Blog', BlogSchema);