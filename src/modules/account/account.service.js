const EXCEPTION_TYPES = require('../../core/exception/types');

const Account = require('./account');
const Page = require('../../core/data/page');
const ObjectIdWrapper = require('../../core/database/object-id-wrapper');

const findAll = async pagination => {
  const total = await Account.countDocuments(pagination.query);

  const content = await Account.find(pagination.query)
    .limit(pagination.limit)
    .skip(pagination.offset)
    .exec();

  return new Page(content, pagination, total);
};

const findById = async objectId => {
  const objectIdWrapper = new ObjectIdWrapper(objectId);

  const entity = await Account.findById(objectIdWrapper.get());

  if (!entity) {
    // TODO: Refatorar para utilizar objeto de erro nativo do javascript
    throw {
      type: EXCEPTION_TYPES.NOT_FOUND,
      message: 'Conta não encontrada'
    };
  }

  return entity;
};

const create = async representation => {
  return Account.create(representation);
};

const update = async (id, representation) => {
  const toBeUpdatedEntity = await findById(id);

  const entity = updateAttributes(toBeUpdatedEntity, representation);

  return entity.save();
};

const remove = async id => {
  const toBeRemovedEntity = await findById(id);
  await Account.findByIdAndRemove(toBeRemovedEntity.id);
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
