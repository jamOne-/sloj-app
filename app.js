const express = require('express');
const serveStatic = require('serve-static');
const api = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(serveStatic('dist'));
app.use('/api', api);

app.listen(PORT, () => {
  console.log(`App listening on port ${ PORT }!`);
});