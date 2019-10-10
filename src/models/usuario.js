const Mongoose = require('mongoose');

const UsuarioSchema = new Mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'É necessário informar o nome'],
    index: true
  },
  username: {
    type: String,
    required: [true, 'É necessário informar o usuário'],
    index: true
  },
  senha: {
    type: String,
    required: [true, 'É necessário informar a senha'],
    index: true
  }
});

module.exports = Mongoose.model('usuarios', UsuarioSchema);
