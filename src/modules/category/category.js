const Mongoose = require('mongoose');

const categorySchema = new Mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'É necessário informar o nome'],
      maxlength: [64, 'Não é permitido nomes com mais de 64 caracteres'],
      validate: {
        validator: nome => {
          return Mongoose.model('categorias')
            .exists({
              nome: nome
            })
            .then(alreadyExists => !alreadyExists);
        },
        message: props => `A categoria ${props.value} já existe`
      },
      trim: true
    },
    usuario: {
      type: Mongoose.Schema.Types.ObjectId,
      index: true,
      ref: 'usuarios'
    }
  },
  { timestamps: true }
);

module.exports = Mongoose.model('categorias', categorySchema);
