const express = require('express');
const app = express();

require('dotenv').config();
require('./src/core/database/connection').connect();

app.use(express.json());
app.use('/api/v1', require('./src/resources/index'));
app.use(require('./src/core/authentication/auth.config').initialize());

app.use(require('./src/core/exception/handlers/default-error-handler'));
app.use(
  require('./src/core/exception/handlers/mongoose-validation-error-handler')
);
app.use(require('./src/core/exception/handlers/internal-error-handler'));

app.listen(process.env.SERVER_PORT, () =>
  console.log('Servidor iniciado na porta', process.env.SERVER_PORT)
);
