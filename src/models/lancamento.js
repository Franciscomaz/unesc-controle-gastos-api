const Mongoose = require('mongoose');

const LancamentoSchema = new Mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'É necessário informar o nome']
  },
  valor: {
    type: String,
    required: [true, 'É necessário informar o valor']
  },
  conta: {
    type: Mongoose.Schema.Types.ObjectId,
    required: [true, 'É necessário informar a conta'],
    index: true,
    ref: 'contas'
  },
  usuario: {
    type: Mongoose.Schema.Types.ObjectId,
    required: [true, 'É necessário informar o usuário'],
    index: true,
    ref: 'usuarios'
  }
});

module.exports = Mongoose.model('lancamentos', LancamentoSchema);
