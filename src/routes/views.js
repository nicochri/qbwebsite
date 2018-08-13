// dependencies
const express = require('express');
const exphbs = require('express-handlebars');

// Router
const router = express();

// Handlebars Middleware - TRAVERSY
router.engine('handlebars',exphbs({defaultLayout:'main'}));
router.set('view engine', 'handlebars');

// public endpoints
router.get('/', function(req, res, next) {
  // res.sendFile('index.html', { root: 'src/views' });
  res.render('another', {layout: 'halla'});
});

router.get('/courses', function(req, res) {
  res.sendFile('mathHL.html', { root: 'src/views' });
});

router.get('/features', function(req, res) {
  res.sendFile('features.html', { root: 'src/views' });
});

router.get('/account', function(req, res) {
  res.render('account');
});

router.get('/another', function(req, res) {
  res.render('another');
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
