const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
require('./core/database/connection').connect();

app.use(cors());
app.use(express.json());
app.use('/api/v1', require('./routes'));
app.use(require('./core/authentication/auth.config').initialize());
app.use(require('./core/exception/interceptor'));

module.exports = app;
