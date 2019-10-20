const Mongoose = require('mongoose');

const etiquetaLancamentoSchema = new Mongoose.Schema(
  {
    lancamento: {
      type: Mongoose.Schema.Types.ObjectId,
      required: [true, 'É necessário informar o lançamento'],
      index: true,
      ref: 'lancamentos'
    },
    etiqueta: {
      type: Mongoose.Schema.Types.ObjectId,
      required: [true, 'É necessário informar a conta'],
      index: true,
      ref: 'etiquetas'
    }
  },
  { timestamps: true }
);

module.exports = Mongoose.model(
  'lancamentos_etiquetas',
  etiquetaLancamentoSchema
);
