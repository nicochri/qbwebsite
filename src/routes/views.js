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
  res.render('home');
});

router.get('/features', function(req, res) {
  module.exports.currentEndpoint = 'features'
  res.render('features');//hello htee
});

router.get('/account', function(req, res) {
  res.render('account');
});

router.get('/payment', function(req, res) {
  res.render('payment');
});

router.get('/paymerwerent', function(req, res) {
  res.render('payment');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/heythere', (req, res) => {
  res.render('index', {
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  });
});

router.get('/mathHL', (req, res) => {
  res.render()
});

module.exports = router;
