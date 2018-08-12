// dependencies
const express = require('express');
const connect = require('connect-ensure-login');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const MongoClient = require('mongodb').MongoClient;
const db = require('../db');

// models
const User = require('../models/user');
const QBinstance = require('../models/qbinstance');

const router = express.Router();
console.log(Date.now());
// api endpoints
router.get('/whoami', function(req, res) {
  if (req.isAuthenticated()){
    res.send(req.user);
  }
  else{
    res.send({});
  }
});

// function chargeMoney(stripeToken, res) {
//   let amount = 555;

//   stripe.customers.create({
//     source: 'stripeToken'
//   })
//   .then(customer =>
//     stripe.charges.create({
//       amount,
//       description: "Sample Charge",
//          currency: "usd",
//          customer: customer.id
//     }))
//   .then(charge => 
//     console.log('Stripe charged money at: ', Date.now()),
//     res.send({dude: 'hva sker a', timeSent: Date.now()})
//   );
// }

function chargeMoney(stripeToken, apiResponse, res) {
  stripe.customers.create({
    email: 'foo-customer@example.com'
  }).then(function(customer){
    return stripe.customers.createSource(customer.id, {
      source: stripeToken
    });
  }).then(function(source) {
    return stripe.charges.create({
      amount: 1600,
      currency: 'usd',
      customer: source.customer
    });
  }).then(function() {
    // Store info
    apiResponse.stripeCharge = 1; 
  }).then(function() {
    // send info
    res.send(apiResponse);
  }).catch(function(err) {
    // Deal with an error
    console.log('dealt with an error in the chargeMoney method');
    res.send(apiResponse);
  });
}

router.get('/whoamimod', function(req, res) {
  // console.log(req.query);
  // TODO should put everything in if req.isAuthenticated()!! ***

  // Prepare the result object
  stripeFinished = 0;
  mongodbFinished = 0;

  apiResponse = {
    dbSave: 0,
    stripeCharge: 0,
  };



  // Save to the database
  params = {
    gid: 'nada boys',
    mathHL: 'you wish',
  };
  MongoClient.connect(process.env.MLAB_URL, function(err, db) {
    if (err) throw err;

    var dbo = db.db("catbookdb");

    // Check if the user has already purchased something
    var query = { gid: params.gid };     
    dbo.collection("qbaccess").find(query).toArray(function(err, result) {
      if (err) throw err;
     
      //If user already has a document
      if (result.length == 1) {
        var myquery = { gid: params.gid };
        var newvalues = { $set: { mathHL: params.mathHL } };
        dbo.collection("qbaccess").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          else { apiResponse.dbSave = 1; console.log("1 document updated"); }
        });
      }

      //If it's the user's first purchase
      else {
        var myobj = { gid: params.gid, mathHL: params.mathHL };
        dbo.collection("qbaccess").insertOne(myobj, function(err, res) {
          if (err) throw err;
          else { apiResponse.dbSave = 1; console.log("1 document inserted"); }
        });
      }
      db.close();

      if (1) { // TODO actually check if it saved it before charging the card
        console.log('im in here');
        // Charge on stripe
        chargeMoney(req.query.stripeToken, apiResponse, res);
      }
      else {
        res.send(apiResponse);
      }
    });
  });

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
