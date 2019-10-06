const Representation = require('../../infrastructure/entity/representation');
const Joi = require('@hapi/joi');

const toRepresentation = entity => {
  return Representation.fromEntity(entity)
    .withField('_id', 'id')
    .withField('nome')
    .withField('valor')
    .build();
};

const toEntity = async (representation, entity) => {
  const validator = Joi.object({
    nome: Joi.string().required(),
    valor: Joi.number().required()
  });

  await validator.validateAsync(representation);

  entity.nome = representation.nome;
  entity.valor = representation.valor;

  return entity;
};

module.exports = {
  toRepresentation: toRepresentation,
  toEntity: toEntity
};
