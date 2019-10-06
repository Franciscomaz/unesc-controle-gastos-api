const express = require('express');
const app = express();

app.use(express.json());

require('dotenv').config();
require('./src/core/database/connection').connect();
require('./src/resources/index')(app);

app.use(require('./src/core/error/handlers/validation-error-handler'));
app.use(require('./src/core/error/handlers/default-error-handler'));
app.use(require('./src/core/error/handlers/internal-error-handler'));

app.listen(process.env.SERVER_PORT, () =>
  console.log('Servidor iniciado na porta', process.env.SERVER_PORT)
);
