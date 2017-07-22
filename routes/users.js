const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const router = express.Router();

const usersRouter = db => {
  const usersCollection = db.collection('users');

  router.get('/',  async function (req, res) {
    try {
      const users = await usersCollection.find({}).toArray();
      res.send(users);
    }

    catch (e) {
      console.error(e);
      res.sendStatus(400);
    }
  });

  router.post('/',  async function (req, res) {
    try {
      const user = await insertUser(usersCollection, req.body);
      res.send(user);
    }

    catch (e) {
      console.error(e);
      res.sendStatus(400);
    }
  });

  return router;
}

module.exports = usersRouter;

async function insertUser(users, newUser) {
  const { name, login, password: plainPassword } = newUser;

  if (!name || !login || !plainPassword)
    throw new Error(`Can't insert user without login/password`);

  const saltRounds = 10;
  const password = await bcrypt.hash(plainPassword, saltRounds);

  return await users.insertOne({ name, login, password })
    .then(result => result.ops[0])
    .then(user => Object.assign({}, user, { password: undefined }));
}