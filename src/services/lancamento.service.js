const ERROR_TYPES = require('../core/error/types');

const ObjectId = require('mongoose').Types.ObjectId;
const Lancamento = require('../models/lancamento');

const findAll = async () => {
  return await Lancamento.find();
};

const findById = async objectId => {
  if (!ObjectId.isValid(objectId)) {
    throw {
      message: `Formato do id inválido: ${objectId}`,
      type: ERROR_TYPES.VALIDATION
    };
  }

  const entity = await Lancamento.findById(objectId);

  if (!entity) {
    throw {
      type: ERROR_TYPES.NOT_FOUND,
      message: `Lançamento não encontrado para o id: ${objectId}`
    };
  }

  return entity;
};

const create = async representation => {
  const entity = new Lancamento(representation);

  return await entity.save();
};

const update = async (id, representation) => {
  const toBeUpdatedEntity = await findById(id);

  const entity = updateAttributes(toBeUpdatedEntity, representation);

  const updated = await entity.save();

  return updated;
};

const remove = async id => {
  const toBeRemovedEntity = await findById(id);
  await Lancamento.findByIdAndRemove(toBeRemovedEntity.id);
  return toBeRemovedEntity;
};

const updateAttributes = (entity, representation) => {
  entity.nome = representation.nome;
  entity.valor = representation.valor;
  return entity;
};

module.exports = {
  findAll: findAll,
  findById: findById,
  create: create,
  update: update,
  remove: remove
};
