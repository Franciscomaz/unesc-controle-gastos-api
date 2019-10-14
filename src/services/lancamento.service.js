const EXCEPTION_TYPES = require('../core/exception/types');

const Lancamento = require('../models/lancamento');
const ObjectIdWrapper = require('../core/database/object-id.wrapper');

const findAll = async filter => {
  return await Lancamento.find(filter);
};

const findById = async objectId => {
  const objectIdWrapper = new ObjectIdWrapper(objectId);

  const entity = await Lancamento.findById(objectIdWrapper.get());

  if (!entity) {
    throw {
      type: EXCEPTION_TYPES.NOT_FOUND,
      message: `Lançamento não encontrado para o id: ${objectIdWrapper.get()}`
    };
  }

  return entity;
};

const create = async representation => {
  return Lancamento.create(representation);
};

const update = async (id, representation) => {
  const toBeUpdatedEntity = await findById(id);

  const entity = updateAttributes(toBeUpdatedEntity, representation);

  return entity.save();
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
