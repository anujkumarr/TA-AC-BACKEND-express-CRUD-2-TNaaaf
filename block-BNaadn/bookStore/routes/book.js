var express = require('express');
var router = express.Router();
var Book = require("../models/Book");

// create new book
router.get('/new', (req, res) => {
  res.render('newBook');
});

// fetch list of books

router.get("/", async (req, res, next) => {
  let allCategories = await Book.distinct('category');
  let allAuthors = await Book.distinct('name');;
   
  Book.find({}, (err, books) => {
    if (err) return next(err);
    console.log(allCategories, allAuthors)
    res.render('bookList', { books, allCategories, allAuthors });   
  }); 
});

// add book
router.post('/', (req, res, next) => {
  let data = req.body;
  console.log(data.category);
   
   Book.create(data, (err, createdBook) => {
     if (err) return next(err);
     res.redirect('/books');
   });
})

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) return next(err);
    res.render('bookDetails', { book });
  });
});

module.exports = router;
