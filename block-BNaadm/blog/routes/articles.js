var express = require('express');
var router = express.Router();
var Article = require('../model/Article');
var Comment = require('../model/Comment');

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

// router.get('/:id', (req, res, next) => {
//   var id = req.params.id;
//   Article.findById(id, (err, article) => {
//     if (err) return next(err);
//     res.render('articleDetails', { article });
//   });
// });

router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Article.findById(id).populate('comment').exec((err, article) => {
    if (err) return next(err);
    res.render('articleDetails', { article });
  });
})

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

// router.get('/:id/delete', (req, res, next) => {
//   Article.findByIdAndDelete(req.params.id, (err, article) => {
//     if (err) return next(err);
//     res.redirect('/articles');
//   });
// });

// delete article with comment


router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, req.body, (err, article) => {
    if (err) return next(err);
    Comment.deleteMany({ articleId: article.id }, (err) => {
      if (err) return next(err);
      res.redirect("/articles")
    });
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

// decrement likes
router.get('/:id/dislikes', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: {dislikes: 1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles/' + id);
  });
});

// add comment 

router.post('/:articleId/comments', (req, res, next) => {
  // console.log(req.body);
  var articleId = req.params.articleId;
  req.body.articleId = articleId;
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    // update article with commentId into comment section
    Article.findByIdAndUpdate(
      articleId,
      { $push: { comment: comment._id } },
      (err, updatedArticle) => {
        if (err) return next(err);
        res.redirect('/articles/' + articleId);
      }
    );
  });
});



module.exports = router;
