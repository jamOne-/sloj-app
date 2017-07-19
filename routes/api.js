const express = require('express');
const router = express.Router();

const billsRouter = require('./bills');

router.use('/bills', billsRouter);

module.exports = router;