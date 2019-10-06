const Mongoose = require('mongoose');

const LancamentoSchema = new Mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'É necessário informar o nome'],
    index: true
  },
  valor: {
    type: String,
    required: [true, 'É necessário informar o valor'],
    index: true
  }
});

module.exports = Mongoose.model('lancamentos', LancamentoSchema);
