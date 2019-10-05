const express = require('express');
const app = express();

require('dotenv').config();
require('./src/database/connection').connect();

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Servidor iniciado na porta ${process.env.SERVER_PORT}`)
);
