const mongoose = require('mongoose');

const url = `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
};

const connect = () => {
  mongoose.connect(url, options);
};

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () =>
  console.log(
    `Mongodb conectado com sucesso no banco ${process.env.DATABASE_NAME}`
  )
);

module.exports = {
  connect: connect
};
