var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  pages: { type: Number, default: 0, required: true },
  publication: { type: String},
  cover: { type: String },
  category: [String],
  name: { type: String, required: true },
  email: { type: String, required: true, match: /@/ },
  country: { type: String }
}, { timestamps: true });

var Book = mongoose.model("Book", bookSchema);
module.exports = Book;
