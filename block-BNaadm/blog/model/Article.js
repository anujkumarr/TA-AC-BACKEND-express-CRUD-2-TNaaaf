var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema(
  {
    text: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    author: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

var Article = mongoose.model('Article', articleSchema);
module.exports = Article;
