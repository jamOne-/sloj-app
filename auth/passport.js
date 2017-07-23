const bcrpyt = require('bcrypt');
const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
const LocalStrategy = require('passport-local').Strategy;

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

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });
  
  return router;
}

module.exports = setPassportAndGetRouter;
