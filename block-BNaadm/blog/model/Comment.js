var mongoose = require('mongoose');
const Article = require('./Article');
var Schema = mongoose.Schema;
var commentSchema = new Schema(
  {
    text: { type:String, required:true},
    articleId: { type:Schema.Types.ObjectId, ref:Article,required:true},
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
