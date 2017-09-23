const router = require('express').Router();

const possibleTos = [
  { name: 'Dominikowi', users: ['Dominik'] },
  { name: 'Wernerskiemu', users: ['Werner'] },
  { name: 'Rafałowi', users: ['Rafał'] }
];

const possibleFroms = [
  { name: 'Dominik', users: ['Dominik'] },
  { name: 'Werner', users: ['Werner'] },
  { name: 'Rafał', users: ['Rafał'] },
  { name: 'Wernik', users: ['Werner', 'Dominik'] },
  { name: 'Rafner', users: ['Werner', 'Rafał'] },
  { name: 'Dofał', users: ['Dominik', 'Rafał'] },
  { name: 'Słój', users: ['Dominik', 'Rafał', 'Werner'] }
];

const groups = possibleFroms
  .concat(possibleTos)
  .reduce((groups, group) => (groups[group.name] = group, groups), {});

router.get('/', function (req, res) {
  res.send({ possibleFroms, possibleTos, groups });
});

module.exports = {
  router,
  possibleFroms,
  possibleTos
};