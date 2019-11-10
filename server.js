const app = require('./src/app');

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => console.log('Servidor iniciado na porta', port));
