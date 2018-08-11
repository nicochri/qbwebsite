const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const fbp = require('passport-facebook');


const User = require('./models/user');

// set up passport configs
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID, // config variables
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, function(accessToken, refreshToken, profile, done) {
  User.findOne({
    'gid': profile.id
  }, function(err, user) {
    if (err) return done(err);

    if (!user) {
      const user = new User({
        name: profile.displayName,
        gid:  profile.id,
        mathHL: 'no',
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
  clientID: '309614212914414',
  clientSecret: '6d25ee268ae57d8558d18efda4d3f5a4',
  callbackURL: '/auth/facebook/callback'
}, function(accessToken, BrefreshToken, profile, done) {
  User.findOne({'gid': profile.id }, function(err, user) {
    if (err) return done(err);
    console.log(profile);
    if (!user) {
      user = new User({
        name: profile.displayName,
        gid: profile.id,
        mathHL: "This user was created through facebook",
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
