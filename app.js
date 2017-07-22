const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const api = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(serveStatic('dist'));

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/sloj-app';

MongoClient.connect(url, (err, db) => {
  if (err) throw new Error(err);
  
  app.use('/api', api(db));

  app.listen(PORT, () => console.log(`App listening on port ${ PORT }!`));
  process.on('exit', () => db.close());
});