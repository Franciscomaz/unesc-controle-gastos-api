const Mongoose = require('mongoose');

const accountSchema = new Mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'É necessário informar o nome'],
      maxlength: [64, 'Não é permitido nomes com mais de 64 caracteres'],
      trim: true
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

module.exports = Mongoose.model('contas', accountSchema);
