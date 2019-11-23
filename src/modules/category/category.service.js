const EXCEPTION_TYPES = require('../../core/exception/types');

const Etiqueta = require('./category');
const ObjectIdWrapper = require('../../core/database/object-id-wrapper');

const findAll = async pagination => {
  return await Etiqueta.find(pagination.query)
    .limit(pagination.limit)
    .skip(pagination.offset)
    .exec();
};

const findById = async objectId => {
  const objectIdWrapper = new ObjectIdWrapper(objectId);

  const entity = await Etiqueta.findById(objectIdWrapper.get());

  if (!entity) {
    // TODO: Refatorar para utilizar objeto de erro nativo do javascript
    throw {
      type: EXCEPTION_TYPES.NOT_FOUND,
      message: 'Etiqueta não encontrada'
    };
  }

  return entity;
};

const create = async representation => {
  return Etiqueta.create(representation);
};

const update = async (id, representation) => {
  const toBeUpdatedEntity = await findById(id);

  const entity = updateAttributes(toBeUpdatedEntity, representation);

  return entity.save();
};

const remove = async id => {
  const toBeRemovedEntity = await findById(id);
  await Etiqueta.findByIdAndRemove(toBeRemovedEntity.id);
  return toBeRemovedEntity;
};

const updateAttributes = (entity, representation) => {
  entity.nome = representation.nome;
  return entity;
};

module.exports = {
  findAll: findAll,
  findById: findById,
  create: create,
  update: update,
  remove: remove
};
