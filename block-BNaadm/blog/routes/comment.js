var express = require('express');
var router = express.Router();
var Article = require('../model/Article');
var Comment = require('../model/Comment');

// edit comment
router.get("/:id/edit", (req,res,next) => {
  var id = req.params.id;
  Comment.findById(id, (err, comment) => {
    if (err) return next(err);
    res.render('updateComment',{comment})
  })
})

// update comment

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, (err, updatedComment) => {
    if (err) return next(err);
    res.redirect('/articles/' + updatedComment.articleId);
  });
});

// delete router

router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
   Comment.findByIdAndDelete(id, req.body, (err, comment) => {
     if (err) return next(err);
     Article.findByIdAndUpdate(comment.articleId, { $pull: { comment: comment._id } }, (err, article) => {
       res.redirect("/articles/" + comment.articleId)
     })
   });
})

module.exports = router;
