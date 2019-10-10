const ERROR_TYPES = require('../core/error/types');

const { pbkdf2 } = require('crypto');

const ObjectId = require('mongoose').Types.ObjectId;
const Usuario = require('../models/usuario');

const findAll = async () => {
  return await Usuario.find();
};

const findById = async objectId => {
  if (!ObjectId.isValid(objectId)) {
    throw {
      message: `Formato do id inválido: ${objectId}`,
      type: ERROR_TYPES.VALIDATION
    };
  }

  const entity = await Usuario.findById(objectId);

  if (!entity) {
    throw {
      type: ERROR_TYPES.NOT_FOUND,
      message: `Lançamento não encontrado para o id: ${objectId}`
    };
  }

  return entity;
};

const create = async representation => {
  console.log('ok');

  const hashedPassord = await pbkdf2(
    representation.senha,
    process.env.PASSWORD_SALT
  );

  console.log(hashedPassord);

  const entity = new Usuario({
    nome: representation.nome,
    username: representation.username,
    senha: hashedPassord
  });

  return await entity.save();
};

module.exports = {
  findAll: findAll,
  findById: findById,
  create: create
};
