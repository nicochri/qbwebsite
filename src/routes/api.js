// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

// models
const User = require('../models/user');
const QBinstance = require('../models/qbinstance');

// COPY PASTE
// dependencies

// Libraries - TRAVERSY
const keys = require('../../config/keys');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const exphbs = require('express-handlebars');
const MongoClient = require('mongodb').MongoClient;

// Local dependencies
const db = require('../db');

//Load the string for the Empoìloyeeid route
str = db.dbfunction(MongoClient, 'getNames');




const router = express.Router();

// router.engine('handlebars',exphbs({defaultLayout:'main'}));
// router.set('view engine', 'handlebars');

// api endpoints
router.get('/whoami', function(req, res) {
  if (req.isAuthenticated()){
    res.send(req.user);
  }
  else{
    res.send({});
  }
});

router.get('/user', function(req, res) {
  User.findOne({ _id: req.query._id }, function(err, user) {
    res.send(user);
  });
});

router.post(
  '/qbinstance',
  connect.ensureLoggedIn(),
  function(req, res) {
    User.findOne({ _id: req.user._id },function(err,user) {
      const newStory = new QBinstance({
        'creator_id': user._id,
        'access_code': req.body.content,
      });

      console.log('im in here boys');

      user.set({ last_post: req.body.content });
      user.save(); // this is OK, because the following lines of code are not reliant on the state of user, so we don't have to shove them in a callback. 

      newStory.save(function(err,story) {
        // configure socketio
        if (err) console.log(err);
      });

      res.send({});
    });
  }
);

router.post('/payment', function(req, res) {
  console.log(req.params);
  params = {
    gid: 'just a random id you know DIFF ID',
    mathHL: "FUCKING HELL",
  };
  let amount = 500;

  stripe.customers.create({
    source: req.body.id
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
         currency: "usd",
         customer: customer.id
    }))
  .then(charge => 
    db.dbfunction(MongoClient,'saveNewPurchase',params),
    console.log('payment processed correctly'),
    );
});

module.exports = router;
