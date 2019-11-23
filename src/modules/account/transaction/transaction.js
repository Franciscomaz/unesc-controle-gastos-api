const Mongoose = require('mongoose');

const transactionSchema = new Mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'É necessário informar o nome'],
      maxlength: [64, 'Não é permitido nomes com mais de 64 caracteres'],
      trim: true
    },
    valor: {
      type: Number,
      required: [true, 'É necessário informar o valor'],
      min: [0, 'Não é permitido valor negativo']
    },
    tipo: {
      type: String,
      enum: ['Ganho', 'Despesa'],
      required: [true, 'É necessário informar o tipo']
    },
    conta: {
      type: Mongoose.Schema.Types.ObjectId,
      required: [true, 'É necessário informar a conta'],
      index: true,
      ref: 'contas'
    },
    categoria: {
      type: Mongoose.Schema.Types.ObjectId,
      required: [true, 'É necessário informar a categoria'],
      index: true,
      ref: 'categorias'
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

module.exports = Mongoose.model('transacoes', transactionSchema);
