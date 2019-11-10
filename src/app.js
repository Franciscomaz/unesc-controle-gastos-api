const express = require('express');
const app = express();

require('dotenv').config();
require('./core/database/connection').connect();

app.use(express.json());
app.use('/api/v1', require('./resources/index'));
app.use(require('./core/authentication/auth.config').initialize());
app.use(require('./core/exception/interceptor'));

module.exports = app;
