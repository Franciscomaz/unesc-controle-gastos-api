const EXCEPTION_TYPES = require('../../../core/exception/types');

const Transaction = require('./transaction');
const Page = require('../../../core/data/page');

const ObjectId = require('mongoose').Types.ObjectId;
const ObjectIdWrapper = require('../../../core/database/object-id-wrapper');

const findAll = async (pagination, sort) => {
  const total = await Transaction.countDocuments(pagination.query);

  const content = await Transaction.find(pagination.query)
    .populate('conta')
    .populate('categoria')
    .limit(pagination.limit)
    .skip(pagination.offset)
    .sort({ [sort.field]: sort.direction() })
    .exec();

  return new Page(content, pagination, total);
};

const getTransactionsSummary = async userId => {
  const summary = await Transaction.aggregate([
    { $match: { usuario: new ObjectId(userId) } },
    {
      $project: {
        ganhos: { $cond: [{ $eq: ['$tipo', 'Ganho'] }, '$valor', 0] },
        despesas: { $cond: [{ $eq: ['$tipo', 'Despesa'] }, '$valor', 0] }
      }
    },
    {
      $group: {
        _id: null,
        ganhos: { $sum: '$ganhos' },
        despesas: { $sum: '$despesas' }
      }
    },
    {
      $addFields: {
        saldo: { $subtract: ['$ganhos', '$despesas'] }
      }
    }
  ]).exec();

  return summary.length ? summary[0] : summary;
};

const findById = async objectId => {
  const objectIdWrapper = new ObjectIdWrapper(objectId);

  const entity = await Transaction.findById(objectIdWrapper.get());

  if (!entity) {
    // TODO: Refatorar para utilizar objeto de erro nativo do javascript
    throw {
      type: EXCEPTION_TYPES.NOT_FOUND,
      message: 'Transação não encontrada'
    };
  }

  return entity;
};

const create = async representation => {
  return Transaction.create(representation);
};

const update = async (id, representation) => {
  const toBeUpdatedEntity = await findById(id);

  const entity = updateAttributes(toBeUpdatedEntity, representation);

  return entity.save();
};

const remove = async id => {
  const toBeRemovedEntity = await findById(id);
  await Transaction.findByIdAndRemove(toBeRemovedEntity.id);
  return toBeRemovedEntity;
};

const updateAttributes = (entity, representation) => {
  entity.nome = representation.nome;
  entity.valor = representation.valor;
  entity.categoria = representation.categoria;
  entity.tipo = representation.tipo;
  return entity;
};

module.exports = {
  findAll: findAll,
  findById: findById,
  getTransactionsSummary: getTransactionsSummary,
  create: create,
  update: update,
  remove: remove
};
