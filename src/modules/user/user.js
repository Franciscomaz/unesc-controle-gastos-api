const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema(
  {
    nome: {
      type: String,
      index: true,
      required: [true, 'É necessário informar o nome'],
      maxlength: [64, 'Não é permitido nomes com mais de 64 caracteres'],
      trim: true
    },
    username: {
      type: String,
      index: true,
      required: [true, 'É necessário informar o usuário'],
      minlength: [4, 'O usuário precisa ter pelo menos 4 caracteres'],
      maxlength: [64, 'Não é permitido usuários com mais de 64 caracteres'],
      validate: {
        validator: username => {
          return Mongoose.model('usuarios')
            .exists({
              username: username
            })
            .then(isUsernameInUse => !isUsernameInUse);
        },
        message: props => `O usuário ${props.value} já existe`
      },
      trim: true
    },
    senha: {
      type: String,
      required: [true, 'É necessário informar a senha'],
      index: true
    }
  },
  { timestamps: true }
);

module.exports = Mongoose.model('usuarios', userSchema);
