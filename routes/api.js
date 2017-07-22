const express = require('express');
const router = express.Router();

const apiRouter = db => {
  const billsRouter = require('./bills')(db);
  const usersRouter = require('./users')(db);
  
  router.use('/bills', billsRouter);
  router.use('/users', usersRouter);

  return router;
}

module.exports = apiRouter;