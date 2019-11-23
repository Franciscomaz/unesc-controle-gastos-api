const Mongoose = require('mongoose');

const lancamentoSchema = new Mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'É necessário informar o nome']
    },
    valor: {
      type: Number,
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
  },
  { timestamps: true }
);

module.exports = Mongoose.model('lancamentos', lancamentoSchema);
