const EXCEPTION_TYPES = require('../core/exception/types');

const cryptService = require('../core/authentication/crypto.service');
const authService = require('../core/authentication/auth.service');

const Usuario = require('../models/usuario');
const ObjectIdWrapper = require('../core/database/object-id.wrapper');

const findAll = async () => {
  return await Usuario.find();
};

const findById = async objectId => {
  const objectIdWrapper = new ObjectIdWrapper(objectId);

  const entity = await Usuario.findById(objectIdWrapper.get());

  if (!entity) {
    throw {
      type: EXCEPTION_TYPES.NOT_FOUND,
      message: `Usuário não encontrado para o id: ${objectIdWrapper.get()}`
    };
  }

  return entity;
};

const findByName = async username => {
  const entity = await Usuario.findOne({ username: username });

  if (!entity) {
    throw {
      type: EXCEPTION_TYPES.NOT_FOUND,
      message: `Usuário ${username} não encontrado`
    };
  }

  return entity;
};

const create = async representation => {
  const hashedPassord = cryptService.encrypt(representation.senha);

  const entity = new Usuario({
    nome: representation.nome,
    username: representation.username,
    senha: hashedPassord
  });

  return entity.save();
};

const login = async representation => {
  const usuario = await findByName(representation.username);

  if (!cryptService.isValidPassword(representation.senha, usuario.senha)) {
    throw {
      type: EXCEPTION_TYPES.FORBIDDEN,
      message: 'Senha inválida'
    };
  }

  return authService.gerarToken({ usuario_id: usuario.id });
};

module.exports = {
  findAll: findAll,
  findById: findById,
  login: login,
  create: create
};
