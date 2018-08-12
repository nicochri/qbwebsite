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

// api endpoints
router.get('/whoami', function(req, res) {
  if (req.isAuthenticated()){
    res.send(req.user);
  }
  else{
    res.send({});
  }
});

router.get('/whoamimod', function(req, res) {
  // should put everything in if req.isAuthenticated()

  result = {
    dbsave: 0,
    stripecharge: 0,
  };

  params = {
    gid: 'nada boys',
    mathHL: 'you wish',
  };

  console.log('1')

  MongoClient.connect(process.env.MLAB_URL, function(err, db) {
    if (err) throw err;
    
    if (1) throw "hello";

    console.log('2')


    var dbo = db.db("catbookdb");

    // Check if the user has already purchased something
    var query = { gid: params.gid };
    var user = [];
     
    dbo.collection("qbaccess").find(query).toArray(function(err, result) {
      
      if (err) throw err;
     
      //If user already has a document
      if (result.length == 1) {
        var myquery = { gid: params.gid };
        var newvalues = { $set: { mathHL: params.mathHL } };
        dbo.collection("qbaccess").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          else { result.dbsave = 1; console.log("1 document updated"); }
        });
      }

      //If it's the user's first purchase
      else {
        var myobj = { gid: params.gid, mathHL: params.mathHL };
        dbo.collection("qbaccess").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
      });
      }
      db.close();
      data = { status: 1 };
      res.send(data);
      return
      console.log('im after here');
    });
  });

  console.log('3')
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
