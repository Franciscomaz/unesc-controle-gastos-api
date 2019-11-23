const { CREATED } = require('../../core/http/status-codes');

const router = require('express').Router({ mergeParams: true });
const service = require('./category.service');
const responseUtils = require('../../utils/response-utils');
const Pagination = require('../../utils/pagination');
const { formatUrl } = require('../../utils/url-utils');
const { authenticate } = require('../../core/authentication/auth.service');

router.get('', authenticate(), async function(req, res, next) {
  try {
    const filter = {
      usuario: req.user.id,
      nome: new RegExp(req.query.nome, 'i')
    };

    const entities = await service.findAll(
      new Pagination(filter, req.query.limit, req.query.offset)
    );

    const response = responseUtils.successResponse(
      entities.map(entity => toRepresentation(entity))
    );

    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authenticate(), async function(req, res, next) {
  try {
    const foundEntity = await service.findById(req.params.id);

    const response = responseUtils.successResponse(
      toRepresentation(foundEntity)
    );

    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.post('', authenticate(), async function(req, res, next) {
  try {
    const payload = {
      nome: req.body.nome,
      usuario: req.user.id
    };

    const createdEntity = await service.create(payload);

    const response = responseUtils.createdResponse(
      toRepresentation(createdEntity),
      formatUrl(req.protocol, req.hostname, `categorias/${createdEntity.id}`)
    );

    res.status(CREATED).send(response);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authenticate(), async (req, res, next) => {
  try {
    const payload = {
      nome: req.body.nome
    };

    const updatedEntity = await service.update(req.params.id, payload);

    const response = responseUtils.successResponse(
      toRepresentation(updatedEntity)
    );

    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticate(), async (req, res, next) => {
  try {
    const removedEntity = await service.remove(req.params.id);

    const response = responseUtils.successResponse(
      toRepresentation(removedEntity)
    );

    res.send(response);
  } catch (err) {
    next(err);
  }
});

const toRepresentation = entity => {
  return {
    id: entity.id,
    nome: entity.nome
  };
};

module.exports = router;
