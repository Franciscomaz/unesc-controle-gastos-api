const { CREATED } = require('../core/http/status-codes');

const router = require('express').Router({ mergeParams: true });
const service = require('../services/lancamento.service');
const responseUtils = require('../utils/response-utils');
const { formatUrl } = require('../utils/url-utils');
const { authenticate } = require('../core/authentication/auth.service');

const toRepresentation = entity => {
  return {
    id: entity.id,
    nome: entity.nome,
    valor: entity.valor,
    conta: entity.conta
  };
};

router.get('', authenticate(), async function(req, res, next) {
  try {
    const entities = await service.findAll({
      usuario: req.user.id,
      conta: req.params.contaId
    });

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
      valor: req.body.valor,
      conta: req.params.contaId,
      usuario: req.user.id
    };

    const createdEntity = await service.create(payload);

    const response = responseUtils.createdResponse(
      toRepresentation(createdEntity),
      formatUrl(
        req.protocol,
        req.host,
        `contas/${req.params.contaId}/lancamentos/${createdEntity.id}`
      )
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
