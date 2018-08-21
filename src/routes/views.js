// dependencies
const express = require('express');
const exphbs = require('express-handlebars');

// Router
const router = express();

// Handlebars Middleware - TRAVERSY
router.engine('handlebars',exphbs({defaultLayout:'test'}));
router.set('view engine', 'handlebars');
// {layout: 'test'}

// public endpoints
router.get('/', function(req, res, next) {
  module.exports.currentEndpoint = '/';
  res.render('home');
});

router.get('/features', function(req, res) {
  module.exports.currentEndpoint = '/features';
  res.render('features');
});

router.get('/account', function(req, res) {
  module.exports.currentEndpoint = '/account';
  res.render('account');
});

router.get('/payment', function(req, res) {
  module.exports.currentEndpoint = '/payment';
  res.render('payment');
});

router.get('/courses', function(req, res) {
  module.exports.currentEndpoint = '/courses';
  res.render('courses');
});

router.get('/questions', function(req, res) {
  module.exports.currentEndpoint = '/questions';
  res.render('questions');
});

router.get('/logout', function(req, res) {
  module.exports.currentEndpoint = '/';
  req.logout();
  res.redirect('/');
});

module.exports = router;
