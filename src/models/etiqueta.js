const Mongoose = require('mongoose');

const EtiquetaSchema = new Mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'É necessário informar o nome'],
      validate: {
        validator: nome => {
          return Mongoose.model('etiquetas')
            .exists({
              nome: nome
            })
            .then(alreadyExists => !alreadyExists);
        },
        message: props => `A etiqueta ${props.value} já existe`
      }
    },
    usuario: {
      type: Mongoose.Schema.Types.ObjectId,
      index: true,
      ref: 'usuarios'
    }
  },
  { timestamps: true }
);

module.exports = Mongoose.model('etiquetas', EtiquetaSchema);
