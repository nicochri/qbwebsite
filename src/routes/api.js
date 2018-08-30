// dependencies
const express = require('express');
const connect = require('connect-ensure-login');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const MongoClient = require('mongodb').MongoClient;
const db = require('../db');

// models
const User = require('../models/user');
const Story = require('../models/story');

// create router
const router = express.Router();

// herper functions
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
  // console.log(req.query);
  // TODO should put everything in if req.isAuthenticated()!! ***
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
        // Charge on stripe
        chargeMoney(req.query.stripeToken, apiResponse, res);
      }
      else {
        res.send(apiResponse);
      }
    });
  });
});

router.get('/whoamimodv2', function(req, res) {
  if (req.isAuthenticated()) {
    if (req.user.mathHL == 'n') {
      var myquery = { _id: req.user._id };
      var newvalues = { $set: {mathHL: "y"} };
      
      User.updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
      });
    }
  }
  else {
    console.log('youre not logged in dude');
    res.send({});
  }
});

router.get('/payment', function(req, res) {
  if (req.isAuthenticated()) {
    if (req.user.mathHL == 'n') {
      apiResponse = {dbSave: 0, stripeCharge: 0, alreadyPaid: 0};
      //Charge the custumer
      stripe.customers.create({
        email: 'foo-customer@example.com'
      }).then(function(customer){
        return stripe.customers.createSource(customer.id, {
          source: req.params.stripeToken
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

        var myquery = { _id: req.user._id };
        var newvalues = { $set: {mathHL: "y"} };
        
        User.updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("The user has successully bought a mathHL questionbank.");
          apiResponse.dbSave = 1;
          res.send(apiResponse)
        });
      }).catch(function(err) {
        // Deal with an error
        console.log('dealt with an error in the chargeMoney method');
        console.log(err);
        res.send(apiResponse);
      });
    }
    else {
      console.log('User already has access to this questionbank');
      res.send({dbSave: 0, stripeCharge: 0, alreadyPaid: 1});
    }
  }
  else {
    console.log('User has to log in to pay');
    res.send({dbSave: 0, stripeCharge: 0, alreadyPaid: 0});
  }
});

router.get('/questions', function(req, res) {
  if (req.isAuthenticated()){
    if (req.user.mathHL == 'y') {
      // res.send({TODO: SEND THE MATHS HL QUESTIONS})

    }
  }
  else {
    res.send({});
  }
});




router.get('/mathHLUserData', function(req, res) {
  if (req.isAuthenticated()){
    if (req.user.mathHL == 'y' || req.user.mathHL == 'n') { //TODO: remove the second if condition
      // res.send({TODO: SEND THE MATHS HL QUESTIONS})
      Story.find({ user_id: req.user._id },function(err,data) {
        res.send(data);
      });
    }
  }
  else {
    res.send([]);
  }
});







router.get('/user', function(req, res) {
  User.findOne({ _id: req.query._id }, function(err, user) {
    res.send(user);
  });
});

router.post(
  '/story',
  connect.ensureLoggedIn(),
  function(req, res) {
    const newStory = new Story({
      'user_id': req.user._id,
      'question_id': req.body.questionId,
      'correct': req.body.correct,
    });
  
    newStory.save(function(err,story) {
      User.findOne({ _id: req.user._id },function(err,user) {
        user.last_post = req.body.content;
        user.save(); // this is OK, because the following lines of code are not reliant on the state of user, so we don't have to shove them in a callback. 
        });
        // configure socketio
      if (err) console.log(err);
    });

    res.send({});
  }
);

module.exports = router;
