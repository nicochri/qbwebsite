// load env variables
require('dotenv').config();

// libraries
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
var sslRedirect = require('heroku-ssl-redirect');
const cors = require('cors');
const socketio = require('socket.io');

// Libraries - TRAVERSY
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const exphbs = require('express-handlebars');


// local dependencies
const db = require('./db');
const passport = require('./passport');
const views = require('./routes/views');
const api = require('./routes/api');

// initialize express app
const app = express();

// Handlebars Middleware - TRAVERSY
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// set POST request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enable Cross Origin Requests (CORS)
app.use(cors());

// redirect to https
app.use(sslRedirect());

// set up sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: 'false',
  saveUninitialized: 'true'
}));

// hook up passport
app.use(passport.initialize());
app.use(passport.session());

// set routes
app.use('/', views);
app.use('/api', api );
app.use('/static', express.static('public'));

// authentication routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});

// authentication routes - facebook
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get(
  '/auth/facebook/callback',
  passport.authenticate(
    'facebook',
    { failureRedirect: '/' }
  ),
  function(req, res) {
    res.redirect('/');
  }
);

function partialsHelper (request, response, next) {
        response.renderPage = function (template, options, callback) {
            var partials = (options && options.partials) || {};

            partials.footer = path.join("partials", "footer");
            partials.header = path.join("partials", "header");
            options.partials = partials;

            //disable cache for dynamic content
            if (request.method === "GET") {
                response.setHeader("Cache-Control", "no-cache");
            }
            // TODO: figure about max-age for cachable content

            return response.render(template, options, callback);
        };
        return next();
    }

app.use(partialsHelper);

// 404 route
app.use(function(req, res, next) {
  const err = new Error(' Not Found');
  err.status = 404;
  // next(err);
  res.render('pagenotfound');
});

// route error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    status: err.status,
    message: err.message,
  });
});

// port config
const server = http.Server(app);
const port = process.env.PORT || 3000; // config variable
server.listen(port, function() {
  console.log('Server running on port: ' + port);
});