const express = require('express');
const app = express();

app.use(express.json());

require('dotenv').config();
require('./src/infrastructure/database/connection').connect();
require('./src/application/index')(app);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Servidor iniciado na porta ${process.env.SERVER_PORT}`)
);
