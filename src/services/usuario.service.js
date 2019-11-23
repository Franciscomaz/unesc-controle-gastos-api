const EXCEPTION_TYPES = require('../core/exception/types');

const cryptService = require('../core/authentication/crypto.service');
const authService = require('../core/authentication/auth.service');

const Usuario = require('../models/usuario');
const ObjectIdWrapper = require('../core/database/object-id-wrapper');

const findAll = async pagination => {
  return await Usuario.find(pagination.query)
    .limit(pagination.limit)
    .skip(pagination.offset)
    .exec();
};

const findById = async objectId => {
  const objectIdWrapper = new ObjectIdWrapper(objectId);

  const entity = await Usuario.findById(objectIdWrapper.get());

  if (!entity) {
    // TODO: Refatorar para utilizar objeto de erro nativo do javascript
    throw {
      type: EXCEPTION_TYPES.NOT_FOUND,
      message: 'Usuário não encontrado'
    };
  }

  return entity;
};

const findByName = async username => {
  const entity = await Usuario.findOne({ username: username });

  if (!entity) {
    // TODO: Refatorar para utilizar objeto de erro nativo do javascript
    throw {
      type: EXCEPTION_TYPES.NOT_FOUND,
      message: 'Usuário não encontrado'
    };
  }

  return entity;
};

const create = async representation => {
  const hashedPassord = cryptService.encrypt(representation.senha);

  return Usuario.create({
    nome: representation.nome,
    username: representation.username,
    senha: hashedPassord
  });
};

const remove = async id => {
  const toBeRemovedEntity = await findById(id);
  await Usuario.findByIdAndRemove(toBeRemovedEntity.id);
  return toBeRemovedEntity;
};

const login = async representation => {
  const usuario = await findByName(representation.username);

  if (!cryptService.isValidPassword(representation.senha, usuario.senha)) {
    // TODO: Refatorar para utilizar objeto de erro nativo do javascript
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
  create: create,
  remove: remove
};
