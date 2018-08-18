// dependencies
const express = require('express');

const router = express.Router();

// public endpoints
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'src/views' });
});

// router.get('/courses', function(req, res) {
//   res.sendFile('mathsHL.html', { root: 'src/views' });
// });

// router.get('/features', function(req, res) {
//   res.sendFile('features.html', { root: 'src/views' });
// });

// router.get('/questions', function(req, res) {
//   res.sendFile('questions.html', { root: 'src/views' });
// });

// router.get('/logout', function(req, res) {
//   req.logout();
//   res.redirect('/');
// });

// router.get('/u/profile', function(req, res) {
//   res.sendFile('profile.html', { root: 'src/views' });
// });

module.exports = router;
