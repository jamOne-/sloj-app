const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/sloj-app';

MongoClient.connect(url, (err, db) => {
  if (err) throw new Error(err);
  
  const billsRouter = require('./bills')(db);
  
  router.use('/bills', billsRouter);
});

module.exports = router;