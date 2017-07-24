const bcrpyt = require('bcrypt');
const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

function setPassportAndGetRouter(db, passport) {
  const users = db.collection('users');

  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((_id, done) => users.findOne({ _id: ObjectID(_id) }, done));

  passport.use(new LocalStrategy({
      usernameField: 'login'
    },
    async function (login, password, done) {
      try {
        const user = await users.findOne({ login });

        if (!user)
          return done(null, false);

        const isPasswordCorrect = await bcrpyt.compare(password, user.password);

        if (!isPasswordCorrect)
          return done(null, false);

        return done(null, user);
      }

      catch (e) {
        console.error(e);
        done(e);
      }
    }
  ));

  router.post('/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
    })
  );

  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID || require('../config/auth').facebook.clientID,
      clientSecret: process.env.FACEBOOK_APP_SECRET || require('../config/auth').facebook.clientSecret,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL || require('../config/auth').facebook.callbackURL
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await users.findOne({ facebookId: profile.id });

        if (!user && process.env.NODE_ENV == 'production' && process.env.FACEBOOK_REGISTRATION != 'true')
          return done(null, false);

        if (!user)
          user = await users.insertOne({ name: profile.displayName.split(' ')[0], facebookId: profile.id })
            .then(result => result.ops[0]);

        return done(null, user);
      }

      catch (e) {
        console.error(e);
        done(e);
      }
    }
  ));

  router.get('/auth/facebook', passport.authenticate('facebook'));
  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/#',
      failureRedirect: '/login'
    })
  );

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });
  
  return router;
}

module.exports = setPassportAndGetRouter;
