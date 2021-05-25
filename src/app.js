// Require packages and set the port
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Settings
app.set('port', process.env.PORT || 3000);

app.use(require('./routes/index'));

module.exports = app;