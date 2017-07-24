const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;

const possibleTos = ['Werner', 'Dominik', 'Rafał'];
const possibleFroms = [...possibleTos, 'Słój'];

const billsRouter = db => {
  const billsCollection = db.collection('bills');

  router.get('/', async function (req, res) {
    try {
      const bills = await billsCollection.find({}).sort({ creationDate: -1 }).toArray();
      res.send(bills);
    }

    catch (e) {
      console.error(e);
      res.sendStatus(400);
    }
  });

  router.post('/', async function (req, res) {
    try {
      const bill = Object.assign({}, req.body, { author: req.user.name });
      const insertedBill = await insertBill(billsCollection, bill);
      res.send(insertedBill);
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
      const change = { deleted: !bill.deleted, toggleAuthor: req.user.name, toggleDate: new Date() };

      const updateResult = await billsCollection.updateOne({ _id }, { $set: change });
      const updatedBill = Object.assign({}, bill, change);
      res.send(updatedBill);
    }

    catch (e) {
      console.error(e);
      res.sendStatus(400);
    }
  });

  return router;
}

module.exports = billsRouter;

async function insertBill(bills, bill) {
  if (possibleFroms.includes(bill.from) &&
      possibleTos.includes(bill.to) &&
      typeof bill.amount == 'number' &&
      bill.amount > 0 &&
      bill.author
  ) {
    const { from, to, amount, comment, author } = bill;
    const deleted = false;
    const creationDate = new Date();

    return await bills.insertOne({ from, to, amount, comment, deleted, creationDate, author })
      .then(result => result.ops[0]);
  }

  else
    throw new Error('Invalid bill object');
}