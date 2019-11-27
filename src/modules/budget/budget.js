const Mongoose = require('mongoose');

const budgetSchema = new Mongoose.Schema(
  {
    categoria: {
      type: Mongoose.Schema.Types.ObjectId,
      required: [true, 'É necessário informar a categoria'],
      index: true,
      ref: 'categorias'
    },
    valor: {
      type: Number,
      required: [true, 'É necessário informar o valor'],
      min: [0, 'Não é permitido valor negativo']
    },
    usuario: {
      type: Mongoose.Schema.Types.ObjectId,
      index: true,
      ref: 'usuarios'
    }
  },
  { timestamps: true }
);

module.exports = Mongoose.model('orcamentos', budgetSchema);
