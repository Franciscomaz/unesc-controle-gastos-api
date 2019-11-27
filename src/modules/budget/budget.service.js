const EXCEPTION_TYPES = require('../../core/exception/types');

const Budget = require('./budget');
const Page = require('../../core/data/page');
const ObjectIdWrapper = require('../../core/database/object-id-wrapper');

const findAll = async (pagination, sort) => {
  const total = await Budget.countDocuments(pagination.query);

  const content = await Budget.find(pagination.query)
    .populate('categoria')
    .limit(pagination.limit)
    .skip(pagination.offset)
    .sort({ [sort.field]: sort.direction() })
    .exec();

  return new Page(content, pagination, total);
};

const findById = async objectId => {
  const objectIdWrapper = new ObjectIdWrapper(objectId);

  const entity = await Budget.findById(objectIdWrapper.get());

  if (!entity) {
    // TODO: Refatorar para utilizar objeto de erro nativo do javascript
    throw {
      type: EXCEPTION_TYPES.NOT_FOUND,
      message: 'Orçamento não encontrado'
    };
  }

  return entity;
};

const create = async representation => {
  return Budget.create(representation);
};

const update = async (id, representation) => {
  const toBeUpdatedEntity = await findById(id);

  const entity = updateAttributes(toBeUpdatedEntity, representation);

  return entity.save();
};

const remove = async id => {
  const toBeRemovedEntity = await findById(id);
  await Budget.findByIdAndRemove(toBeRemovedEntity.id);
  return toBeRemovedEntity;
};

const updateAttributes = (entity, representation) => {
  entity.valor = representation.valor;
  entity.categoria = representation.categoria;
  return entity;
};

module.exports = {
  findAll: findAll,
  findById: findById,
  create: create,
  update: update,
  remove: remove
};
