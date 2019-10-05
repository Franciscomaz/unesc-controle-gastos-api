const express = require("express");
const app = express();

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Servidor iniciado na porta ${process.env.SERVER_PORT}`)
);
