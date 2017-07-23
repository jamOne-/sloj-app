const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const serveStatic = require('serve-static');
const passport = require('passport');
const setPassportAndGetRouter = require('./auth/passport');
const isLoggedIn = require('./auth/middlewares').isLoggedIn;
const isLoggedInApi = require('./auth/middlewares').isLoggedInApi;
const api = require('./api/api');
const MongoClient = require('mongodb').MongoClient;
const configSessionSecret = require('./config/auth').sessionSecret;
const configConnectionString = require('./config/database').connectionString;

const app = express();
const PORT = process.env.PORT || 8080;
const connectionString = process.env.MONGODB_URI || configConnectionString;
const sessionSecret = process.env.SESSION_SECRET || configSessionSecret;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

MongoClient.connect(connectionString, (err, db) => {
  if (err) throw new Error(err);

  app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ db })
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
