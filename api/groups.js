const router = require('express').Router();

const possibleTos = [
  { name: 'Dominik', users: ['Dominik'] },
  { name: 'Werner', users: ['Werner'] },
  { name: 'Rafał', users: ['Rafał'] }
];

const possibleFroms = [
  ...possibleTos,
  { name: 'Dofał', users: ['Dominik', 'Rafał'] },
  { name: 'Rafner', users: ['Werner', 'Rafał'] },
  { name: 'Werinik', users: ['Werner', 'Dominik'] },
  { name: 'Słój', users: ['Dominik', 'Rafał', 'Werner'] }
];

const groups = possibleFroms
  .reduce((groups, group) => (groups[group.name] = group, groups), {});

router.get('/', function (req, res) {
  res.send({ possibleFroms, possibleTos, groups });
});

module.exports = {
  router,
  possibleFroms,
  possibleTos
};