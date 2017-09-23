const router = require('express').Router();

const apiRouter = db => {
  const billsRouter = require('./bills')(db);
  const usersRouter = require('./users')(db);
  const groupsRouter = require('./groups').router;
  
  router.use('/bills', billsRouter);
  router.use('/users', usersRouter);
  router.use('/groups', groupsRouter);

  return router;
}

module.exports = apiRouter;