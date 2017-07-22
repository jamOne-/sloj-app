const express = require('express');
const router = express.Router();

const apiRouter = db => {
  const billsRouter = require('./bills')(db);
  
  router.use('/bills', billsRouter);

  return router;
}

module.exports = apiRouter;