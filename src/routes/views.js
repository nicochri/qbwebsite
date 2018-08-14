// dependencies
const express = require('express');
const exphbs = require('express-handlebars');

// Router
const router = express();

// Handlebars Middleware - TRAVERSY
router.engine('handlebars',exphbs({defaultLayout:'test'}));
router.set('view engine', 'handlebars');

// public endpoints
router.get('/', function(req, res, next) {
  res.render('home', {layout: 'test'});
});

router.get('/courses', function(req, res) {
  res.sendFile('mathHL.html', { root: 'src/views' });
});

router.get('/features', function(req, res) {
  res.render('features');
});

router.get('/account', function(req, res) {
  res.render('account');
});

router.get('/payment', function(req, res) {
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

module.exports = router;
