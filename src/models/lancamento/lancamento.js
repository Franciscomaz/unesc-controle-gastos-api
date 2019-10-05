const mongoose = require('mongoose');

const LancamentoSchema = new mongoose.Schema({
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

module.exports = LancamentoSchema;
