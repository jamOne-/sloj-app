const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const router = express.Router();

const possibleTos = ['Werner', 'Dominik', 'Rafał'];
const possibleFroms = [...possibleTos, 'Słój'];

const billsRouter = (db) => {
  const billsCollection = db.collection('bills');

  router.get('/', async function (req, res) {
    try {
      const bills = await billsCollection.find({ }).sort({ creationDate: -1 }).toArray();
      res.send(bills);
    }

    catch (e) {
      console.error(e);
      res.sendStatus(400);
    }
  });

  router.post('/', async function (req, res) {
    const bill = req.body;

    try {
      if (possibleFroms.includes(bill.from) &&
          possibleTos.includes(bill.to) &&
          typeof bill.amount == 'number' &&
          bill.amount > 0
      ) {
        const { from, to, amount, comment } = bill;
        const deleted = false;
        const creationDate = new Date();

        const insertResult = await billsCollection.insertOne({ from, to, amount, comment, deleted, creationDate });
        res.send(insertResult.ops[0]);
      }

      else
        res.sendStatus(400);
    }

    catch (e) {
      console.error(e);
      res.sendStatus(400);
    }
  });

  router.put('/:id/toggle', async function (req, res) {
    const id = req.params.id;
    const _id = ObjectID(id);

    try {
      const bill = await billsCollection.findOne({ _id });
      const updateResult = await billsCollection.updateOne({ _id }, { $set: { deleted: !bill.deleted }});
      res.sendStatus(200);
    }

    catch (e) {
      console.error(e);
      res.sendStatus(400);
    }
  });

  return router;
}

module.exports = billsRouter;