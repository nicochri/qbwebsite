// dependencies
const express = require('express');
const exphbs = require('express-handlebars');

// Router
const router = express();
var currentEndpoint = 'home';

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

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
