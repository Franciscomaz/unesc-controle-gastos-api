const mongoose = require('mongoose');

const url = `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
};

const connect = () => {
  mongoose
    .connect(url, options)
    .then(() =>
      console.log('Conectado com sucesso no banco:', process.env.DATABASE_NAME)
    )
    .catch(err => console.log('Erro na conexão com o banco de dados:', err));
};

module.exports = {
  connect: connect
};
