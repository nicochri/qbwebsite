// dependencies
const express = require('express');

// Libraries - TRAVERSY
const keys = require('../../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const exphbs = require('express-handlebars');
const MongoClient = require('mongodb').MongoClient;

// Local dependencies
const db = require('../db');

//Load the string for the Empoìloyeeid route
str = db.dbfunction(MongoClient, 'getNames');

// Router
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
  currentURL = 'heythere';
  res.render('index', {
    stripePublishableKey: keys.stripePublishableKey
  });
});

// router.post('/charge', (req, res) => {
//   // params = {
//   //   gid: req.body.gid,
//   //   mathHL: "yes",
//   // };

//   const amount = 2500;
//   console.log(req);
//   stripe.customers.create({

//     // email: req.body.stripeEmail,
//     source: req.body.stripeToken
//   })
//   .then(customer => stripe.charges.create({
//     amount,
//     description: 'Web Development Ebook',
//     currency: 'usd',
//     customer: customer.id
//   }))
//   .then(charge => {
//     // db.dbfunction(MongoClient,'saveNewPurchase',params);
//     res.render('success');
//   });
// });

router.post('/charge', (req, res) => {
  res.render('success');
});

router.route('/Employeeid').get(function(req, res) {
  // db.dbfunction(MongoClient,'insertQBinstance');
  params = {
    gid: "109335468871294481564",
    mathHL: "yes",
  }
  db.dbfunction(MongoClient,'saveNewPurchase',params);
  res.send(str);
});

module.exports = router;
