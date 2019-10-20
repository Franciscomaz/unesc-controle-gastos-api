const { CREATED } = require('../core/http/status-codes');

const router = require('express').Router();
const service = require('../services/conta.service');
const responseUtils = require('../utils/response-utils');
const Pagination = require('../utils/pagination');
const { formatUrl } = require('../utils/url-utils');
const { authenticate } = require('../core/authentication/auth.service');

const toRepresentation = entity => {
  return {
    id: entity.id,
    nome: entity.nome
  };
};

router.use('/:contaId/lancamentos', require('./lancamento.resource'));

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

    const entity = await service.create(payload);

    const response = responseUtils.createdResponse(
      toRepresentation(entity),
      formatUrl(req.protocol, req.hostname, `/contas/${entity.id}`)
    );

    res.status(CREATED).send(response);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authenticate(), async (req, res, next) => {
  try {
    const updatedEntity = await service.update(req.params.id, req.body);

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

module.exports = router;
