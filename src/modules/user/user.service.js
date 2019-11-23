const EXCEPTION_TYPES = require('../../core/exception/types');

const cryptService = require('../../core/authentication/crypto.service');
const authService = require('../../core/authentication/auth.service');

const User = require('./user');
const ObjectIdWrapper = require('../../core/database/object-id-wrapper');

const findAll = async pagination => {
  return await User.find(pagination.query)
    .limit(pagination.limit)
    .skip(pagination.offset)
    .exec();
};

const findById = async objectId => {
  const objectIdWrapper = new ObjectIdWrapper(objectId);

  const entity = await User.findById(objectIdWrapper.get());

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
  const entity = await User.findOne({ username: username });

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

  return User.create({
    nome: representation.nome,
    username: representation.username,
    senha: hashedPassord
  });
};

const remove = async id => {
  const toBeRemovedEntity = await findById(id);
  await User.findByIdAndRemove(toBeRemovedEntity.id);
  return toBeRemovedEntity;
};

const login = async representation => {
  const user = await findByName(representation.username);

  if (!cryptService.isValidPassword(representation.senha, user.senha)) {
    // TODO: Refatorar para utilizar objeto de erro nativo do javascript
    throw {
      type: EXCEPTION_TYPES.FORBIDDEN,
      message: 'Senha inválida'
    };
  }

  return authService.gerarToken({ usuario_id: user.id });
};

module.exports = {
  findAll: findAll,
  findById: findById,
  login: login,
  create: create,
  remove: remove
};
