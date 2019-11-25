const EXCEPTION_TYPES = require('../../core/exception/types');

const Category = require('./category');
const Page = require('../../core/data/page');
const ObjectIdWrapper = require('../../core/database/object-id-wrapper');

const findAll = async (pagination, sort) => {
  const total = await Category.countDocuments(pagination.query);

  const content = await Category.find(pagination.query)
    .limit(pagination.limit)
    .skip(pagination.offset)
    .sort({ [sort.field]: sort.direction() })
    .exec();

  return new Page(content, pagination, total);
};

const findById = async objectId => {
  const objectIdWrapper = new ObjectIdWrapper(objectId);

  const entity = await Category.findById(objectIdWrapper.get());

  if (!entity) {
    // TODO: Refatorar para utilizar objeto de erro nativo do javascript
    throw {
      type: EXCEPTION_TYPES.NOT_FOUND,
      message: 'Categoria não encontrada'
    };
  }

  return entity;
};

const create = async representation => {
  return Category.create(representation);
};

const update = async (id, representation) => {
  const toBeUpdatedEntity = await findById(id);

  const entity = updateAttributes(toBeUpdatedEntity, representation);

  return entity.save();
};

const remove = async id => {
  const toBeRemovedEntity = await findById(id);
  await Category.findByIdAndRemove(toBeRemovedEntity.id);
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
