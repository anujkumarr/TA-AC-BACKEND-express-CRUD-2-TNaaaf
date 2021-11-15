var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    author: { type: String, unique: true, required: true },
    likes:{ type:Number, default:0}
  },
  { timestamps: true }
);

var User = mongoose.model('User', userSchema);
module.exports = User;
