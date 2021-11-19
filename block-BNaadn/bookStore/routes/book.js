var express = require('express');
var router = express.Router();
var Book = require("../models/Book");


// create new book
router.get('/new', (req, res) => {
  res.render('newBook');
});

// fetch list of books

router.get("/", (req, res, next) => {
    Book.find({}, (err, books) => {
    // console.log(err, users, 'All users');
    if (err) return next(err);
    res.render('bookList', { books });
  });
})

// add book
router.post('/', (req, res,next) => {
   let data = req.body;
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
