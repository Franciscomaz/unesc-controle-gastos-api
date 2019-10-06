const Mongoose = require('mongoose');

const LancamentoSchema = new Mongoose.Schema({
  nome: {
    type: String,
    required: true,
    index: true
  },
  valor: {
    type: String,
    required: true,
    index: true
  }
});

module.exports = Mongoose.model('lancamentos', LancamentoSchema);
