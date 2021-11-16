var express = require('express');
var router = express.Router();
var Article = require('../model/Article');


// create article form

router.get('/new', (req, res) => {
  res.render('newArticle');
});

// list articles

router.get('/', (req, res, next) => {
  Article.find({}, (err, articles) => {
    // console.log(err, users, 'All users');
    if (err) return next(err);
    res.render('articleList', { articles });
  });
});


// fetch single article

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render('articleDetails', { article });
  });
});

// create article

router.post('/', (req, res) => {
  req.body.tags  = req.body.tags.trim().split(' ');
  let data = req.body;
  Article.create(data, (err, createdArticle) => {
    if (err) return res.redirect('/articles/new');
    res.redirect('/articles');
  });
});

// edit article form

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    article.tags = article.tags.join(" ");
    if (err) return next(err);
    res.render('editArticleForm', { article });
  });
});


// update article

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  req.body.tags = req.body.tags.split(" ");
  Article.findByIdAndUpdate(id, req.body, (err, updatedArticle) => {
    if (err) return next(err);
    res.redirect('/articles/' + id);
  });
});

// delete article

router.get('/:id/delete', (req, res, next) => {
  Article.findByIdAndDelete(req.params.id, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles');
  });
});

// increment likes

router.get('/:id/likes', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles/' + id)
  })
});

router.get('/:id/dislikes', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: {dislikes: 1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles/' + id);
  });
});

module.exports = router;
