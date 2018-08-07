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
  // res.sendFile('account.html', { root: 'src/views' });
  res.render('account');
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

// Connecting to the database on the server - https://www.guru99.com/node-js-mongodb.html
var MongoClient = require('mongodb').MongoClient;
const mongoURL = process.env.MLAB_URL;
var str = "";

router.post('/charge', (req, res) => {


  MongoClient.connect(mongoURL, function(err, db) {
    var cursor = db.collection('storymodels').find();

    cursor.each(function(err, item) {

        if (item != null) {
          str = "Hey there";
        }
        console.log(str);
    });
  });




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
    res.render('success');
  });
});



router.route('/Employeeid').get(function(req, res) {
  MongoClient.connect(mongoURL, function(err, db) {
    var cursor = db.collection('storymodels').find();

    cursor.each(function(err, item) {

        if (item != null) {
          str = str + "    Employee id  " + item.creator_name + "</br>";
        }
    });
    res.send(str);
  });
});

module.exports = router;
