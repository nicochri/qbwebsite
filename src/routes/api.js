// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

// models
const User = require('../models/user');
const Early = require('../models/early');

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

router.get('/user', function(req, res) {
  User.findOne({ _id: req.query._id }, function(err, user) {
    res.send(user);
  });
});

router.get('/earlyAccess', function(req, res) {
	const newAccess = new Early({
		'email': req.query.email,
	});

	newAccess.save(function(err,story) {
		if (err) console.log(err);
	});

	res.send({});
});

module.exports = router;
