// import dependencies
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const fbp = require('passport-facebook');

// import models
const User = require('./models/user');

// different callbacks if on localhost
const onLocalhost = 1;
if (onLocalhost) {
  googleCallbackURL = 'http://localhost:3000/auth/google/callback';
  facebookCallbackURL = 'http://localhost:3000/auth/facebook/callback';
}
else {
  googleCallbackURL = 'https://www.ibquestionbanks.org/auth/google/callback';
  facebookCallbackURL = 'https://www.ibquestionbanks.org/auth/facebook/callback';
}

// set up passport configs
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID, // config variables
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: googleCallbackURL
}, function(accessToken, refreshToken, profile, done) {
  User.findOne({
    'uid': profile.id
  }, function(err, user) {
    if (err) return done(err);

    if (!user) {
      const user = new User({
        name: profile.displayName,
        uid:  profile.id,
        email: profile.emails[0].value,
        method: 'google',
        mathHL: 'n',
      });

      user.save(function(err) {
        if (err) console.log(err);

        return done(err, user);
      });
    } else {
      return done(err, user);
    }
  });
}));

passport.use(new fbp.Strategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: facebookCallbackURL,
  profileFields: ['emails'] // TODO: CHECK USER ACTUALLY HAS EMAIL
}, function(accessToken, BrefreshToken, profile, done) {
  User.findOne({'uid': profile.id }, function(err, user) {
    if (err) return done(err);

    if (!user) {
      user = new User({
        name: profile.displayName,
        uid: profile.id,
        email: profile.emails[0].value,
        method: 'facebook',
        mathHL: 'n',
      });

      user.save(function(err) {
        if (err) console.log(err);

        return done(err, user);
      });
    } else {
      return done(err, user);
    }
  });
}));


passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = passport;
