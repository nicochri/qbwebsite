// dependencies
const express = require('express');
const fs = require('fs');
const connect = require('connect-ensure-login');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const MongoClient = require('mongodb').MongoClient;
const db = require('../db');

// setup email
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ibquestionbankscontact@gmail.com',
    pass: 'emailpassword'
  }
});

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

router.get('/newpayment', function(req, res) {
  if (req.isAuthenticated()) {
    if (req.user.mathHL == 'n') {
      apiResponse = {dbSave: 0, stripeCharge: 0, alreadyPaid: 0};
      //Charge the custumer
      stripe.customers.create({
        email: req.user.email
      }).then(function(customer){
        return stripe.customers.createSource(customer.id, {
          source: req.query.stripeToken
        });
      }).then(function(source) {
        return stripe.charges.create({
          amount: 499,
          currency: 'usd',
          customer: source.customer
        });

        // return stripe.subscriptions.create({
        //   custumer: source.custumer,
        //   billing_cycle_anchor: 'now',
        //   prorate: false
        // });
      }).then(function() {
        // Store info
        apiResponse.stripeCharge = 1;

        var myquery = { _id: req.user._id };
        var newvalues = { $set: {mathHL: "y"} };
        
        User.updateOne(myquery, newvalues, function(err, response) {
          if (err) throw err;
          console.log("The user has successully bought a mathHL questionbank.");
          apiResponse.dbSave = 1;
          req.session.passport.user.mathHL = 'y';
          res.send(apiResponse);
        })
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

//TODO: PLACE THE NEW PLANS
const currencyToPlan = {
'EUR': 'plan_Da49r1ikx6mqEs',
'NOK': 'plan_Da48gCbRqg41yy',
'USD': 'plan_Da4TE5zqrcDh7w',
};

router.get('/supernewpayment', function(req, res) {
  if (req.isAuthenticated()) {
    if (req.user.mathHL == 'n') {
      //Prepares result response
      apiResponse = {dbSave: 0, stripeCharge: 0, alreadyPaid: 0};

      //Create + charge custumer
      stripe.customers.create({
        email: req.user.uid + '@' + req.user.method + '.com',
        source: req.query.stripeToken
      }).then(function(mycustomer) {
        const { id } = mycustomer;

        return stripe.subscriptions.create({
          customer: id,
          items: [{ plan: currencyToPlan[req.query.currency]}]
        })
      }).then(function(subscription) {
        // Store info
        apiResponse.stripeCharge = 1;

        var myquery = { _id: req.user._id };
        var newvalues = { $set: {mathHL: "y", mathHLSubID: subscription.id, stripeID: req.user.stripeID + '.' + subscription.customer} }; //TODO revert to y
        
        User.updateOne(myquery, newvalues, function(err, response) {
          if (err) throw err;
          console.log("The user has successully bought a mathHL questionbank.");
          apiResponse.dbSave = 1;
          req.session.passport.user.mathHL = 'y'; //TODO: revert back to y, also in set new values
          res.send(apiResponse);
        })
      }).catch(function(err) {
        // Deal with an error
        console.log('dealt with an error when processing the payment');
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




router.get('/cancelSubscription', function(req, res) {
  if (req.isAuthenticated() && req.user.mathHL == 'y') {
    stripe.subscriptions.del(req.user.mathHLSubID);

    var myquery = { _id: req.user._id };
    var newvalues = { $set: {mathHL: "n", mathHLSubID: 'none'} };
    
    User.updateOne(myquery, newvalues, function(err, response) {
      if (err) throw err;
      req.session.passport.user.mathHL = 'n';
      res.send({});
    })
  }
  else {
    res.send({});
  }
});



















router.get('/questions', function(req, res) {
  if (req.isAuthenticated() && req.user.mathHL == 'y') {
    fs.readFile('./public/js/jsondata2.js', function (err, data) {
      if (err) throw err;

      //Convert data to array
      data = JSON.parse(data);
      var data = Object.keys(data).map(function(k) { return data[k] });

      //Send to frontend
      res.send(data);
    });
  }

  else {
    fs.readFile('./public/js/jsondata2.js', function (err, data) {
      if (err) throw err;

      //Convert data to array
      data = JSON.parse(data);
      var data = Object.keys(data).map(function(k) { return data[k] });

      //Take away sensitive data from other chapters if they dont have access
      for (var i = 0; i < data.length; i++) {
          if (data[i].chapter == '2') {
            data[i].text = 'Subscribe to unlock the full access text';
            data[i].solution = 'Subscribe to unlock the full access solution';
          }
      }

      //Send to frontend
      res.send(data);
    });
  }
});




router.get('/mathHLUserData', function(req, res) {
  if (req.isAuthenticated()){
    Story.find({ user_id: req.user._id },function(err,data) {
        res.send(data);
    });
  }
  else {
    res.send([]);
  }
});







router.get('/user', function(req, res) {
  User.findOne({ _id: req.query._id }, function(err, user) {
    res.send(req.user);
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

router.get('/getDesiredQB', function(req, res) {
  if (req.isAuthenticated()) {
    var myquery = { _id: req.user._id };
    var newvalues = { $set: {desiredQB: req.query.desiredQB} };

    User.updateOne(myquery, newvalues, function(err, response) {
      if (err) throw err;
      req.session.passport.user.desiredQB = req.query.desiredQB;
      console.log("Updated user desired question bank to", req.query.desiredQB);
      res.send(req.session.passport.user);
    });
  }
  else {
    res.send({});
  }
});




  

router.get('/sendEmail', function(req, res) {

  var emailHeading = 'name: ' + req.user.name + '\nemail: ' + req.user.email + '\nuid: ' + req.user.uid + '\nhost: ' + req.user.method;
  var emailBody = req.query.text;

  var mailOptions = {
    from: 'ibquestionbankscontact@gmail.com',
    to: 'ibquestionbankscontact@gmail.com',
    subject: 'IB QUESTIONBANKS SUPPORT NEEDED',
    text: emailHeading + '\n\n' + emailBody
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.send({});
});


router.post(
  '/desiredQB',
  connect.ensureLoggedIn(),
  function(req, res) {
    if (req.isAuthenticated()) {

      var myquery = { _id: req.user._id };
      var newvalues = { $set: {desiredQB: req.query.desiredQB} };

      User.updateOne(myquery, newvalues, function(err, response) {
        if (err) throw err;
        req.session.passport.user.mathHL = req.query.desiredQB;
        console.log("Updated user desired question bank to", req.query.desiredQB);
      });
    }
  }
);

module.exports = router;
