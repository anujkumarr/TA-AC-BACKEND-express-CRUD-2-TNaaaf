var express = require('express');
var router = express.Router();
var User = require('../model/User');

router.get('/new', (req, res) => {
  res.render('newUsers');
});

router.get('/', (req, res, next) => {
  User.find({}, (err, users) => {
    // console.log(err, users, 'All users');
    if (err) return next(err);
    res.render('userList', { users: users });
  });
});

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) return next(err);
    res.render('userDetails', { user });
  });
});

router.post('/', (req, res) => {
  let data = req.body;
  User.create(data, (err, createdUser) => {
    console.log(err);
    if (err) return res.redirect('/users/new');
    res.redirect('/');
  });
});

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) return next(err);
    res.render('editUserForm', { user });
  });
});

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  User.findByIdAndUpdate(id, req.body, (err, updatedUser) => {
    
    if (err) return next(err);
    res.redirect('/users/' + id);
  });
});

router.get('/:id/delete', (req, res, next) => {
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) return next(err);
    res.redirect('/users');
  });
});

module.exports = router;
