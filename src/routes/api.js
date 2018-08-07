// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

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

module.exports = router;
