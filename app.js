const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const serveStatic = require('serve-static');
const passport = require('passport');
const MongoClient = require('mongodb').MongoClient;
const setPassportAndGetRouter = require('./auth/passport');
const isLoggedIn = require('./auth/middlewares').isLoggedIn;
const isLoggedInApi = require('./auth/middlewares').isLoggedInApi;
const api = require('./api/api');

const app = express();
const PORT = process.env.PORT || 8080;
const connectionString = process.env.MONGODB_URI || require('./config/database').connectionString;
const sessionSecret = process.env.SESSION_SECRET || require('./config/auth').sessionSecret;
const secureCookie = false; // process.env.NODE_ENV == 'production';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

MongoClient.connect(connectionString, (err, db) => {
  if (err) throw new Error(err);

  app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ db }),
    cookie: { secure: secureCookie }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(setPassportAndGetRouter(db, passport));
  app.use('/api', isLoggedInApi, api(db));
  
  app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/login.html'));
  });
  
  app.use('/', isLoggedIn);
  app.use('/', serveStatic(__dirname + '/dist'));

  app.listen(PORT, () => console.log(`App listening on port ${ PORT }!`));
  process.on('exit', () => db.close());
});
