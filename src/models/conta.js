const Mongoose = require('mongoose');

const ContaSchema = new Mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'É necessário informar o nome']
  },
  usuario: {
    type: Mongoose.Schema.Types.ObjectId,
    required: [true, 'É necessário informar o usuário'],
    index: true,
    ref: 'usuarios'
  }
});

module.exports = Mongoose.model('contas', ContaSchema);
