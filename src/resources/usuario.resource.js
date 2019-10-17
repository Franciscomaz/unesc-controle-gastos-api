const { CREATED } = require('../core/http/status-codes');

const router = require('express').Router();
const service = require('../services/usuario.service');
const responseUtils = require('../utils/response-utils');
const { formatUrl } = require('../utils/url-utils');

const toRepresentation = entity => {
  return {
    id: entity.id,
    nome: entity.nome,
    username: entity.username
  };
};

router.get('', async function(req, res, next) {
  try {
    const entities = await service.findAll();

    const response = responseUtils.successResponse(
      entities.map(entity => toRepresentation(entity))
    );

    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async function(req, res, next) {
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

router.post('/login', async function(req, res, next) {
  try {
    const token = await service.login(req.body);

    res.send(responseUtils.successResponse({ token: token }));
  } catch (err) {
    next(err);
  }
});

router.post('', async function(req, res, next) {
  try {
    const createdEntity = await service.create(req.body);

    const response = responseUtils.createdResponse(
      toRepresentation(createdEntity),
      formatUrl(req.protocol, req.hostname, `usuarios/${createdEntity.id}`)
    );

    res.status(CREATED).send(response);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
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

router.delete('/:id', async (req, res, next) => {
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
