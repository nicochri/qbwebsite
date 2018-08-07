// dependencies
const express = require('express');

// Libraries - TRAVERSY
const keys = require('../../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const exphbs = require('express-handlebars');

const router = express();

// Handlebars Middleware - TRAVERSY
router.engine('handlebars',exphbs({defaultLayout:'main'}));
router.set('view engine', 'handlebars');

// public endpoints
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'src/views' });
});

router.get('/courses', function(req, res) {
  res.sendFile('mathHL.html', { root: 'src/views' });
});

router.get('/features', function(req, res) {
  res.sendFile('features.html', { root: 'src/views' });
});

router.get('/account', function(req, res) {
  res.sendFile('account.html', { root: 'src/views' });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/heythere', (req, res) => {
  res.render('index', {
    stripePublishableKey: keys.stripePublishableKey
  });
});

router.post('/charge', (req, res) => {
  const amount = 2500;

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer => stripe.charges.create({
    amount,
    description: 'Web Development Ebook',
    currency: 'usd',
    customer: customer.id
  }))
  .then(charge => {
    console.log('This is a fucking alert!');
    res.render('success');
  });
});

module.exports = router;
